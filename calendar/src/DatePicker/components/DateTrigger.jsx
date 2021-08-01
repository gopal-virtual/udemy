import React from 'react'
import styled from 'styled-components'
import Arrow from '../assets/Arrow'
import { Box, Body } from './common'

const DateTriggerWrapper = styled(Box)({
    border: (props) =>
        `1px solid ${
            props.active
                ? props.theme.colors['blue-2']
                : props.theme.colors['grey-1']
        }`,
    width: '200px',
    padding: '15px 20px',
    justifyContent: 'space-between',
    backgroundColor: (props) => props.theme.colors.bg,
    color: (props) => props.theme.colors.fg,
})

function DateTrigger({ value = new Date(), active = false, onClick = null }) {
    const dateString = value.toLocaleString(
        Intl.DateTimeFormat().resolvedOptions().locale,
        { year: 'numeric', month: 'long', day: 'numeric' }
    )
    return (
        <DateTriggerWrapper active={active} onClick={onClick}>
            <Body>{dateString}</Body>
            <Arrow type={active ? 'up' : 'down'} />
        </DateTriggerWrapper>
    )
}

export default DateTrigger
