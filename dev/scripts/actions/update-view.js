import { tile_names } from '../utilities/maps'

const {
    map_width_checker,
    alchemist
} = tile_names

export const update_view = (map, player_index) => {

    const map_width = map.lastIndexOf(map_width_checker) + 1

    let y = Math.floor((player_index - map_width) / map_width)
    let x = player_index % map_width

    return {
        type: 'UPDATE_VIEW',
        payload: {
            x,
            y,
        }   
    }  
}