interface TagListProps {
  items: readonly string[];
  label: string;
  className?: string;
}

/** Technology labels. Plain names only, no proficiency claims. */
export function TagList({ items, label, className = '' }: TagListProps) {
  return (
    <ul className={`tags ${className}`.trim()} role="list" aria-label={label}>
      {items.map((t) => (
        <li key={t} className="tag">
          {t}
        </li>
      ))}
    </ul>
  );
}
