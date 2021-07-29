import React from 'react'
import { withTheme } from 'styled-components'

function DoubleArrow({ type = 'left', theme }) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: type === 'right' ? 'rotate(180deg)' : '' }}
        >
            <path
                d="M14 2L8 8L14 14"
                stroke={theme.colors.light['grey-2']}
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
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

export default withTheme(DoubleArrow)
