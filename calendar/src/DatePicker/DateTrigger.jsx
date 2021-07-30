import React from 'react'
import styled from 'styled-components'
import Arrow from './assets/Arrow'
import { Box, Body } from './components/common'

const DateTriggerWrapper = styled(Box)({
    border: (props) =>
        `1px solid ${
            props.active
                ? props.theme.colors.light['blue-2']
                : props.theme.colors.light['grey-1']
        }`,
    width: '200px',
    padding: '15px 20px',
    justifyContent: 'space-between',
})

function DateTrigger({ value = new Date(), active = false }) {
    const dateString = value.toLocaleString(
        Intl.DateTimeFormat().resolvedOptions().locale,
        { year: 'numeric', month: 'long', day: 'numeric' }
    )
    return (
        <DateTriggerWrapper active={active}>
            <Body>{dateString}</Body>
            <Arrow type={active ? 'up' : 'down'} />
        </DateTriggerWrapper>
    )
}

export default DateTrigger
