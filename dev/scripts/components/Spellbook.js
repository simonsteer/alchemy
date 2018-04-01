import React from 'react'
import { spells } from '../utilities/spells'

import { cast_spell } from '../actions/cast-spell'

const Spellbook = ({ dispatch, player, maps }) => {
    return (
        <ul className="spellbook">
            {spells.map(spell =>
            <li
                className="spell"
                key={spell.name}
                onClick={() => dispatch(cast_spell(spell, player, maps))}
            >
                {spell.name}
            </li>
            )}
        </ul>
    )
}

export default Spellbook