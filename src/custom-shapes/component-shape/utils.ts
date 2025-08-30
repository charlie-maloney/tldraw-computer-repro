import type { TLRichText } from "tldraw";

export function isEmptyRichText(richText: TLRichText) {
  if (richText.content.length === 1) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(richText.content[0] as any).content) return true;
  }
  return false;
}
