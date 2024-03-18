export function parsePrice (price) {
  const formattedPrice = price.replace('$', '')
  return parseFloat(formattedPrice)
}

export function calculateTotalCost (basketBooks) {
  return basketBooks.reduce((acc, book) => {
    const price = parsePrice(book.price)
    return isNaN(price) ? acc : acc + price
  }, 0)
}
