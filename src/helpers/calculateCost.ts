export function parsePrice (price: string): number {
  const formattedPrice = price.replace('$', '')
  return parseFloat(formattedPrice)
}

export function calculateTotalCost (basketBooks: { price: string }[]): number {
  return basketBooks.reduce((acc: number, book: { price: string }) => {
    const price: number = parsePrice(book.price)
    return isNaN(price) ? acc : acc + price
  }, 0)
}
