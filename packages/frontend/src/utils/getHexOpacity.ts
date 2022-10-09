export const getHexOpacity = (color: string, opacity: number) => {
  const trimmedColor = color.replace('#', '')
  const calculatedOpacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255)
  return '#' + trimmedColor + calculatedOpacity.toString(16).padStart(2, '0').toUpperCase()
}
