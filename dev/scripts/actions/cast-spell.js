import { array_movement_numbers } from '../utilities/array_movement_numbers'

export const cast_spell = (spell, player, maps) => {

    let { map, meta } = player.current_map
    const { key } = meta
    const player_index = map.indexOf('v')

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
    const target = npc[next_tile]
    
    const target_is_valid = 
        spell.valid_targets.find(target => target === next_tile)

    const spell_config = {
        ['Brainwash']: {
            meets_conditions: typeof target.persuaded === 'number',
            effects: {
                persuaded: player.thaumaturgy,
            },
        },
        ['Telesthesia']: {
            meets_conditions: true,
            action: {
                type: 'INITIATE_DIALOGUE',
                payload: {
                    ...target,
                    conversation: target.sleeping
                        ? target.dream
                        : target.thought,
                }
            }
        },
        ['Langour']: {
            meets_conditions: typeof target.hypnosis === 'number',
            effects: {
                hypnosis: player.thaumaturgy,
                sleeping: player.thaumaturgy >= target.required_hypnosis
                    ? true
                    : false,
            },
        },
        ['Purge Soul']: {
            meets_conditions: target.cursed,
            effects: {
                cursed: false,
                conversation: [{ message: "Thanks to you, I'm no longer cursed! What a relief." }],
                dream: [{ message: "You peer into their mind but there is nothing of value to be seen..." }],
            },
        },
    }

    if (
        spell.targets_npc &&
        spell_config[spell.name].meets_conditions &&
        target_is_valid &&
        player[spell.category] >= spell.level_required
    ) {

        if (spell_config[spell.name].action) {
            return spell_config[spell.name].action
        } else {
            return {
                type: 'CAST_TARGETED_SPELL',
                payload: {
                    target: next_tile,
                    key,
                    effects: spell_config[spell.name].effects,
                    cost: spell.cost,
                    experience: spell.experience,
                    ingredients: spell.ingredients,
                }
            }
        }

    } else {
        return { type: 'CAST_SPELL_FAILED' }
    }
}
