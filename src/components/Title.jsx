import style from '../styles/title.module.css'

export function Title (props) {
  return <h1 className={style.title}>{props.name}</h1>
}
