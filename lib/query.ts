export function improveQuery(text: string) {
  return text.replaceAll(
    /(\b|\d+)x(\b|\d+)/g,
    (match, before, after) => `${before ?? ''}×${after}`
  )
}
