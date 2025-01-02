export function improveQuery(text: string) {
  return text.replaceAll(
    /(\b|\d+)x(\b|\d+)/g,
    (_match, before, after) => `${before ?? ''}×${after}`
  )
}
