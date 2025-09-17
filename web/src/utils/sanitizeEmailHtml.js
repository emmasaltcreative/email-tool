export function sanitizeEmailHtml(rawContent) {
  if (!rawContent) return "";

  let cleaned = rawContent.replace(/\r\n/g, "\n").trim();

  const stripFence = (startRegex, endRegex) => {
    cleaned = cleaned.replace(startRegex, "");
    cleaned = cleaned.replace(endRegex, "");
    cleaned = cleaned.trim();
  };

  stripFence(/^```(?:html)?\s*/i, /\s*```$/i);
  stripFence(/^'''(?:html)?\s*/i, /\s*'''$/i);

  cleaned = cleaned.replace(/^['"]+/, "").replace(/['"]+$/, "").trim();

  const lines = cleaned.split("\n");
  while (lines.length) {
    let line = lines[0].trim();

    if (!line) {
      lines.shift();
      continue;
    }

    line = line.replace(/^['"]+/, "");
    if (/^https?:\/\//i.test(line) && !line.includes("<")) {
      lines.shift();
      continue;
    }

    break;
  }

  cleaned = lines.join("\n").trim();

  const firstTagIndex = cleaned.indexOf("<");
  if (firstTagIndex > 0) {
    cleaned = cleaned.slice(firstTagIndex).trim();
  }

  const lastHtmlIndex = cleaned.toLowerCase().lastIndexOf("</html>");
  if (lastHtmlIndex !== -1) {
    cleaned = cleaned.slice(0, lastHtmlIndex + "</html>".length);
  }

  return cleaned.trim();
}
