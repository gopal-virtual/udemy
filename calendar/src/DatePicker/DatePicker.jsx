import React from 'react'
import DatePopup from './components/DatePopup'
import DateTrigger from './components/DateTrigger'

function DatePicker({ value = new Date(), onChange = null }) {
    const [active, setActive] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState(value)
    return (
        <React.Fragment>
            <DateTrigger
                value={selectedDate}
                active={active}
                onClick={() => setActive(!active)}
            />
            <DatePopup
                active={active}
                value={selectedDate}
                onChange={setSelectedDate}
            />
        </React.Fragment>
    )
}

export default DatePicker
