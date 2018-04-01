import { items } from '../utilities/items'
import { array_movement_numbers } from '../utilities/array_movement_numbers'
import { can_move } from '../utilities/can_move'
import { tile_names } from '../utilities/maps'

//actions
import { update_view } from './update-view'

const {
    alchemist,
    destructible,
    npc_1,
    npc_2,
    npc_3,
    npc_4,
    north_portal,
    east_portal,
    south_portal,
    west_portal,
    ingredient_1,
    ingredient_2,
    ingredient_3
} = tile_names

export const arrow_actions = (player, key) => {
    
    const { current_map } = player
    const { map, meta } = current_map
    const player_index = map.indexOf(alchemist)

    const {
        down,
        up,
        left,
        right
    } = array_movement_numbers(map)

    let direction = player.direction
    let next_index = 0
    let move_start
    
    switch (key) {
        case 37:
            next_index = left
            direction = 90
            move_start = { x: player.x - 1 }
            break
        case 38:
            next_index = up
            direction = 180
            move_start = { y: player.y - 1 }
            break
        case 39:
            next_index = right
            direction = -90
            move_start = { x: player.x + 1 }
            break
        case 40:
            next_index = down
            direction = 0
            move_start = { y: player.y + 1 }
            break
        default:
            break
    }

    const next_tile = map[player_index + next_index]

    const check_for_item =
        next_tile === ingredient_1 ||
        next_tile === ingredient_2 ||
        next_tile === ingredient_3 ||
        false

    const check_for_portal = (
        next_tile === north_portal ||
        next_tile === east_portal ||
        next_tile === south_portal ||
        next_tile === west_portal
    )
            ? { type: 'ENTER_PORTAL_START', payload: { exit: next_tile, map } }
            : false

    const create_arrow_metadata = next_index => ({
        turn: { type: 'TURN', payload: direction },
        can_move: can_move(map, next_index, player_index),
        start_movement: {
            type: 'MOVE_START',
            payload: move_start,
        },
        item_available: check_for_item,
        get_item: {
            type: 'GET_ITEM',
            payload: items[meta.style][next_tile],
        },
        enter_portal: {
            start: check_for_portal,
            finish: { type: 'ENTER_PORTAL_FINISH' },
        },
        finish_movement: { type: 'MOVE_FINISH', payload: next_index },
        animate_view: update_view(map, (player_index + next_index)),
    })

    return create_arrow_metadata(next_index)
}

export const spacebar_action = (player, global_maps) => {
    
    let { map, meta } = player.current_map
    const { key } = meta
    const player_index = map.indexOf(alchemist)

    const {
        down,
        up,
        left,
        right
    } = array_movement_numbers(map)

    const direction = player.direction
    let next_index =
        direction === 0
        ? down
        : direction === 90
        ? left
        : direction === 180
        ? up
        : right

    const next_tile = map[player_index + next_index]

    switch (next_tile) {
        case destructible:
            map[player_index + next_index] = ' '
            return {
                type: 'BREAK_DESTRUCTIBLE',
                payload: map,
            }
        case npc_1:
        case npc_2:
        case npc_3:
        case npc_4:
            const npc = global_maps[key].meta.npc[next_tile]
            return {
                type: 'INITIATE_DIALOGUE',
                payload: {
                    ...npc,
                    conversation: npc.sleeping
                        ? [
                            { message: "..." },
                            { message: "This person is asleep." },
                        ]
                        : npc.conversation,
                }
            }
        default:
            return false
    }
}