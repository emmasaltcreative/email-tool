export const CTA_STYLE =
  "display:inline-block;background-color:#34597b;color:#ffffff;padding:12px 20px;text-decoration:none;border-radius:6px;font-family:'Inter',sans-serif;font-size:15px;font-weight:600;";

export function injectCTAButtons(html, fallbackUrl) {
  return html.replace(/<cta>(.*?)<\/cta>/gs, (_, inner) => {
    const [text, urlRaw=""] = inner.split("|")
    const url = (urlRaw || fallbackUrl || "#").trim()
    const label = (text || "Learn more").trim()
    return `<div style="margin:24px 0;text-align:center;"><a href="${url}" style="${CTA_STYLE}">${label}</a></div>`
  })
}

