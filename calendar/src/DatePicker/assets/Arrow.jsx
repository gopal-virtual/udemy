import React from 'react'
import { withTheme } from 'styled-components'

const PositionMap = {
    up: 'rotate(90deg)',
    down: 'rotate(-90deg)',
    left: 'rotate(0deg)',
    right: 'rotate(180deg)',
}

function Arrow({ type = 'left', theme }) {
    return (
        <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                transform: PositionMap[type],
                transition: theme.effects.transition,
            }}
        >
            <path
                d="M8 2L2 8L8 14"
                stroke={theme.colors.light['grey-2']}
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    )
}

export default withTheme(Arrow)
