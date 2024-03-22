import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setImage } from '../redux/image-preview-slice'
import { AppDispatch } from '../redux/store'
import { BooksNew } from '../types/interfaces'
import { Modal } from './Modal'

export function BookImage (props: BooksNew): JSX.Element {
  // Hooks
  const dispatch = useDispatch<AppDispatch>()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // Methods
  function toggle (): void {
    setIsOpen(!isOpen)
  }

  function handleClickImage (): void {
    dispatch(setImage(props.image))
    toggle()
  }

  // Template
  return (
    <>
      <img
        src={props.image}
        alt='book'
        style={{ cursor: 'pointer', height: '100%', width: '100%' }}
        onClick={handleClickImage}
      />
      {isOpen && (
        <Modal title={props.title} subtitle={props.subtitle} onToggle={toggle} />
      )}
    </>
  )
}
