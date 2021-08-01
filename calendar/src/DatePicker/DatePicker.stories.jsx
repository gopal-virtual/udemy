import React from 'react'

import DatePicker from './DatePicker'
import Provider from '../Theme/Provider'

export default {
    title: 'Calendar/DatePicker',
    component: DatePicker,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => (
            <Provider mode="dark">
                <Story />
            </Provider>
        ),
    ],
}

const Template = (args) => <DatePicker {...args} />

export const Default = Template.bind({})
Default.args = {
    onChange: () => console.log,
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
