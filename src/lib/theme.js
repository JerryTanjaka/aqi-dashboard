export const palette = ['#4fd1c5', '#f6ad55', '#fc8181', '#63b3ed', '#68d391', '#b794f4', '#f687b3']

export function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}
