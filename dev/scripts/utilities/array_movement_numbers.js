import { tile_names } from '../utilities/maps'
const { map_width_checker } = tile_names

export const array_movement_numbers = map => {
    let y = map.lastIndexOf(map_width_checker) + 1

    return {
        down: y,
        up: y * -1,
        left: -1,
        right: 1,
    }
}
