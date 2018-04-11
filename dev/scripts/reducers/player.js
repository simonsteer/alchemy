import { maps, tile_names } from '../utilities/maps'
import { array_movement_numbers } from '../utilities/array_movement_numbers'

const {
  map_width_checker,
  alchemist, 
  walkable,
  east_portal,
  north_portal,
  west_portal,
  south_portal
} = tile_names

const initial_stats = {
  level: 0,
  mana: 50,
  thaumaturgy: 5,
  mesmerism: 5,
  sorcery: 5,
  items: {
    ['Lavender']: {
      type: 'ingredient',
      name: 'Lavender',
      value: {
          buy: 10,
          sell: 5,
      },
      amount: 3,
    },
  },
  experience: 0,
  experience_until_level_up: 100,
  skill_points: 0,
  current_map: {
    ...maps[40],
  },
  is_not_moving: true,
  direction: 0,
  view: {
    x: 0,
    y: 0,
    fade: false,
  },
  invisible: false,
}

export default (player = initial_stats, action) => {

  const { current_map } = player
  let { map } = current_map
  let { items } = player
  
  const player_index = map.indexOf(alchemist)

  switch (action.type) {
    case 'TURN': {
      return {
        ...player,
        direction: action.payload,
      }
    }
    case 'MOVE_START':
      return {
        ...player,
        is_not_moving: false,
      }
    case 'MOVE_FINISH':
      map[player_index + action.payload] = alchemist
      map[player_index] = walkable
      return {
        ...player,
        is_not_moving: true,
        current_map: {
          ...current_map,
          map
        },
      }
    case 'GET_ITEM':
      return {
        ...player,
        items: {
          ...items,
          [action.payload.name]: {
            ...action.payload,
            amount: player.items[action.payload.name] ? player.items[action.payload.name].amount + 1 : 1,
          },
        }
      }
    case 'BREAK_DESTRUCTIBLE':
      return {
        ...player,
        current_map: {
          ...current_map,
          map: action.payload,
        },
      }
    case 'ENTER_PORTAL_START':
      return {
        ...player,
        current_map: action.payload.map,
        view: {
          ...player.view,
          ...action.payload.view,
        }
      }
      case 'ENTER_PORTAL_FINISH':
        return {
          ...player,
          x: 0,
          y: 0,
        }
      case 'UPDATE_VIEW':
        return {
          ...player,
          view: {
            ...player.view,
            ...action.payload,
          }
        }
      case 'FADE_START':
        return {
          ...player,
          view: {
            ...player.view,
            fade: true,
          }
        }
      case 'FADE_FINISH':
        return {
          ...player,
          view: {
            ...player.view,
            fade: false,
          }
        }
      case 'RESUME_MOVEMENT':
        return {
          ...player,
          is_not_moving: true,
        }
      case 'CAST_SPELL':
        return {
          ...player,
          ...action.payload.player_effects,
          current_map: {
            ...player.current_map,
            ...action.payload.map_effects,
          }
        }
    default:
      return player
  }
}