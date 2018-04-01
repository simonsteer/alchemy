// react
import React, { Fragment } from 'react'
import { connect } from 'react-redux'

// components
import Dialogue from '../components/Dialogue'
import Mana from '../components/Mana'
import Inventory from '../components/Inventory'
import Spellbook from '../components/Spellbook'
import Map from '../components/Map'
import Level from '../components/Level'
import QuestLog from '../components/QuestLog'
import SkillTree from '../components/SkillTree'

// actions
import { arrow_actions, spacebar_action } from '../actions/keyboard-actions'
import { update_global_map } from '../actions/update-global-map'
import { level_up } from '../actions/level-up'
import { update_view } from '../actions/update-view'

// configs
import { tile_names } from '../utilities/maps'

const { alchemist } = tile_names

@connect(store => {
  return {
    player: store.player,
    maps: store.maps,
    dialogue: store.dialogue,
  }
})
export default class Main extends React.Component {
  componentDidMount() {

    const { dispatch, player } = this.props

    window.addEventListener('keydown', this.move.bind(this))
    window.addEventListener('keydown', this.interact.bind(this))
    dispatch(update_view(player.current_map.map, player.current_map.map.indexOf('v')))
  }

  render() {
    const { dispatch, player, dialogue, maps }  = this.props

    return (
      <div className="game-container">
        {dialogue.is_active &&
          <Dialogue
            dialogue={dialogue}
            dispatch={dispatch}
          />
        }

        <Mana player={player} />
        <Inventory items={player.items} />
        <Spellbook
          player={player}
          dispatch={dispatch}
          maps={maps}
        />

        <Map player={player} />

        <Level player={player} />
        <QuestLog player={player} />
        <SkillTree player={player} />
      </div>
    )
  }

  move(event) {
    const { dispatch, player, dialogue } = this.props

    if (
      event.keyCode > 40 ||
      event.keyCode < 37 ||
      dialogue.is_active
    ) {
      return
    }

    const actions = arrow_actions(player, event.keyCode)
    const {
      turn,
      can_move,
      start_movement,
      item_available,
      get_item,
      finish_movement,
      enter_portal,
      animate_view
    } = actions

    if (player.direction !== turn.payload && player.is_not_moving) {
      dispatch(turn) 
    }
    
    if (player.is_not_moving && can_move) {
      dispatch(start_movement)
      dispatch(animate_view)

      if (enter_portal.start) {
        dispatch({ type: 'FADE_START' })
      }
      
      setTimeout(() => {
        if (item_available) {
          dispatch(get_item)
        }
        if (enter_portal.start) {
          dispatch(enter_portal.start)
          dispatch(update_global_map(player.current_map))
          dispatch(enter_portal.finish)

          const { map } = this.props.player.current_map
          const player_index = map.indexOf(alchemist)

          dispatch(update_view(map, player_index))
          
        } else {
          dispatch(finish_movement)
        }
      }, 200)

      if (enter_portal.start) {
        setTimeout(() => dispatch({ type: 'FADE_FINISH' }), 400)
        setTimeout(() => dispatch({ type: 'RESUME_MOVEMENT' }), 600)
      }

    }
  }

  interact(event) {
    const { dispatch, dialogue, player, maps } = this.props
    
    if (event.keyCode !== 32) {
      return
    }

    if (
      dialogue.is_active ||
      !player.is_not_moving
    ) {
      return
    }

    const action = spacebar_action(player, maps)
    action ? dispatch(action) : () => {}
  }
}