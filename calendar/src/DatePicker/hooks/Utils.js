export const getCurrentMonthIndex = (activeDay) =>
    activeDay && activeDay.getMonth()
export const getCurrentMonth = (activeDay) =>
    activeDay.toLocaleString(Intl.DateTimeFormat().resolvedOptions().locale, {
        month: 'long',
    })
export const getCurrentYear = (activeDay) =>
    activeDay && activeDay.getFullYear()
