import React from 'react'
import { ListItem } from '../containers/ListItem'

const Inventory = ({ items }) => {
    const item_keys = Object.keys(items)
    return ( 
        <ul className="inventory">
            {item_keys.map((key, index) => 
                <ListItem
                    key={key + index}
                    title={key + ' x' + items[key].amount}
                    subtitle={`${items[key].type}, sell value: ${items[key].value.sell}`}
                />
            )}
        </ul>
    )
}

export default Inventory