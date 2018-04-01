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
  items: {},
  experience: 0,
  experience_until_level_up: 100,
  skill_points: 0,
  current_map: {
    ...maps[40],
  },
  x: 0,
  y: 0,
  is_not_moving: true,
  direction: 0,
  view: {
    x: 0,
    y: 0,
    fade: false,
  }
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
        ...action.payload
      }
    case 'MOVE_FINISH':
      map[player_index + action.payload] = alchemist
      map[player_index] = walkable
      return {
        ...player,
        is_not_moving: true,
        x: 0,
        y: 0,
        current_map: {
          ...current_map,
          map
        },
      }
    case 'GET_ITEM':
      if (items[action.payload.name]) {
        return {
          ...player,
          items: {
            ...items,
            [action.payload.name]: player.items[action.payload.name] + 1,
          }
        }
      } else {
        return {
          ...player,
          items: {
            ...items,
            [action.payload.name]: 1,
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
      let { exit, map: next_map } = action.payload
      let map_index
      let entrance
      let entrance_index
      
      switch (exit) {
        case west_portal:
        map_index = -1
        entrance = east_portal
        break
        case south_portal:
        map_index = 9
        entrance = north_portal
        break
        case east_portal:
        map_index = 1
        entrance = west_portal
        break
        case north_portal:
        map_index = -9
        entrance = south_portal
        break
      }
      
      let destination = maps[player.current_map.meta.key + map_index]

      const {
        left,
        up,
        right,
        down
      } = array_movement_numbers(destination.map)

      entrance_index =
        exit === west_portal
        ? left
        : exit === north_portal
        ? up
        : exit === east_portal
        ? right
        : exit === south_portal
        ? down
        : 0

      const new_player_index = destination.map.indexOf(entrance) + entrance_index
      const destination_width = destination.map.lastIndexOf(map_width_checker) + 1

      let y = Math.floor(new_player_index / destination_width)
      let x = new_player_index % destination_width

      destination.map[new_player_index] = alchemist

      return {
        ...player,
        current_map: destination,
        view: {
          ...player.view,
          x,
          y,
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
    default:
      return player
  }
}