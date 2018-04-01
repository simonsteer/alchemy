const dialogue_setup = {
    is_active: false,
    conversation: null,
    npc: null,
}

export default (dialogue = dialogue_setup, action) => {
  switch (action.type) {
    case 'INITIATE_DIALOGUE':
      return {
        ...dialogue,
        is_active: true,
        conversation: action.payload.conversation,
        npc: action.payload,
      }
    case 'CONTINUE_DIALOGUE':
      const continued_conversation = dialogue.conversation.slice(1)
      return {
        ...dialogue,
        conversation: continued_conversation,
      }
    case 'FINISH_DIALOGUE':
      return {
        ...dialogue,
        is_active: false,
        conversation: null,
        npc: null,
      }
    default:
      return dialogue
  }
}