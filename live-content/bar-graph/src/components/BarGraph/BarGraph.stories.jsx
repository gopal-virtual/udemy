import React from 'react'

import BarGraph from './BarGraph'

export default {
    title: 'Variants/Bar Graph',
    component: BarGraph,
}

const data = [
    {
        sales: 100000,
        month: 'Jan',
    },
    {
        sales: 1232400,
        month: 'Feb',
    },
    {
        sales: 13343400,
        month: 'Mar',
    },
    {
        sales: 100340,
        month: 'Apr',
    },
    {
        sales: 80993430,
        month: 'May',
    },
    {
        sales: 5034340,
        month: 'Jun',
    },
    {
        sales: 1232340,
        month: 'Jul',
    },
]

const Template = (args) => <BarGraph {...args} />

export const Default = Template.bind({})
Default.args = {
    data,
}
