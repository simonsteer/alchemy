import React from 'react'
import { Link, Route } from 'react-router-dom'

import Header from './header'
import CurrencyTile from './currency-tile'
import { CloseSearchButton, AddMoreButton } from './buttons'

import { getUser } from '../actions/get-user'

import { connect } from 'react-redux'
const cc = require('cryptocompare')

@connect(
  (store => {
    return {
      user: store.user,
      history: store.history,
      coins: store.coinlist
    }
  })
)
export default class CurrenciesTracked extends React.Component {

  constructor() {
    super()
    this.state = {
      tiles: []
    }
  }

  componentDidMount() {

    const dbRef = firebase.database().ref(`users/${this.props.user.id}`)
    dbRef.on('value', (snapshot) => {
      
      let { watchlist, currency } = snapshot.val()

      if (watchlist === null || watchlist === undefined) {
        this.props.dispatch(getUser({
            watchlist
        }))
        this.setState({ tiles: [] })
        return
      };

      const keys = Object.keys(watchlist)
      let tickers = []
      let tiles = []

      this.props.dispatch(getUser({ watchlist }))

      for (let i = 0; i < keys.length; i++) {
        tickers.push(watchlist[keys[i]].ticker)
      }

      cc.priceMulti(tickers, currency).then(prices => {
        for (let i = 0; i < tickers.length; i++) {
          const tick = tickers[i]
          tiles.push(
            <CurrencyTile
              key={keys[i]}
              id={keys[i]}
              parent={this.constructor.name}
              ticker={tickers[i]}
              name={watchlist[keys[i]].name}
              price={prices[tickers[i]][currency]}
            />
          )
        }

        this.setState({ tiles })

      })
    })
  }
  
  render() {
    return (
      <ul className="currencies-tracked">
        {this.state.tiles.map(tile => {
          return tile
        })}
        <Route path="/search" component={CloseSearchButton} />
        <Route exact path="/" component={AddMoreButton} />
      </ul>
    )
  }
}

