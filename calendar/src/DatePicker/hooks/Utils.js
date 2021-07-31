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

export const getCurrentMonthIndex = (activeDay) =>
    activeDay && activeDay.getMonth()

export const getCurrentYear = (activeDay) =>
    activeDay && activeDay.getFullYear()
