export function checkLocalStorageData (book, setIsFavorite, setIsBasket) {
  const favoriteLocalStorageKey = `favoriteBook_${book.isbn13}`
  const isBookInFavorites = localStorage.getItem(favoriteLocalStorageKey) !== null
  setIsFavorite(isBookInFavorites)

  const basketLocalStorageKey = `basketBook_${book.isbn13}`
  const isBookInBasket = localStorage.getItem(basketLocalStorageKey) !== null
  setIsBasket(isBookInBasket)
}

export function handleFavoriteToggle (book, isFavorite, setIsFavorite) {
  const favoriteLocalStorageKey = `favoriteBook_${book.isbn13}`
  if (isFavorite) {
    localStorage.removeItem(favoriteLocalStorageKey)
  } else {
    localStorage.setItem(favoriteLocalStorageKey, JSON.stringify(book))
  }
  setIsFavorite(!isFavorite)
}

export function handleBasketToggle (book, isBasket, setIsBasket) {
  const basketLocalStorageKey = `basketBook_${book.isbn13}`
  if (isBasket) {
    localStorage.removeItem(basketLocalStorageKey)
  } else {
    localStorage.setItem(basketLocalStorageKey, JSON.stringify(book))
  }
  setIsBasket(!isBasket)
}

export function handleFavoriteDelete (isbn13, setDeletedBooks) {
  const localStorageKey = `favoriteBook_${isbn13}`
  localStorage.removeItem(localStorageKey)
  setDeletedBooks(prevDeletedBooks => [...prevDeletedBooks, isbn13])
}

export function handleFavoriteDeleteAll (setDeletedBooks) {
  const favoriteBookKeys = Object.keys(localStorage).filter(key =>
    key.startsWith('favoriteBook_')
  )
  favoriteBookKeys.forEach(key => {
    localStorage.removeItem(key)
  })
  setDeletedBooks(favoriteBookKeys.map(key => key.replace('favoriteBook_', '')))
}

export function handleBasketDelete (isbn13, setDeletedBooks) {
  const localStorageKey = `basketBook_${isbn13}`
  localStorage.removeItem(localStorageKey)
  setDeletedBooks(prevDeletedBooks => [...prevDeletedBooks, isbn13])
}

export function handleBasketDeleteAll (setDeletedBooks) {
  const basketBookKeys = Object.keys(localStorage).filter(key =>
    key.startsWith('basketBook_')
  )
  basketBookKeys.forEach(key => {
    localStorage.removeItem(key)
  })
  setDeletedBooks(basketBookKeys.map(key => key.replace('basketBook_', '')))
}

export function handleAddToBasket (isbn13, setDeletedBooks) {
  const favoriteLocalStorageKey = `favoriteBook_${isbn13}`
  const basketLocalStorageKey = `basketBook_${isbn13}`
  const book = JSON.parse(localStorage.getItem(favoriteLocalStorageKey))

  localStorage.removeItem(favoriteLocalStorageKey)
  localStorage.setItem(basketLocalStorageKey, JSON.stringify(book))

  setDeletedBooks(prevDeletedBooks => [...prevDeletedBooks, isbn13])
}
