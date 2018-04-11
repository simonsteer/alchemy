import { maps } from '../utilities/maps'
 
const initial_maps = maps

export default (maps = initial_maps, action) => {
  switch (action.type) {
    case 'UPDATE_GLOBAL_MAP':
      return {
        ...maps,
        [action.payload.key]: {
          ...maps[action.payload.key], 
          map: action.payload.map,
        }
      }
    case 'CAST_SPELL':
      const { key, target } = action.payload

      return {
        ...maps,
        [key]: {
          ...maps[key],
          ...action.payload.map_effects,
          meta: {
            ...maps[key].meta,
            npc: {
              ...maps[key].meta.npc,
              ...action.payload.npc_effects,
            }
          }
        }
      }
    default:
      return maps
  }
}