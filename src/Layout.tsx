import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import style from './styles/layout.module.css'

interface LayoutProps {
  setLang: (lang: string) => void
}

export class Layout extends React.Component<LayoutProps> {
  render () {
    return (
      <div className={style.layout}>
        <Header setLang={this.props.setLang} />
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    )
  }
}
