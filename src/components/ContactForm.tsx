import { CircleAlert, CircleCheck, LoaderCircle, Send, TriangleAlert } from 'lucide-react';
import { useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { site } from '../config/site';

type Field = 'name' | 'email' | 'subject' | 'message';
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured';

const EMPTY: Values = { name: '', email: '', subject: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS: Record<Field, number> = { name: 100, email: 254, subject: 150, message: 5000 };

function validate(v: Values): Errors {
  const e: Errors = {};
  const name = v.name.trim();
  const email = v.email.trim();
  const message = v.message.trim();
  if (!name) e.name = 'Enter your name.';
  else if (name.length > LIMITS.name) e.name = `Keep your name under ${LIMITS.name} characters.`;
  if (!email) e.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(email)) e.email = 'Enter a valid email address, like name@example.com.';
  if (v.subject.trim().length > LIMITS.subject) e.subject = `Keep the subject under ${LIMITS.subject} characters.`;
  if (!message) e.message = 'Enter a message.';
  else if (message.length < 10) e.message = 'Add a little more detail (at least 10 characters).';
  else if (message.length > LIMITS.message) e.message = `Keep the message under ${LIMITS.message} characters.`;
  return e;
}

const FAILURE_TEXT = 'Your message could not be sent right now. Please try again or email me directly at';

/**
 * Formspree contact form (fetch handler, JSON).
 * Success is shown ONLY when Formspree returns a 2xx response.
 * Without VITE_FORMSPREE_FORM_ID the production site renders no form; the
 * Contact section shows the email, call and WhatsApp options instead.
 */
export function ContactForm() {
  const configured = Boolean(site.formspreeId);
  if (!configured && !import.meta.env.DEV) return null;
  return <FormInner configured={configured} />;
}

function FormInner({ configured }: { configured: boolean }) {
  const uid = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const inFlight = useRef(false);
  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    subject: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  const ids = (f: Field) => ({ input: `${uid}-${f}`, error: `${uid}-${f}-error` });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const f = e.target.name as Field;
    const next = { ...values, [f]: e.target.value };
    setValues(next);
    if (touched[f]) setErrors((prev) => ({ ...prev, [f]: validate(next)[f] }));
    if (status === 'success' || status === 'error' || status === 'unconfigured') setStatus('idle');
  };

  const onBlur = (f: Field) => {
    setTouched((t) => ({ ...t, [f]: true }));
    setErrors((prev) => ({ ...prev, [f]: validate(values)[f] }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return; // no duplicate submissions

    const form = e.currentTarget;
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    const first = (['name', 'email', 'subject', 'message'] as Field[]).find((f) => found[f]);
    if (first) {
      refs[first].current?.focus();
      return;
    }

    if (!configured) {
      setStatus('unconfigured');
      return;
    }

    const honeypot = (form.elements.namedItem('_gotcha') as HTMLInputElement | null)?.value ?? '';
    const subject = values.subject.trim();
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject,
      message: values.message.trim(),
      _subject: subject ? `Portfolio: ${subject}` : 'New message from your portfolio',
      _gotcha: honeypot,
    };

    inFlight.current = true;
    setStatus('sending');
    setServerMessage('');
    try {
      const res = await fetch(`https://formspree.io/f/${encodeURIComponent(site.formspreeId)}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus('success');
        setValues(EMPTY);
        setTouched({});
        setErrors({});
        return;
      }
      // Map Formspree validation errors to fields where possible; never show raw internals.
      let fieldErrors: Errors = {};
      try {
        const data = (await res.json()) as { errors?: { field?: string; message?: string }[] };
        (data.errors ?? []).forEach((err) => {
          const f = err.field as Field | undefined;
          if (f && f in EMPTY && err.message) fieldErrors = { ...fieldErrors, [f]: `${err.message}.`.replace('..', '.') };
        });
      } catch {
        /* non-JSON body: fall through to generic message */
      }
      if (Object.keys(fieldErrors).length) {
        setErrors(fieldErrors);
        setServerMessage('Please correct the highlighted fields and try again.');
      }
      setStatus('error');
    } catch {
      setStatus('error'); // network failure; values are preserved
    } finally {
      inFlight.current = false;
    }
  }

  const sending = status === 'sending';

  const fieldProps = (f: Field) => ({
    id: ids(f).input,
    name: f,
    value: values[f],
    onChange,
    onBlur: () => onBlur(f),
    maxLength: LIMITS[f] + 50,
    'aria-invalid': errors[f] ? (true as const) : undefined,
    'aria-describedby': errors[f] ? ids(f).error : undefined,
    disabled: sending,
  });

  const errorText = (f: Field) =>
    errors[f] ? (
      <p className="field__error" id={ids(f).error}>
        <CircleAlert size={15} aria-hidden="true" />
        <span>{errors[f]}</span>
      </p>
    ) : null;

  return (
    <form className="form-card" noValidate onSubmit={onSubmit} aria-labelledby={`${uid}-title`}>
      <h3 className="form-card__title" id={`${uid}-title`}>
        Send a message
      </h3>

      {!configured && (
        <p className="notice notice--warning" role="note">
          <TriangleAlert size={16} aria-hidden="true" />
          <span>
            Development notice: <code>VITE_FORMSPREE_FORM_ID</code> is not set, so submissions are disabled. This
            notice is never shown on the production site.
          </span>
        </p>
      )}

      <div className="form-grid">
        <div className="field">
          <label htmlFor={ids('name').input}>
            Name <span className="field__req">(required)</span>
          </label>
          <input ref={refs.name} type="text" autoComplete="name" required {...fieldProps('name')} />
          {errorText('name')}
        </div>
        <div className="field">
          <label htmlFor={ids('email').input}>
            Email <span className="field__req">(required)</span>
          </label>
          <input
            ref={refs.email}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            {...fieldProps('email')}
          />
          {errorText('email')}
        </div>
        <div className="field field--full">
          <label htmlFor={ids('subject').input}>
            Subject <span className="field__req">(optional)</span>
          </label>
          <input ref={refs.subject} type="text" {...fieldProps('subject')} />
          {errorText('subject')}
        </div>
        <div className="field field--full">
          <label htmlFor={ids('message').input}>
            Message <span className="field__req">(required)</span>
          </label>
          <textarea ref={refs.message} rows={6} required {...fieldProps('message')} />
          {errorText('message')}
        </div>
      </div>

      {/* Spam honeypot, hidden from people and assistive tech */}
      <div className="hp" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn--primary" disabled={sending} aria-disabled={sending}>
          <span className="btn__icon" aria-hidden="true">
            {sending ? <LoaderCircle size={18} className="spin" /> : <Send size={18} />}
          </span>
          <span>{sending ? 'Sending...' : 'Send Message'}</span>
        </button>
      </div>

      <div className="form-status" role="status" aria-live="polite" aria-atomic="true">
        {status === 'success' && (
          <p className="notice notice--success">
            <CircleCheck size={16} aria-hidden="true" />
            <span>Thank you for reaching out! Your message has been submitted successfully.</span>
          </p>
        )}
        {status === 'error' && (
          <p className="notice notice--error">
            <CircleAlert size={16} aria-hidden="true" />
            <span>
              {serverMessage ? `${serverMessage} ` : ''}
              {FAILURE_TEXT} <a href={`mailto:${site.email}`}>{site.email}</a>.
            </span>
          </p>
        )}
        {status === 'unconfigured' && (
          <p className="notice notice--warning">
            <TriangleAlert size={16} aria-hidden="true" />
            <span>
              Not sent: the form is not connected yet. Set <code>VITE_FORMSPREE_FORM_ID</code> and restart the dev
              server.
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
