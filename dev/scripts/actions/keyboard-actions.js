import { items } from '../utilities/items'
import { array_movement_numbers } from '../utilities/array_movement_numbers'
import { can_move } from '../utilities/can_move'
import { tile_names } from '../utilities/maps'

//actions
import { update_view } from './update-view'

const {
    map_width_checker,
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

export const arrow_actions = (player, key, global_maps) => {
    
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
            break
        case 38:
            next_index = up
            direction = 180
            break
        case 39:
            next_index = right
            direction = -90
            break
        case 40:
            next_index = down
            direction = 0
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

    let map_index
    let entrance

    switch (next_tile) {
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

    let destination = global_maps[player.current_map.meta.key + map_index]
    let check_for_portal

    if (destination) {
        const {
            left: destination_left,
            up: destination_up,
            right: destination_right,
            down: destination_down
        } = array_movement_numbers(destination.map)

        const entrance_index =
            next_tile === west_portal
            ? destination_left
            : next_tile === north_portal
            ? destination_up
            : next_tile === east_portal
            ? destination_right
            : next_tile === south_portal
            ? destination_down
            : 0

        const new_player_index = destination.map.indexOf(entrance) + entrance_index
        const destination_width = destination.map.lastIndexOf(map_width_checker) + 1

        let y = Math.floor(new_player_index / destination_width)
        let x = new_player_index % destination_width
        destination.map[new_player_index] = alchemist

        check_for_portal = {
            type: 'ENTER_PORTAL_START',
            payload: {
                view: { x, y },
                map: destination,
            }
        }
    } else {
        check_for_portal = false
    }

    const create_arrow_metadata = next_index => ({
        turn: { type: 'TURN', payload: direction },
        can_move: can_move(map, next_index, player_index),
        start_movement: {
            type: 'MOVE_START',
        },
        animate_view: update_view(map, (player_index + next_index)),
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