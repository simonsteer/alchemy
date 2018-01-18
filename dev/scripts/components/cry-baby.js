import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './login'
import Header from './header'
import CurrenciesTracked from './currencies-tracked'
import Info from './info'
import getScrollbarWidth from '../actions/get-scrollbar-width';

global.fetch = require('node-fetch')

@connect(
  (store => {
    return {
      user: store.user,
      history: store.history,
      coins: store.coinlist,
      scrollbar: store.scrollbar
    }
  })
)
export default class CryBaby extends React.Component {

  componentDidMount() {
    this.props.dispatch(getScrollbarWidth())
  }

  render() {
    return (
      <Router>
        {this.props.user.id
        ?
        <div className="layout">
          <Header />
          <CurrenciesTracked />
          <Info />
        </div>
        :
        <Login />
        }
      </Router>
    )
  }
}