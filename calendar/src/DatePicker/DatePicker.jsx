import React from 'react'
import styled from 'styled-components'
import Arrow from './assets/Arrow'
import DoubleArrow from './assets/DoubleArrow'

const DatePickerWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    width: '245px',
    height: 'auto',
    backgroundColor: '#ffffff',
})

const DatePickerHeader = styled('div')({
    width: '100%',
    height: '46px',
    display: 'flex',
    justifyContent: 'space-around',
})

const DatePickerBody = styled('div')({
    width: '100%',
    height: 'auto',
})

const DatePickerFooter = styled('div')({
    width: '100%',
    height: '49px',
    display: 'flex',
    justifyContent: 'center',
})

const WeekDay = styled('div')({
    width: '35px',
    height: '35px',
    borderRadius: '6px',
})

const WeekRow = styled('div')({
    width: '100%',
    height: 'auto',
    display: 'flex',
})

const Button = styled('button')({
    border: '0',
    borderRadius: '12px',
    padding: '5px 15px',
    alignSelf: 'center',
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
                January 2021
                <Arrow type="right"></Arrow>
                <DoubleArrow type="right"></DoubleArrow>
            </DatePickerHeader>
            <DatePickerBody>
                <WeekRow>
                    {CalendarWeek.map((day) => (
                        <WeekDay>{day}</WeekDay>
                    ))}
                </WeekRow>
                {Month.map((week) => (
                    <WeekRow>
                        {week.map((day) => (
                            <WeekDay>{day}</WeekDay>
                        ))}
                    </WeekRow>
                ))}
            </DatePickerBody>
            <DatePickerFooter>
                <Button>Today</Button>
            </DatePickerFooter>
        </DatePickerWrapper>
    )
}

export default DatePicker
