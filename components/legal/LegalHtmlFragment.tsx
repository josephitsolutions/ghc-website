import fs from "node:fs/promises";
import path from "node:path";

export async function LegalHtmlFragment({
  filename,
  className,
}: {
  filename: string;
  className?: string;
}) {
  const fullPath = path.join(process.cwd(), "content", filename);
  const html = await fs.readFile(fullPath, "utf8");

  return (
    <div
      className={["legal-doc", className].filter(Boolean).join(" ")}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
