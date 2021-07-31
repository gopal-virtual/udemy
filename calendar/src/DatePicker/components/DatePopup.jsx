import React from 'react'
import styled from 'styled-components'
import Arrow from '../assets/Arrow'
import DoubleArrow from '../assets/DoubleArrow'
import useDate from '../hooks/datePicker.hooks'
import { Box, Body, Title } from './common'

const DatePopupWrapper = styled(Box)({
    flexDirection: 'column',
    width: '245px',
    height: 'auto',
    backgroundColor: (props) => props.theme.colors.light.bg,
    boxShadow: (props) => props.theme.effects.shadow,
})

const Header = styled(Box)({
    width: '50%',
})

const TogglePopup = styled(DatePopupWrapper)({
    position: 'absolute',
    transform: (props) =>
        props.active ? 'translate(0,0)' : 'translate(0,-10px)',
    opacity: (props) => (props.active ? 1 : 0),
    pointerEvents: (props) => (props.active ? 'inherit' : 'none'),
})

const DatePopupHeader = styled(Box)({
    width: '100%',
    height: '46px',
    justifyContent: 'space-around',
    color: (props) => props.theme.colors.light.fg,
    borderBottom: (props) => `1px solid ${props.theme.colors.light['grey-1']}`,
})

const DatePopupBody = styled('div')({
    width: '100%',
    height: 'auto',
})

const DatePopupFooter = styled(Box)({
    width: '100%',
    height: '49px',
    borderTop: (props) => `1px solid ${props.theme.colors.light['grey-1']}`,
})

const ActiveDay = styled(Box)({
    color: (props) =>
        props.isToday || props.isSelected
            ? props.theme.colors.light['blue-2']
            : props.theme.colors.light.fg,
    backgroundColor: (props) =>
        props.isSelected
            ? props.theme.colors.light['blue-1']
            : props.theme.colors.light.bg,
})

const WeekDay = styled(ActiveDay)({
    width: '35px',
    height: '35px',
    borderRadius: '6px',
    cursor: 'pointer',
    userSelect: 'none',
})

const WeekRow = styled(Box)({
    width: '100%',
    height: 'auto',
})

const Button = styled('button')({
    border: '0',
    borderRadius: '12px',
    padding: '5px 15px',
    alignSelf: 'center',
    color: (props) => props.theme.colors.light['blue-2'],
    backgroundColor: (props) => props.theme.colors.light['blue-1'],
})

const Link = styled('div')({
    cursor: 'pointer',
    userSelect: 'none',
})

function DatePopup({ active, onChange, value }) {
    const {
        month,
        monthIndex,
        year,
        daysOfMonth,
        CalendarWeek,
        isSelected,
        prevMonth,
        nextMonth,
        prevYear,
        nextYear,
    } = useDate(value)
    return (
        <TogglePopup active={active}>
            <DatePopupHeader>
                <Link onClick={prevYear}>
                    <DoubleArrow></DoubleArrow>
                </Link>
                <Link onClick={prevMonth}>
                    <Arrow></Arrow>
                </Link>
                <Header>
                    <Title>
                        {month} {year}
                    </Title>
                </Header>
                <Link onClick={nextMonth}>
                    <Arrow type="right"></Arrow>
                </Link>
                <Link onClick={nextYear}>
                    <DoubleArrow type="right"></DoubleArrow>
                </Link>
            </DatePopupHeader>
            <DatePopupBody>
                <WeekRow>
                    {CalendarWeek.map((day) => (
                        <WeekDay key={day}>
                            <Body>{day}</Body>
                        </WeekDay>
                    ))}
                </WeekRow>
                {daysOfMonth.map((week, i) => (
                    <WeekRow key={i}>
                        {week.map((day, dayIndex) => (
                            <WeekDay
                                key={dayIndex}
                                isToday={day.isToday}
                                isSelected={isSelected(day.date, value)}
                                onClick={() =>
                                    onChange(
                                        new Date(year, monthIndex, day.date)
                                    )
                                }
                            >
                                <Body>{day.date}</Body>
                            </WeekDay>
                        ))}
                    </WeekRow>
                ))}
            </DatePopupBody>
            <DatePopupFooter>
                <Button>
                    <Title>Today</Title>
                </Button>
            </DatePopupFooter>
        </TogglePopup>
    )
}

export default DatePopup
