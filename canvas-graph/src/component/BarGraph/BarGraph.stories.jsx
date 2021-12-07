import React from "react";

import BarGraph from "./BarGraph";

export default {
  title: "Example/BarGraph",
  component: BarGraph,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <BarGraph {...args} />;

export const Default = Template.bind({});
Default.args = {};
