import React from 'react'
import * as Utils from './Utils'

const useDate = (value) => {
    console.log(value)
    const [month, setMonth] = React.useState(Utils.getCurrentMonth(value))
    const [year, setYear] = React.useState(Utils.getCurrentYear(value))
    const prevMonth = () => {}
    const nextMonth = () => {}
    const prevYear = () => {}
    const nextYear = () => {}
    return { month, year, prevMonth, nextMonth, prevYear, nextYear }
}

export default useDate
