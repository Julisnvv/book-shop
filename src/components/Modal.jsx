import { useSelector } from 'react-redux'
import style from '../styles/modal.module.css'

export function Modal (props) {
  // Hooks
  const imageUrl = useSelector(state => state.imagePreview.url)

  // Template
  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <h3 className={style.modalTitle}>{props.title}</h3>
          <button
            className={style.button}
            onClick={props.onToggle}>
              Back
          </button>
        </div>
        <img className={style.modalImage} src={imageUrl} alt="modalImage" />
        <p className={style.modalSubtitle}>{props.subtitle}</p>
      </div>
    </div>
  )
}
