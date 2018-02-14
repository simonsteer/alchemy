import React from 'react'
import { connect } from 'react-redux'

import Component from '../components/Component'

@connect(state => {
  return {
    axios: state.axios,
    basic: state.basic
  }
})
export default class Main extends React.Component {
  render() {

    const { axios, basic } = this.props

    return (
      <Component prop={basic.data} />
    )
  }
}