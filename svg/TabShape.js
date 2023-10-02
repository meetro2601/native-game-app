import React, { useEffect } from 'react';
import { Animated, Dimensions, StyleSheet, View, useWindowDimensions } from 'react-native';
import * as d3 from 'd3-shape';
import Svg, { Path } from 'react-native-svg';

const TAB_HEIGHT = 60; // This fixed height can be as you wish.

// const { width } = Dimensions.get('window');
const generatePath = (width) => {
  // console.log(width)
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
      [(width - TAB_WIDTH *0.55), 0],
      [(width - TAB_WIDTH *0.4), TAB_HEIGHT * 0.05],
      [(width - TAB_WIDTH *0.3), TAB_HEIGHT * 0.25],
      [(width - TAB_WIDTH *0.15) , TAB_HEIGHT * 0.55],
      [(width + TAB_WIDTH *0.15) , TAB_HEIGHT * 0.55],
      [(width + TAB_WIDTH *0.3), TAB_HEIGHT * 0.25],
      [(width + TAB_WIDTH *0.4) , TAB_HEIGHT * 0.05],
      [(width + TAB_WIDTH *0.55) , 0],
    ]);
    const d = `${center} ${rect}`;
    return <Path fill="white"  {...{ d }} ></Path>
  } else {
    const center = lineGenerator.curve(d3.curveBasis)([
      [(width - TAB_WIDTH*0.7), 0],
      [(width - TAB_WIDTH *0.5), 0.25],
      [(width - TAB_WIDTH *0.25), TAB_HEIGHT * 0.5],
      [(width + TAB_WIDTH *0.25), TAB_HEIGHT * 0.5],
      [(width + TAB_WIDTH *0.5), 0.25],
      [(width + TAB_WIDTH *0.7) , 0],
    ]);
    const d = `${center} ${rect}`;
    return <Path fill="white"  {...{ d }} ></Path>
  }

}

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

export default function TabShape({ tab, x, y }) {
  const width = useWindowDimensions().width

  return (
    <AnimatedSvg style={{ transform: [{ translateX: x }] }} viewBox={`0 0 ${width*2} ${TAB_HEIGHT}`} width={width * 2} height={TAB_HEIGHT}>
      {generatePath(width)}
    </AnimatedSvg>
  );
}
