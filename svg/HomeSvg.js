import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HomeSvgComponent = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    style={{
      enableBackground: "new 0 0 30 30",
    }}
    xmlSpace="preserve"
  >
    <Path d="M16.02 2h-.04L4 13.98V30h9v-8h6v8h9V13.96z" fill="gray" data-original="#000000" />
  </Svg>
);

export default HomeSvgComponent;
