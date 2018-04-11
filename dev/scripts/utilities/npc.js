const default_thought = [
    { message: "You peer into their mind but there is nothing of value to be seen..." },
]

const default_conversation = [
    {
        message: "..."
    },
]

export const npc = {
    sleeping: false,
    hypnosis: false,
    required_hypnosis: false,
    dream: default_thought,
    thought: default_thought,
    diseased: false,
    cursed: false,
    persuaded: false,
    required_persuasion: false,
    conversation: default_conversation,
    item_held: false,
    required_guile: false,
}