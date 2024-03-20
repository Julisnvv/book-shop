export interface BooksNew{
  title: string
  subtitle: string
  isbn13: string
  price: string
  image: string
  url: string
}

export interface Book extends BooksNew {
  authors: string
  publisher: string
  isbn10: string
  pages: number
  year: number
  rating: number
  desc: string
}
