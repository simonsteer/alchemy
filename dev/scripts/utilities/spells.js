import { tile_names } from '../utilities/maps'

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
    ingredient_3,
    soil,
    water,
    ice
} = tile_names

const mesmerism = [
    {
        category: 'mesmerism',
        level_required: 1,
        name: 'Brainwash',
        description: "Bend your target's will and make them susceptible to persuasion.",
        cost: 10,
        experience: 40,
        targets_npc: true,
        valid_targets: [
            npc_1,
            npc_2,
            npc_3,
            npc_4,
        ],
        timed: false,
        ingredients: [
            { ['Sage']: 1 },
        ],
    },
    {
        category: 'mesmerism',
        level_required: 2,
        name: "Guile",
        description: "Confuse your target and pickpocket them while they are distracted.",
        cost: 50,
        experience: 80,
        targets_npc: true,
        valid_targets: [
            npc_1,
            npc_2,
            npc_3,
            npc_4,
        ],
        timed: false,
        ingredients: [
            { ['Onyx Dust']: 1 },
        ],
    },
    {
        category: 'mesmerism',
        level_required: 3,
        name: 'Telesthesia',
        description: "See into your target's thoughts in the present moment.",
        cost: 20,
        experience: 120,
        targets_npc: true,
        valid_targets: [
            npc_1,
            npc_2,
            npc_3,
            npc_4,
        ],
        timed: false,
        ingredients: [
            { ['Quartz']: 1 },
            { ["Owl's Eye"]: 1 },
        ],
    },
    {
        category: 'mesmerism',
        level_required: 4,
        name: 'Langour',
        description: "Cast a sleeping spell on your target. Lasts one hour.",
        cost: 30,
        experience: 160,
        targets_npc: true,
        valid_targets: [
            npc_1,
            npc_2,
            npc_3,
            npc_4,
        ],
        timed: true,
        duration: 3600,
        ingredients: [
            { ['Onyx Dust']: 1 },
            { ['Indigo Flower']: 2 },
            { ['Valerian Root']: 2 },
        ],
    },
    {
        category: 'mesmerism',
        level_required: 5,
        name: 'Chimera of Invisibility',
        description: 'Bend light around your body to appear invisible for 15 seconds.',
        cost: 100,
        experience: 200,
        targets_npc: false,
        timed: true,
        duration: 15,
        ingredients: [
            { ['Phosphorus']: 1 },
            { ['Nymph Wings']: 2 },
            { ['Crystal Dust']: 3 },
        ],
    },
]

const sorcery = [
    {
        category: 'sorcery',
        level_required: 1,
        name: 'Conflagration',
        description: 'Incinerate whatever is in front of you and reduce it to ash.',
        cost: 10,
        experience: 40,
        targets_npc: true,
        valid_targets: [
            destructible
        ],
        timed: false,
        ingredients: [
            { ['Phosphorus']: 1 },
            { ['Sulfur']: 1 },
        ],
    },
    {
        category: 'sorcery',
        level_required: 2,
        name: 'Sublimate',
        description: 'Instantly freeze or thaw a large body of water.',
        cost: 20,
        experience: 80,
        targets_npc: true,
        valid_targets: [
            water,
            ice,
        ],
        timed: false,
        ingredients: [
            { ["Mercury"]: 2 },
        ],
    },
    {
        category: 'sorcery',
        level_required: 3,
        name: 'Terraform',
        description: 'Transmute loamy soil to form an earthen barrier.',
        cost: 30,
        experience: 120,
        targets_npc: true,
        valid_targets: [
            soil
        ],
        timed: false,
        ingredients: [
            { ['Geode']: 2 },
        ],
    },
    {
        category: 'sorcery',
        level_required: 4,
        name: 'Icarus Jump',
        description: 'Hover above the ground and float two spaces forwards.',
        cost: 50,
        experience: 160,
        targets_npc: false,
        timed: false,
        ingredients: [
            { ['Phoenix Feather']: 2 },
            { ['Nymph Wings']: 2 },
        ],
    },
    {
        category: 'sorcery',
        level_required: 5,
        name: 'Cloudburst',
        description: 'Call forth rain from the heavens and flood the current area.',
        cost: 100,
        experience: 200,
        targets_npc: true,
        valid_targets: [
            npc_1,
            npc_2,
            npc_3,
            npc_4,
        ],
        timed: false,
        ingredients: [
            { ['Holy Water']: 5 },
        ],
    },
]

const thaumaturgy = [
    {
        category: 'thaumaturgy',
        level_required: 1,
        name: 'Mend Ailment',
        description: "Purge any diseases from your target by purifying their body.",
        cost: 10,
        experience: 40,
        targets_npc: true,
        valid_targets: [
            npc_1,
            npc_2,
            npc_3,
            npc_4,
        ],
        timed: false,
        ingredients: [
            { ['Lavender']: 1 },
            { ['Eucalyptis']: 1 },
        ],
    },
    {
        category: 'thaumaturgy',
        level_required: 2,
        name: 'Purge Soul',
        description: 'Banish any demons or curses affecting your target.',
        cost: 20,
        experience: 80,
        targets_npc: true,
        valid_targets: [
            npc_1,
            npc_2,
            npc_3,
            npc_4,
        ],
        timed: false,
        ingredients: [
            { ['Holly']: 1 },
            { ['Holy Water']: 1 },
        ],
    },
    {
        category: 'thaumaturgy',
        level_required: 3,
        name: 'Clairvoyance',
        description: 'See through the veil between worlds for 20 seconds.',
        cost: 30,
        experience: 120,
        targets_npc: false,
        timed: true,
        duration: 20,
        ingredients: [
            { ["Owl's Eye"]: 2 },
            { ['Quartz']: 2 },
        ],
    },
    {
        category: 'thaumaturgy',
        level_required: 4,
        name: '',
        description: '',
        cost: 50,
        experience: 160,
        targets_npc: true,
        valid_targets: [],
        timed: false,
        ingredients: [
            { ['']: 1 },
        ],
    },
    {
        category: 'thaumaturgy',
        level_required: 5,
        name: 'Epoch Shift',
        description: 'Target is pushed 100 years forwards or backwards through time.',
        cost: 100,
        experience: 200,
        targets_npc: false,
        timed: false,
        ingredients: [
        { ['Meteor Fragment']: 6 },
    ],
    },
]

export const spells = [
    ...mesmerism,
    ...sorcery,
    ...thaumaturgy,
]