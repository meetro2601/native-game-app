import React from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import * as d3 from 'd3-shape';
import Svg, { Path } from 'react-native-svg';

const TAB_HEIGHT = 60; // This fixed height can be as you wish.

const { width } = Dimensions.get('window');
const generatePath = (index) => {
  const lineGenerator = d3.line();

  const rect = lineGenerator([
    [0, 0],
    // [width / 2, 0],
    [width * 2, 0],
    [width * 2, TAB_HEIGHT],
    [0, TAB_HEIGHT],
    [0, 0],
  ]);

  const TAB_WIDTH = (width / 5)

  if (width > 480) {
    const center = lineGenerator.curve(d3.curveBasis)([
      [(width - TAB_WIDTH / 2) + 15, 0],
      [(width - TAB_WIDTH / 2) + 25, TAB_HEIGHT * 0.05],
      [(width - TAB_WIDTH / 2) + 30, TAB_HEIGHT * 0.3],
      [(width - TAB_WIDTH / 2) + 50, TAB_HEIGHT * 0.6],
      // [(width - TAB_WIDTH / 2) +60, TAB_HEIGHT * 0.55],
      // [(width + TAB_WIDTH / 2) -60, TAB_HEIGHT * 0.55],
      [(width + TAB_WIDTH / 2) - 50, TAB_HEIGHT * 0.6],
      [(width + TAB_WIDTH / 2) - 30, TAB_HEIGHT * 0.3],
      [(width + TAB_WIDTH / 2) - 25, TAB_HEIGHT * 0.05],
      [(width + TAB_WIDTH / 2) - 15, 0]
    ]);
    const d = `${center} ${rect}`;
    return <Path fill="white"  {...{ d }} ></Path>
  } else {
    const center = lineGenerator.curve(d3.curveBasis)([
      [(width - TAB_WIDTH / 2) - 15, 0],
      [(width - TAB_WIDTH / 2), 0.05],
      [(width - TAB_WIDTH / 2) + 7.5, TAB_HEIGHT * 0.25],
      [(width - TAB_WIDTH / 2) + 12.5, TAB_HEIGHT * 0.35],
      [(width - TAB_WIDTH / 2) + 25, TAB_HEIGHT * 0.55],
      [(width + TAB_WIDTH / 2) - 25, TAB_HEIGHT * 0.55],
      [(width + TAB_WIDTH / 2) - 12.5, TAB_HEIGHT * 0.35],
      [(width + TAB_WIDTH / 2) - 7.5, TAB_HEIGHT * 0.25],
      [(width + TAB_WIDTH / 2), 0.05],
      [(width + TAB_WIDTH / 2) + 15, 0],
    ]);
    const d = `${center} ${rect}`;
    return <Path fill="white"  {...{ d }} ></Path>
  }

}

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

export default function TabShape({ tab, x, y }) {
  return (
    <AnimatedSvg style={{ transform: [{ translateX: x }] }} width={width * 2} height={TAB_HEIGHT}>
      {generatePath()}
    </AnimatedSvg>
  );
}
