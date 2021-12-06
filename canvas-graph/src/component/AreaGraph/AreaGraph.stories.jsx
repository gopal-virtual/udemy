import React from 'react';

import AreaGraph from './AreaGraph';

export default {
  title: 'Example/AreaGraph',
  component: AreaGraph,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <AreaGraph {...args} />;

export const Default = Template.bind({});
Default.args = {};