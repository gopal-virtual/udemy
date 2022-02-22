import React from 'react'
import Provider from '../Theme/Provider'

import BarGraph from './BarGraph'

export default {
    title: 'Variants/Bar Graph',
    component: BarGraph,
    decorators: [
        (Story) => (
            <Provider>
                <Story />
            </Provider>
        ),
    ],
}

// we are dealing with user understandable data
// but for calculation, we need to identify x and y axis data
const data = [
    {
        sales: 900000, // y value
        month: 'Jan', // x value
    },
    {
        sales: 1232400,
        month: 'Feb',
    },
    {
        sales: 1334340,
        month: 'Mar',
    },
    {
        sales: 100340,
        month: 'Apr',
    },
    {
        sales: 809930,
        month: 'May',
    },
    {
        sales: 503430,
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
    xKey: 'month',
    yKey: 'sales',
}
