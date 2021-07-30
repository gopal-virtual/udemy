import React from 'react'
import DatePopup from './components/DatePopup'
import DateTrigger from './components/DateTrigger'

function DatePicker({ value = new Date(), onChange = null }) {
    const [active, setActive] = React.useState(false)
    return (
        <React.Fragment>
            <DateTrigger
                value={value}
                active={active}
                onClick={() => setActive(!active)}
            />
            <DatePopup active={active} />
        </React.Fragment>
    )
}

export default DatePicker
