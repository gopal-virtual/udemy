import React from 'react'
import styled from 'styled-components'
import Arrow from './assets/Arrow'
import DoubleArrow from './assets/DoubleArrow'

const Title = styled('span')({
    fontFamily: '"Roboto", sans-serif',
    fontWeight: (props) => props.theme.text.title.fontWeight,
    fontSize: (props) => props.theme.text.title.fontSize,
})

const Body = styled('span')({
    fontFamily: '"Roboto", sans-serif',
    fontWeight: (props) => props.theme.text.body.fontWeight,
    fontSize: (props) => props.theme.text.body.fontSize,
})

const Box = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
})

const DatePickerWrapper = styled(Box)({
    flexDirection: 'column',
    width: '245px',
    height: 'auto',
    backgroundColor: (props) => props.theme.colors.light.bg,
    boxShadow: (props) => props.theme.effects.shadow,
})

const DatePickerHeader = styled(Box)({
    width: '100%',
    height: '46px',
    justifyContent: 'space-around',
    color: (props) => props.theme.colors.light.fg,
    borderBottom: (props) => `1px solid ${props.theme.colors.light['grey-1']}`,
})

const DatePickerBody = styled('div')({
    width: '100%',
    height: 'auto',
})

const DatePickerFooter = styled(Box)({
    width: '100%',
    height: '49px',
    borderTop: (props) => `1px solid ${props.theme.colors.light['grey-1']}`,
})

const WeekDay = styled(Box)({
    width: '35px',
    height: '35px',
    borderRadius: '6px',
    color: (props) => props.theme.colors.light.fg,
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

const CalendarWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Month = [
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, null, null],
]

function DatePicker() {
    return (
        <DatePickerWrapper>
            <DatePickerHeader>
                <DoubleArrow></DoubleArrow>
                <Arrow></Arrow>
                <Title>January 2021</Title>
                <Arrow type="right"></Arrow>
                <DoubleArrow type="right"></DoubleArrow>
            </DatePickerHeader>
            <DatePickerBody>
                <WeekRow>
                    {CalendarWeek.map((day) => (
                        <WeekDay>
                            <Body>{day}</Body>
                        </WeekDay>
                    ))}
                </WeekRow>
                {Month.map((week) => (
                    <WeekRow>
                        {week.map((day) => (
                            <WeekDay>
                                <Body>{day}</Body>
                            </WeekDay>
                        ))}
                    </WeekRow>
                ))}
            </DatePickerBody>
            <DatePickerFooter>
                <Button>
                    <Title>Today</Title>
                </Button>
            </DatePickerFooter>
        </DatePickerWrapper>
    )
}

export default DatePicker
