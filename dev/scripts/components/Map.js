import React from 'react'

import { tile_names } from '../utilities/maps'
import { map_colors } from '../utilities/maps'

const {
  alchemist,
  map_width_checker,
} = tile_names

const Map = ({ player }) => {
  const { x, y, items, direction, view } = player
  let { map, meta } = player.current_map

  const map_width = map.lastIndexOf(map_width_checker) + 1
  map = map.slice(map_width)

  const area_width = map_width * 5
  const area_height = (map.length / map_width) * 5

  const tile_styles = {
    width: '5vh',
    height: '5vh',
  }

  const view_x = `calc(30vh - ${view.x * 5}vh)`
  const view_y = `calc(30vh - ${view.y * 5}vh)`

  const player_styles = {
    position: 'absolute',
    top: 'calc(50% - 2.5vh)',
    left: 'calc(50% - 2.5vh)',
    background: 'red',
    color: 'white',
  }

  const map_styles = {
    background: map_colors[meta.style].background,
    transition: 'transform 0.2s linear',
    transform: `translate(${view_x}, ${view_y})`,
    width: `${area_width}vh`,
    height: `${area_height}vh`,
  }

  return (
    <div className="overworld-container">
      <div className={`overworld-mask${view.fade ? ' blackout' : ''}`}>
      </div>
      <div className="overworld" style={map_styles}>
        {map.map(tile =>
          <div
            className={`npc_${tile}`}
            style={tile_styles}
          ></div>
        )}
      </div>
      <div className="tile" style={{ ...tile_styles, ...player_styles }}>
        •_•
      </div>
    </div>
  )
}

export default Map
