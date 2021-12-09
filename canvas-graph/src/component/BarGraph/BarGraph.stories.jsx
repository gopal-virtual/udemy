import React from "react";

import BarGraph from "./BarGraph";

export default {
  title: "Example/BarGraph",
  component: BarGraph,
};

const Template = (args) => <BarGraph {...args} />;

const data = [
  { sales: 14, month: "Jan" },
  { sales: 18, month: "Feb" },
  { sales: 16, month: "Mar" },
  { sales: 9, month: "Apr" },
  { sales: 12, month: "May" },
  { sales: 13, month: "Jun" },
];

export const Default = Template.bind({});
Default.args = {
  data,
  yKey: "sales",
  xKey: "month",
};
