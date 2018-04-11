import { array_movement_numbers } from '../utilities/array_movement_numbers'
import { tile_names } from '../utilities/maps'
import { start } from 'repl';

const {
    alchemist,
    water,
    ice,
    map_width_checker,
    walkable,
    parched_soil
} = tile_names

export const cast_spell = (spell, player, maps) => {

    let { map, meta } = player.current_map
    const { key } = meta
    const player_index = map.indexOf(alchemist)

    const global_map = maps[key]
    const { npc } = global_map.meta

    const {
        left, 
        up,
        down,
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

    let target = spell.targets_npc
        ? npc[next_tile]
        : player_index + next_index

    const target_is_valid = spell.valid_targets
        ? spell.valid_targets.includes(next_tile)
        : true
        
    if (!target_is_valid) {
        return { type: 'CAST_SPELL_FAILED' }
    }

    const spell_config = create_spell_config(spell, player, target)

    if (
        spell_config.meets_conditions &&
        player[spell.category] >= spell.level_required
    ) {

        if (spell_config.action) {
            return spell_config.action
        } else {
            return {
                type: 'CAST_SPELL',
                payload: {
                    target: next_tile,
                    key,
                    cost: spell.cost,
                    experience: spell.experience,
                    ingredients: spell.ingredients,
                    npc_effects: spell_config.npc_effects || {},
                    player_effects: spell_config.player_effects || {},
                    dialogue_effects: spell_config.dialogue_effects || {},
                    map_effects: spell_config.map_effects || {},
                }
            }
        }

    } else {
        return { type: 'CAST_SPELL_FAILED' }
    }
}


const create_spell_config = (spell, player, target) => {

    const { map } = player.current_map
    const { direction } = player
    const { up, down, left, right } = array_movement_numbers(map)

    const index_shift =
        direction === 0
        ? down
        : direction === 90
        ? left
        : direction === -90
        ? right
        : up

    const player_index = map.indexOf(alchemist)
    const next_tile = map[player_index + index_shift]

    switch (spell.name) {
    case 'Brainwash':
        return {
            meets_conditions: typeof target.persuaded === 'number',
            npc_effects: {
                [next_tile]: {
                    ...player.current_map.meta.npc[next_tile],
                    persuaded: player.thaumaturgy,
                },
            },
        }
    case 'Telesthesia':
        return {
            meets_conditions: true,
            dialogue_effects: {
                conversation: target.sleeping
                    ? target.dream
                    : target.thought,
                npc: target,
                is_active: true,
            },
        }
    case 'Guile':
        const { name } = target.item_held

        return {
            meets_conditions:
                target.item_held &&
                player.mesmerism >= target.required_guile,
            npc_effects: {
                [next_tile]: {
                    ...player.current_map.meta.npc[next_tile],
                    item_held: false,
                },
            },
            player_effects: {
                items: {
                    ...player.items, 
                    [name]: {
                        ...target.item_held,
                        amount: player.items[name] ? player.items[name].amount  + 1 : 1,
                    },
                },
            },
            dialogue_effects: {
                conversation: [{ message: `You successfully stole a ${name}.` }],
                npc: target,
                is_active: true,
            },
        }
    case 'Langour':
        return {
            meets_conditions: typeof target.hypnosis === 'number',
            npc_effects: {
                [next_tile]: {
                    ...player.current_map.meta.npc[next_tile],
                    hypnosis: player.thaumaturgy,
                    sleeping: player.thaumaturgy >= target.required_hypnosis
                        ? true
                        : false,
                },
            },
        }
    case 'Mirage':
        return {
            meets_conditions: true,
            player_effects: {
                invisible: true,
            },
        }
    case 'Mend Ailment':
        return {
            meets_conditions: target.diseased,
            npc_effects: {
                [next_tile]: {
                    ...player.current_map.meta.npc[next_tile],
                    diseased: false,
                    conversation: [{ message: "I don't feel sick anymore! Thank you so much!" }],
                },
            },
        }
    case 'Purge Soul':
        return {
            meets_conditions: target.cursed,
            npc_effects: {
                [next_tile]: {
                    ...player.current_map.meta.npc[next_tile],
                    cursed: false,
                    conversation: [{ message: "Thanks to you, I'm no longer cursed! What a relief." }],
                    dream: [{ message: "You peer into their mind but there is nothing of value to be seen..." }],
                },
            },
        }
    case 'Conflagration':
        const conflagration_map = [...map]
        conflagration_map[target] = ' '
        return {
            meets_conditions: true,
            map_effects: {
                map: conflagration_map,
            },
        }
    case 'Sublimate':
        const sublimate_indeces = get_identical_contiguous_tiles(target, map)
        const sublimate_map = sublimate_indeces
            ? map.map((tile, i) => {
                if (sublimate_indeces.includes(i) && tile === water) {
                    return ice
                } else if (sublimate_indeces.includes(i) && tile === ice) {
                    return water
                } else {
                    return tile
                }
            })
            : map

        return {
            meets_conditions: map[target] === water || map[target] === ice,
            map_effects: {
                map: sublimate_map,
            },
        }
    case 'Icarus Jump':
        const two_indeces_ahead = target + index_shift
        const current_index = target - index_shift
        
        const icarus_jump_map = [...map]
        icarus_jump_map[current_index] = walkable
        icarus_jump_map[two_indeces_ahead] = alchemist

        const movement_squared = index_shift**2
        const movement = (Math.sqrt(movement_squared) / index_shift) * 2
        const moving_vertically = movement_squared > 1

        const view_effects = moving_vertically
            ? { y: player.view.y + movement }
            : { x: player.view.x + movement }

        return {
            meets_conditions: map[two_indeces_ahead] === walkable,
            map_effects: {
                map: icarus_jump_map,
            },
            player_effects: {
                view: {
                    ...player.view,
                    ...view_effects,
                }
            }
        }
    case 'Cloudburst':
        const cloudburst_indeces = index_of_every(parched_soil, map)
        const cloudburst_map = cloudburst_indeces
            ? map.map((tile, i) => {
                if (cloudburst_indeces.includes(i)) {
                    return water
                } else {
                    return tile
                }
            })
            : map

        return {
            meets_conditions: map.includes(parched_soil),
            map_effects: {
                map: cloudburst_map,
            },
        }
    default:
        return {
            meets_conditions: false,
        }
    }
}


const get_identical_contiguous_tiles = (tile_index, map) => {
    const tile = map[tile_index]
    const array_numbers = Object.values(array_movement_numbers(map))

    const indeces = [tile_index]
    const checked_tiles = []

    const get_adjacent_identical_tiles = starting_at_index => {

        for (let i = 0; i < array_numbers.length; i++) {
            const adjacent_tile_index = starting_at_index + array_numbers[i]
            const adjacent_tile = map[adjacent_tile_index]

            if (
                adjacent_tile === tile &&
                !indeces.includes(adjacent_tile_index)
            ) {
                indeces.push(adjacent_tile_index)
            }
        }

        checked_tiles.push(starting_at_index)
        const loop = [...indeces].filter(index => !checked_tiles.includes(index))

        for (let i = 0; i < loop.length; i++) {
            get_adjacent_identical_tiles(loop[i])
        }
    }

    get_adjacent_identical_tiles(tile_index)
    return indeces
}

const index_of_every = (item, arr) => {
    let indeces = [], i = -1
    while ((i = arr.indexOf(item, i+1)) != -1) {
        indeces.push(i)
    }
    return indeces
}