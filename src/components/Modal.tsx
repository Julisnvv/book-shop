import { useSelector } from 'react-redux'
import close from '../img/cross.svg'
import style from '../styles/modal.module.css'

interface ModalProps {
  title: string
  subtitle: string
  onToggle: () => void
}

export function Modal (props: ModalProps): JSX.Element {
  // Hooks
  const imageUrl = useSelector((state: any) => state.imagePreview.url)

  // Template
  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <h3 className={style.modalTitle}>{props.title}</h3>
          <img
            src={close}
            alt="close"
            onClick={props.onToggle}
            style={{ width: '30px', height: '30px', cursor: 'pointer' }}
          />
        </div>
        <img className={style.modalImage} src={imageUrl} alt="modalImage" />
        <p className={style.modalSubtitle}>{props.subtitle}</p>
      </div>
    </div>
  )
}
