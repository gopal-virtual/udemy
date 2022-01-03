import React from "react";
import styled from "styled-components";
import BarCanvas from "./BarCanvas";

const TextSizeMap = {
  header: "18px",
  paragraph: "14px",
  Legend: "10px",
};

const TextWeightMap = {
  light: 300,
  highlight: 500,
  emphasis: 900,
};

const TextAlignMap = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

const ColorMap = {
  "red-pink": "linear-gradient(180deg, #FF4A4A 0%, #FC5CFF 100%)",
  "blue-teal": "linear-gradient(180deg, #5297FF 0%, #70DBD4 100%)",
  "orange-yellow": "linear-gradient(180deg, #FFA26D 0%, #FFD771 100%)",
};

const Text = styled("span")({
  width: (props) => props.width || "auto",
  display: "inline-block",
  fontFamily: "Roboto",
  background: (props) => (props.color ? ColorMap[props.color] : "black"),
  "-webkit-background-clip": "text",
  color: "transparent",
  textAlign: (props) => props.align || "left",
  fontSize: (props) => TextSizeMap[props.type || "paragraph"],
  fontWeight: (props) => TextWeightMap[props.weight || "light"],
});

const Separator = styled("div")({
  borderSizing: "border-box",
  width: "24px",
  height: "5px",
  margin: "12px 0",
  background: "linear-gradient(270deg, #70DBD4 0%, #5297FF 100%)",
});

const getGraphString = ({ data, yUnit }) => {
  const lastMonthIndex = data.length - 1;
  const lastMonthSales = data[lastMonthIndex].sales + yUnit;
  const lastMonth = data[lastMonthIndex].month + " " + new Date().getFullYear();
  const delta = data[lastMonthIndex].sales - data[lastMonthIndex - 1].sales;
  const deltaPrefix = delta > 0 ? `Up by` : `Down by`;
  const deltaString = delta + yUnit;

  return {
    lastMonthSales,
    lastMonth,
    delta: { prefix: deltaPrefix, string: deltaString },
  };
};

function BarGraph(props) {
  const { lastMonthSales, lastMonth, delta } = getGraphString(props);
  return (
    <>
      <Text type="header">
        <Text type="header" weight="highlight">
          {lastMonthSales}
        </Text>{" "}
        Sales for{" "}
        <Text type="header" weight="highlight">
          {lastMonth}
        </Text>
      </Text>
      <Separator />
      <BarCanvas {...props} />
      <Text type="paragraph" weight="light" align="center" width="100%">
        <Text type="paragraph" weight="light" color="red-pink">
          {delta.prefix}
        </Text>{" "}
        <Text type="paragraph" weight="highlight" color="red-pink">
          {delta.string}
        </Text>{" "}
        sales from previous month
      </Text>
    </>
  );
}

BarGraph.propTypes = {};

export default BarGraph;
