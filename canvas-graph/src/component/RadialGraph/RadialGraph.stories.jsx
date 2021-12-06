import React from 'react';

import RadialGraph from './RadialGraph';

export default {
  title: 'Example/RadialGraph',
  component: RadialGraph,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <RadialGraph {...args} />;

export const Default = Template.bind({});
Default.args = {};