import { combineReducers } from 'redux'

import player from './player'
import maps from './maps'
import dialogue from './dialogue'

export default combineReducers({
  player,
  maps,
  dialogue,
})
