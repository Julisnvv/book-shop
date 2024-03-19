// export function checkLocalStorageData (book, setIsFavorite, setIsBasket) {
//   const favoriteLocalStorageKey = `favoriteBook_${book.isbn13}`
//   const isBookInFavorites = localStorage.getItem(favoriteLocalStorageKey) !== null
//   setIsFavorite(isBookInFavorites)

//   const basketLocalStorageKey = `basketBook_${book.isbn13}`
//   const isBookInBasket = localStorage.getItem(basketLocalStorageKey) !== null
//   setIsBasket(isBookInBasket)
// }

// // Favorite
// export function getFavoriteBooks () {
//   return Object.keys(localStorage)
//     .filter(key => key.startsWith('favoriteBook_'))
//     .map(key => JSON.parse(localStorage.getItem(key)))
// }

// export function handleFavoriteToggle (book, isFavorite, setIsFavorite) {
//   const favoriteLocalStorageKey = `favoriteBook_${book.isbn13}`
//   if (isFavorite) {
//     localStorage.removeItem(favoriteLocalStorageKey)
//   } else {
//     localStorage.setItem(favoriteLocalStorageKey, JSON.stringify(book))
//   }
//   setIsFavorite(!isFavorite)
// }

// // Basket
// export function getBasketBooks () {
//   return Object.keys(localStorage)
//     .filter(key => key.startsWith('basketBook_'))
//     .map(key => JSON.parse(localStorage.getItem(key)))
// }

// export function handleBasketToggle (book, isBasket, setIsBasket) {
//   const basketLocalStorageKey = `basketBook_${book.isbn13}`
//   if (isBasket) {
//     localStorage.removeItem(basketLocalStorageKey)
//   } else {
//     localStorage.setItem(basketLocalStorageKey, JSON.stringify(book))
//   }
//   setIsBasket(!isBasket)
// }

// export function handleAddToBasket (isbn13, setDeletedBooks) {
//   const favoriteLocalStorageKey = `favoriteBook_${isbn13}`
//   const basketLocalStorageKey = `basketBook_${isbn13}`
//   const book = JSON.parse(localStorage.getItem(favoriteLocalStorageKey))

//   localStorage.removeItem(favoriteLocalStorageKey)
//   localStorage.setItem(basketLocalStorageKey, JSON.stringify(book))

//   setDeletedBooks(prevDeletedBooks => [...prevDeletedBooks, isbn13])
// }

interface Book {
  isbn13: string;
  // Add any other properties of the book here
}

type SetStateFunction = React.Dispatch<React.SetStateAction<boolean>>;

export function checkLocalStorageData (book: Book, setIsFavorite: SetStateFunction, setIsBasket: SetStateFunction): void {
  const favoriteLocalStorageKey: string = `favoriteBook_${book.isbn13}`;
  const isBookInFavorites: boolean = localStorage.getItem(favoriteLocalStorageKey) !== null;
  setIsFavorite(isBookInFavorites);

  const basketLocalStorageKey: string = `basketBook_${book.isbn13}`;
  const isBookInBasket: boolean = localStorage.getItem(basketLocalStorageKey) !== null;
  setIsBasket(isBookInBasket);
}

export function getFavoriteBooks (): Book[] {
  return Object.keys(localStorage)
    .filter((key: string) => key.startsWith('favoriteBook_'))
    .map((key: string) => JSON.parse(localStorage.getItem(key)));
}

export function handleFavoriteToggle (book: Book, isFavorite: boolean, setIsFavorite: SetStateFunction): void {
  const favoriteLocalStorageKey: string = `favoriteBook_${book.isbn13}`;
  if (isFavorite) {
    localStorage.removeItem(favoriteLocalStorageKey);
  } else {
    localStorage.setItem(favoriteLocalStorageKey, JSON.stringify(book));
  }
  setIsFavorite(!isFavorite);
}

export function getBasketBooks (): Book[] {
  return Object.keys(localStorage)
    .filter((key: string) => key.startsWith('basketBook_'))
    .map((key: string) => JSON.parse(localStorage.getItem(key)));
}

export function handleBasketToggle (book: Book, isBasket: boolean, setIsBasket: SetStateFunction): void {
  const basketLocalStorageKey: string = `basketBook_${book.isbn13}`;
  if (isBasket) {
    localStorage.removeItem(basketLocalStorageKey);
  } else {
    localStorage.setItem(basketLocalStorageKey, JSON.stringify(book));
  }
  setIsBasket(!isBasket);
}

export function handleAddToBasket (isbn13: string, setDeletedBooks: React.Dispatch<React.SetStateAction<string[]>>): void {
  const favoriteLocalStorageKey: string = `favoriteBook_${isbn13}`;
  const basketLocalStorageKey: string = `basketBook_${isbn13}`;
  const book: Book = JSON.parse(localStorage.getItem(favoriteLocalStorageKey));

  localStorage.removeItem(favoriteLocalStorageKey);
  localStorage.setItem(basketLocalStorageKey, JSON.stringify(book));

  setDeletedBooks((prevDeletedBooks: string[]) => [...prevDeletedBooks, isbn13]);
}
