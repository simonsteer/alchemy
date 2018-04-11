import React from 'react'
import { Fragment } from 'react'

import { ListItem } from '../containers/ListItem'

import { cast_spell } from '../actions/cast-spell'

import { spells } from '../utilities/spells'

const mesmerism_spells = spells.filter(s => s.category === 'mesmerism')
const sorcery_spells = spells.filter(s => s.category === 'sorcery')
const thaumaturgy_spells = spells.filter(s => s.category === 'thaumaturgy')

const Spellbook = ({ dispatch, player, maps }) => {
    return (
        <ul className="spellbook">
            {spells.map(spell =>
                <ListItem
                    key={spell.name}
                    title={
                        <CastSpellButton
                            spell_name={spell.name}
                            onClick={() => dispatch(cast_spell(spell, player, maps))}
                        />
                    }
                    subtitle={`${spell.category} spell, mana cost: ${spell.cost}`}
                    expanded_text={spell.description}
                />
            )}
        </ul>
    )
}

export default Spellbook

const CastSpellButton = ({ spell_name, onClick }) => {
    return (
        <Fragment>
            <span>{spell_name}</span>
            <span onClick={onClick}>cast</span>
        </Fragment>
    )
}
