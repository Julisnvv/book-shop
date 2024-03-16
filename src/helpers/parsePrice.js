export function parsePrice (price) {
  const formattedPrice = price.replace('$', '')
  return parseFloat(formattedPrice)
}
