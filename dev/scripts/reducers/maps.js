import { maps } from '../utilities/maps'

const initial_maps = maps

export default (maps = initial_maps, action) => {
  switch (action.type) {
    case 'UPDATE_GLOBAL_MAP':
      return {
        ...maps,
        [action.payload.key]: {
          ...maps[action.payload.key],
          map: {
            ...maps[action.payload.key].map,
            map: action.payload.map,
          }
        }
      }
    case 'CAST_TARGETED_SPELL':
      return {
        ...maps,
        [action.payload.key]: {
          ...maps[action.payload.key],
          meta: {
            ...maps[action.payload.key].meta,
            npc: {
              ...maps[action.payload.key].meta.npc,
              [action.payload.target]: {
                ...maps[action.payload.key].meta.npc[action.payload.target],
                ...action.payload.effects,
              }
            }
          }
        }
      }
    default:
      return maps
  }
}