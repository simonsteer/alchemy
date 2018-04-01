import React from 'react'

const Inventory = ({ items }) => {
    const item_keys = Object.keys(items)
    return (
        <ul className="inventory">
            {item_keys.map(key =>
                <li>{items[key] ? key + ' x' + items[key] : null}</li>
            )}
        </ul>
    )
}

export default Inventory