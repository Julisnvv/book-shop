import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import style from './styles/layout.module.css'

export class Layout extends React.Component {
  render () {
    return (
      <div className={style.layout}>
        <Header />
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    )
  }
}
