import React from 'react'
import style from '../styles/title.module.css'

interface TitleProps {
  name: string
}

export function Title(props: TitleProps): JSX.Element {
  return <h1 className={style.title}>{props.name}</h1>
}
