export function checkLocalStorageData (
  book: {isbn13: string},
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>,
  setIsBasket: React.Dispatch<React.SetStateAction<boolean>>
  ): void {
  const favoriteLocalStorageKey = `favoriteBook_${book.isbn13}`
  const isBookInFavorites = localStorage.getItem(favoriteLocalStorageKey) !== null
  setIsFavorite(isBookInFavorites)

  const basketLocalStorageKey = `basketBook_${book.isbn13}`
  const isBookInBasket = localStorage.getItem(basketLocalStorageKey) !== null
  setIsBasket(isBookInBasket)
}

// Favorite
export function getFavoriteBooks (): { [key: string]: any }[] {
  return Object.keys(localStorage)
    .filter(key => key.startsWith('favoriteBook_'))
    .map(key => JSON.parse(localStorage.getItem(key) || ''))
}

export function handleFavoriteToggle (
  book: {isbn13: string},
  isFavorite: boolean,
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>
  ): void {
  const favoriteLocalStorageKey = `favoriteBook_${book.isbn13}`
  if (isFavorite) {
    localStorage.removeItem(favoriteLocalStorageKey)
  } else {
    localStorage.setItem(favoriteLocalStorageKey, JSON.stringify(book))
  }
  setIsFavorite(!isFavorite)
}

// Basket
export function getBasketBooks (): { [key: string]: any }[] {
  return Object.keys(localStorage)
    .filter(key => key.startsWith('basketBook_'))
    .map(key => JSON.parse(localStorage.getItem(key) || ''))
}

export function handleBasketToggle (
  book: {isbn13: string},
  isBasket: boolean,
  setIsBasket: React.Dispatch<React.SetStateAction<boolean>>
  ): void {
  const basketLocalStorageKey = `basketBook_${book.isbn13}`
  if (isBasket) {
    localStorage.removeItem(basketLocalStorageKey)
  } else {
    localStorage.setItem(basketLocalStorageKey, JSON.stringify(book))
  }
  setIsBasket(!isBasket)
}

export function handleAddToBasket (
  isbn13: string,
  setDeletedBooks: React.Dispatch<React.SetStateAction<string[]>>
  ): void {
  const favoriteLocalStorageKey = `favoriteBook_${isbn13}`
  const basketLocalStorageKey = `basketBook_${isbn13}`
  const book = JSON.parse(localStorage.getItem(favoriteLocalStorageKey) || '')

  localStorage.removeItem(favoriteLocalStorageKey)
  localStorage.setItem(basketLocalStorageKey, JSON.stringify(book))

  setDeletedBooks(prevDeletedBooks => [...prevDeletedBooks, isbn13])
}
