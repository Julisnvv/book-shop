import { TitleProps } from '../types/interfacesProps'
import style from '../styles/title.module.css'

export function Title(props: TitleProps): JSX.Element {
  return <h1 className={style.title}>{props.name}</h1>
}
