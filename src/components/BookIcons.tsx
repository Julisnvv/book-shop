import { useState, useEffect } from 'react'
import { handleFavoriteToggle, handleBasketToggle, checkLocalStorageData } from '../helpers/localStorage'
import { BooksNew } from '../types/interfaces'
import favorite from '../img/favorite.svg'
import inFavorite from '../img/in-favorite.svg'
import basket from '../img/basket.svg'
import inBasket from '../img/in-basket.svg'

export function BookIcons (props: BooksNew): JSX.Element {
  // Hooks
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [isBasket, setIsBasket] = useState<boolean>(false)

  useEffect(() => {
    checkLocalStorageData(props, setIsFavorite, setIsBasket)
  }, [props])

  // Methods
  function handleFavoriteClick (): void {
    handleFavoriteToggle(props, isFavorite, setIsFavorite)
  }

  function handleBasketClick (): void {
    handleBasketToggle(props, isBasket, setIsBasket)
  }

  // Template
  return (
    <>
      <img
        src={isFavorite ? inFavorite : favorite}
        alt='favorite'
        style={{ width: '25px', height: '25px', cursor: 'pointer' }}
        onClick={handleFavoriteClick}
      />
      <img
        src={isBasket ? inBasket : basket}
        alt='basket'
        style={{ width: '25px', height: '25px', cursor: 'pointer' }}
        onClick={handleBasketClick}
      />
    </>
  )
}
