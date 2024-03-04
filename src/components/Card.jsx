import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setImage } from '../redux/image-preview-slice'
import { Modal } from '../components/Modal'
import style from '../styles/card.module.css'

export function Card (props) {
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
    <div>
      <div className={style.card}>
        <div className={style.imageContainer}>
          <img
            src={props.image}
            alt='book'
            onClick={handleClickImage}
            style={{ width: '100%', height: '100%', cursor: 'pointer' }} />
        </div>
        <div className={style.titleContainer}>
          <p className={style.bebas}>{props.title}</p>
        </div>
        <div className={style.infoContainer}>
          <p className={style.poppins}>{props.isbn13}</p>
          <p className={style.bebas}>{props.price}</p>
        </div>
      </div>
      {isOpen && (
        <Modal title={props.title} subtitle={props.subtitle} onToggle={toggle}>
          {props.children}
        </Modal>
      )}
    </div>
  )
}
