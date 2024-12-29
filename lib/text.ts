export function trimText(text: string): string {
  return text
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
}
