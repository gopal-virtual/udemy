import React from 'react'

function Arrow({ type = 'left' }) {
    return (
        <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: type === 'right' ? 'rotate(180deg)' : '' }}
        >
            <path
                d="M8 2L2 8L8 14"
                stroke="#929292"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    )
}

export default Arrow
