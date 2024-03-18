import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setImage } from '../redux/image-preview-slice'
import { Modal } from './Modal'

export function BookImage (props) {
  // Hooks
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  // Methods
  function toggle () {
    setIsOpen(!isOpen)
  }

  function handleClickImage () {
    dispatch(setImage(props.image))
    toggle()
  }

  // Template
  return (
    <>
      <img
        src={props.image}
        alt="book"
        style={{ cursor: 'pointer', height: '100%', width: '100%' }}
        onClick={handleClickImage}
      />
      {isOpen && (
        <Modal title={props.title} subtitle={props.subtitle} onToggle={toggle}>
          {props.children}
        </Modal>
      )}
    </>
  )
}
