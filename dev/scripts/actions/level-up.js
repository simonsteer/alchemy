export const level_up = player => ({

    type: 'LEVEL_UP',
    payload: {
        level: player.level + 1,
        mana: player.mana + 25,
        health: player.health + 25,
        experience_until_level_up: (player.level ** 2) * 100,
        skill_points: player.skill_points + 1,
    },
})
