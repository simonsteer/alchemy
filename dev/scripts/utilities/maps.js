import { npc } from './npc'

/*

- OVERWORLD -
 ______________________________________________________________
|      |      |      |      |      |      |      |      |      |
|  01  |  02  |  03  |  04  |  05  |  06  |  07  |  08  |  09  |
|______|______|______|______|______|______|______|______|______|
|      |      |      |      |      |      |      |      |      |
|  10  |  11  |  12  |  13  |  14  |  15  |  16  |  17  |  18  |
|______|______|______|______|______|______|______|______|______|
|      |      |      |      |      |      |      |      |      |
|  19  |  20  |  21  |  22  |  23  |  24  |  25  |  26  |  27  |
|______|______|______|______|______|______|______|______|______|
|      |      |      |FOREST|FOREST|FOREST|      |      |      |
|  28  |  29  |  30  |  31  |  32  |  33  |  34  |  35  |  36  |
|______|______|______|______|______|______|______|______|______|
|      |      |      |FOREST| HOME |FOREST|      |      |      |
|  37  |  38  |  39  |  40  |  41  |  42  |  43  |  44  |  45  |
|______|______|______|______|______|______|______|______|______|
|      |      |      |FOREST|FOREST|FOREST|      |      |      |
|  46  |  47  |  48  |  49  |  50  |  51  |  52  |  53  |  54  |
|______|______|______|______|______|______|______|______|______|
|ISLES |ISLES |ISLES |      |      |      |      |      |      |
|  55  |  56  |  57  |  58  |  59  |  60  |  61  |  62  |  63  |
|______|______|______|______|______|______|______|______|______|
|ISLES |ISLES |ISLES |      |      |      |      |      |      |
|  64  |  65  |  66  |  67  |  68  |  69  |  70  |  71  |  72  |
|______|______|______|______|______|______|______|______|______|
|ISLES |ISLES |ISLES |      |      |      |      |      |      |
|  73  |  74  |  75  |  76  |  77  |  78  |  79  |  80  |  81  |
|______|______|______|______|______|______|______|______|______|

- KEY GUIDE -

space = walkable
x = wall
d = destructible
i = ice
w = water
g = gap
s = loamy soil

arrows = portals

v = player

0 - 2 = ingredients
3 - 6 = npc
7 - 9

*/

export const map_colors = {
    forest: {

        background: '#e8ffb5',
        water: '#e8ffb5',
        destructible: '#e8ffb5',
    },
    isles: '',
    desert: '',
    tundra: {
        background: '#eafeff',
        water: '#eafeff',
        destructible: '#eafeff',
    },
    mountains: '',
    jungle: '',
    swamp: '',
}

export const tile_names = {
    map_width_checker: '#',
    alchemist: 'v',
    walkable: ' ',
    wall: 'x',
    water: 'w',
    destructible: 'd',
    ice: 'i',
    gap: 'g',
    soil: 's',
    ingredient_1: '0',
    ingredient_2: '1',
    ingredient_3: '2',
    npc_1: '3',
    npc_2: '4',
    npc_3: '5',
    npc_4: '6',
    north_portal: '↑',
    east_portal: '→',
    south_portal: '↓',
    west_portal: '←',
}

export const maps = {
  [40]: {
    map: (
        '##########################################' +
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' +
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' +
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' +
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' +
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' +
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' +
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' +
        'xxxxxxx                            xxxxxxx' + 
        'xxxxxxx                            xxxxxxx' + 
        'xxxxxxx                            xxxxxxx' + 
        'xxxxxxx                            xxxxxxx' + 
        'xxxxxxx   v                        xxxxxxx' + 
        'xxxxxxx   3 4 5 6                  xxxxxxx' +
        'xxxxxxx                            →      ' + 
        'xxxxxxxxxxxx↓xxxxxxxxxxxxxxxxxxxxxxxxxxxxx' +
        'xxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxx' +
        'xxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxx' +
        'xxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxx' +
        'xxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxx' +
        'xxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxx' +
        'xxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    ).split(''),
    meta: {
        style: 'forest',
        key: 40,
        npc: {
            3: {
                ...npc,
                persuaded: 0,
                required_persuasion: 1,
                conversation: [
                    {
                        message: "I'm keeping a secret, but I'll never tell what it is!",
                        persuaded_button_text: "Come on, you can tell me!",
                    },
                    {
                        message: "Now get out of here!",
                        persuaded_message: "Fine, I'll tell you. You can destroy green blocks with the spacebar!",
                    },
                    {
                        message: false,
                        persuaded_message: "Use this knowledge wisely.",
                    },
                ],
            },
            4: {
                ...npc,
                hypnosis: 0,
                required_hypnosis: 4,
                dream: [
                    {
                        message: "You look deep into their dreams and see a heave of demons, cackling madly.",
                    },
                ],
                cursed: true,
                conversation: [
                    {
                        message: "I've been having nightmares lately, and constantly feel exhausted.",
                    },
                    {
                        message: "When I wake up in the morning it feels like I haven't slept at all.",
                    },
                ],
            },
            5: {
                ...npc,
            },
            6: {
                ...npc,
            },
        }
    }
  },
  [41]: {
    map: (
        '###############' +
        'xxxxxxxxxxxxxxx' + 
        'x 2  x        x' + 
        'xxxxdx   0    x' + 
        '←    x        x' + 
        'xxx  x        x' + 
        'x    x        x' + 
        'x x  x        x' + 
        'x    x        x' + 
        'x  x x        x' + 
        'x             x' + 
        'xdxxxx        x' + 
        'x  x          x' + 
        'x  x          x' + 
        'x 1x          x' + 
        'xxxxxxxxxxxxxxx'
    ).split(''),
    meta: {
        style: 'forest',
        key: 41,
    }
  },
  [49]: {
    map: (
        '###############' +
        'xxxxxxxxxxx↑xxx' +
        'x    x1x1     x' +
        'xxxx x x  x   x' +
        'x  x x x   x  x' +
        'x0 x x x   x  x' + 
        'x         x2  x' + 
        'xxxxxx  dxxxxxx' + 
        'x    x xdd    x' + 
        'x2 xxxdxxxxxdxx' + 
        'x0 x x x      x' + 
        'x        dd   x' + 
        'xxddxx        x' + 
        'x    x    0   x' + 
        'x2 x       0  x' + 
        'xxxxxxxxxxxxxxx'
    ).split(''),
    meta: {
        style: 'forest',
        key: 49,
    }
  },
}
