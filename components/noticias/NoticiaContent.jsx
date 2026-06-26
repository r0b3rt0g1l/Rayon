export function NoticiaContent({ content }) {
  const paragraphs = String(content || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="space-y-5 font-body text-[1.0625rem] leading-[1.75] text-[var(--color-text)]">
      {paragraphs.map((p, idx) => (
        <p key={idx} className="text-balance">
          {p}
        </p>
      ))}
    </div>
  );
}

export default NoticiaContent;
