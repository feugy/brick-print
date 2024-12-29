export function trimText(text: string | Array<string>) {
  return (Array.isArray(text) ? text : text.split('\n'))
    .map((line) => line.trim())
    .join('\n')
}

export function fixName(text: string, lines = 2) {
  if (lines <= 1) return trimText(text)

  const maxLength = Math.ceil(text.length / lines)

  const result: string[] = []
  let currentLine = ''

  for (const word of text.split(' ')) {
    if (
      currentLine.length + word.length > maxLength &&
      result.length < lines - 1
    ) {
      result.push(currentLine)
      currentLine = ''
    }
    currentLine += `${word} `
  }
  result.push(currentLine)

  return trimText(result.filter(Boolean))
}
