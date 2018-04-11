import React from 'react'

export class ListItem extends React.Component {
    constructor() {
        super()
        this.state = {
            expanded: false,
        }
    }

    expand_and_shrink_panel() {
        this.setState({ expanded: !this.state.expanded })
    }

    render() {
        const { title, subtitle, expanded_text } = this.props
        const { expanded } = this.state

        const item_style = {
            height: subtitle
                ? expanded
                ? '12vh'
                : '6vh'
                : expanded
                ? '8.5vh'
                : '3vh',
            overflow: 'hidden',
            transition: 'height 0.2s',
            position: 'relative',
        }

        // 1 Line
        const title_style = {
            width: `${expanded_text ? 'calc(100% - 3vh)' : '100%' }`,
            height: '3vh',
            fontSize: '2vh',
            padding: '0.5vh',
            margin: 0,
            display: 'flex',
            justifyContent: 'space-between',
        }
        
        // 1 Lines
        const subtitle_style = {
            height: '3vh',
            fontSize: '1.5vh',
            padding: '0.5vh',
            margin: 0,
        }

        // 3 Lines
        const expandable_style = {
            height: '6vh',
            fontSize: '1.5vh',
            padding: '0.5vh',
            margin: 0,
        }

        const expanded_button_style = {
            height: '2vh',
            width: '2vh',
            borderRadius: '1vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '0.5vh',
            right: '0.5vh',
            background: 'white',
            border: '1px solid black',
            transition: 'transform 0.2s',
            transform: `${this.state.expanded ? 'rotate(135deg)' : 'rotate(0deg)'}`,
        }

        return (
            <li
                className="list-item"
                style={item_style}
            >
                {title && <h3 style={title_style}>{title}</h3>}
                {subtitle && <p style={subtitle_style}>{subtitle}</p>}
                {expanded_text && (
                    <p style={expandable_style}>{expanded_text}</p>
                )}
                {expanded_text && (
                    <div
                        onClick={expanded_text ? this.expand_and_shrink_panel.bind(this) : () => {}}
                        style={expanded_button_style}
                    >
                        +
                    </div>
                )}
            </li>
        )
    }
}
