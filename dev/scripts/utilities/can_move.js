import { tile_names } from '../utilities/maps'

const {
    wall,
    destructible,
    npc_1,
    npc_2,
    npc_3,
    npc_4,
    water,
    gap,
} = tile_names

const non_walkables = [
    wall,
    destructible,
    npc_1,
    npc_2,
    npc_3,
    npc_4,
    water,
    gap,
]

export const can_move = (map, next_index, target_index, exemptions = non_walkables) => {

    let next_tile = map[target_index + next_index]

    for (let i = 0; i < exemptions.length; i++) {
        if (next_tile === exemptions[i]) {
            return false
        }
    }
    return true
}
