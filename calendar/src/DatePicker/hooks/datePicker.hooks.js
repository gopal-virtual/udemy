import React from 'react'
import * as Utils from './Utils'

const useDate = (value) => {
    const [monthIndex, setMonthIndex] = React.useState(
        Utils.getCurrentMonthIndex(value)
    )
    const [year, setYear] = React.useState(Utils.getCurrentYear(value))
    const [daysOfMonth, setDaysOfMonth] = React.useState(
        Utils.getDaysOfMonth(year, monthIndex)
    )
    const prevMonth = () => {
        if (monthIndex - 1 < 0) {
            setMonthIndex(Utils.Months.length - 1)
            prevYear()
        } else {
            setMonthIndex(monthIndex - 1)
        }
    }
    const nextMonth = () => {
        if (monthIndex + 1 > Utils.Months.length - 1) {
            setMonthIndex(0)
            nextYear()
        } else {
            setMonthIndex(monthIndex + 1)
        }
    }
    const prevYear = () => {
        setYear(year - 1)
    }
    const nextYear = () => {
        setYear(year + 1)
    }

    const isSelected = (date, dateObj) => {
        return Utils.isDateMatch(year, monthIndex, date, dateObj)
    }

    React.useEffect(() => {
        setDaysOfMonth(Utils.getDaysOfMonth(year, monthIndex))
    }, [monthIndex, year])

    return {
        month: Utils.Months[monthIndex],
        monthIndex,
        year,
        daysOfMonth,
        CalendarWeek: Utils.CalendarWeek,
        isSelected,
        prevMonth,
        nextMonth,
        prevYear,
        nextYear,
    }
}

export default useDate
