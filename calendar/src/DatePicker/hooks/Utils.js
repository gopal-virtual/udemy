export const Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export const CalendarWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const getCurrentMonthIndex = (activeDay) =>
    activeDay && activeDay.getMonth()

export const getCurrentYear = (activeDay) =>
    activeDay && activeDay.getFullYear()

const getNumberOfDays = (year, monthIndex) =>
    new Date(year, monthIndex + 1, 0).getDate()

const getDayOfWeek = (year, monthIndex, date) =>
    new Date(year, monthIndex, date).getDay()

export const getDaysOfMonth = (year, monthIndex) => {
    let daysOfMonth = []
    const numberOfDays = getNumberOfDays(year, monthIndex)
    const offset = getDayOfWeek(year, monthIndex, 1)
    for (let dayIndex = 0; dayIndex < numberOfDays; dayIndex++) {
        const offsetDay = dayIndex + offset
        const rowIndex = Math.floor(offsetDay / CalendarWeek.length)
        const colIndex = offsetDay % CalendarWeek.length

        if (!daysOfMonth[rowIndex]) {
            daysOfMonth.push(Array(CalendarWeek.length).fill({}))
        }

        daysOfMonth[rowIndex][colIndex] = { date: dayIndex + 1 }
    }
    return daysOfMonth
}
