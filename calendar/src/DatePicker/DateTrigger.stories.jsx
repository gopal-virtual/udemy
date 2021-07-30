import React from 'react'

import DateTrigger from './DateTrigger'
import Provider from '../Theme/Provider'

export default {
    title: 'Calendar/DateTrigger',
    component: DateTrigger,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => (
            <Provider>
                <Story />
            </Provider>
        ),
    ],
}

const Template = (args) => <DateTrigger {...args} />

export const Default = Template.bind({})
Default.args = {
    value: new Date(2018, 4, 10),
}
Default.story = {
    parameters: {
        design: {
            type: 'figma',
            url:
                'https://www.figma.com/file/QbBWSSF5VZOy3YeHiyLCJz/Calendar?node-id=0%3A1',
        },
    },
}
export const Active = Template.bind({})
Active.args = {
    value: new Date(2018, 4, 10),
    active: true,
}
Active.story = {
    parameters: {
        design: {
            type: 'figma',
            url:
                'https://www.figma.com/file/QbBWSSF5VZOy3YeHiyLCJz/Calendar?node-id=0%3A1',
        },
    },
}
