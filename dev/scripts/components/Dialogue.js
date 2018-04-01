// react
import React from 'react'

// actions
import { continue_dialogue } from '../actions/continue-dialogue'
import { finish_dialogue } from '../actions/finish-dialogue'

const DialogueBox = ({ dialogue, dispatch }) => {

    const { npc, conversation } = dialogue
    const {
        message,
        persuaded_message,
        persuaded_button_text,
    } = conversation[0]

    const npc_is_persuaded =
        npc.persuaded >= npc.required_persuasion
    
    const is_last_message =
        conversation.length === 1 ||
        (!conversation[1].message && !npc_is_persuaded)
        
    const dialogue_text = npc_is_persuaded && persuaded_message
        ? persuaded_message
        : message

    const button_text = is_last_message
        ? 'Okay'
        : npc_is_persuaded
        ? persuaded_button_text || 'Next'
        : 'Next'

    const handleClick = () =>
        is_last_message
            ? dispatch(finish_dialogue)
            : dispatch(continue_dialogue)

    return (
        <div className="dialogue-box">
            <h2 className="dialogue-text">
                {dialogue_text}
            </h2>
            <button
                className="dialogue-button"
                onClick={handleClick}
            >
                {button_text}
            </button>
        </div>
    )
}

export default DialogueBox
