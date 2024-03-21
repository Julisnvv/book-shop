import { Book } from './interfaces'

export interface BasketBookProps {
  book: Book,
  handleDeleteClick: (isbn13: string) => void
}

export interface BookInfoProps {
  authors: string,
  publisher: string,
  pages: number,
  year: number,
  rating: number
}

export interface EmptyContentProps {
  text: string
}

export interface FavoriteBookProps {
  book: Book,
  handleDeleteClick: (isbn13: string) => void,
  handleAddToBasketClick: (isbn13: string) => void
}

export interface MenuProps {
  isOpen: boolean,
  onToggle: () => void
}

export interface ModalProps {
  title: string,
  subtitle: string,
  onToggle: () => void
}

export interface PaginationProps {
  pageNumberCurrent: number,
  pagesCounter: number,
  activePage: number
}

export interface TitleProps {
  name: string
}
