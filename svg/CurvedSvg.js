import { Svg, Path } from "react-native-svg";

const CurvedSvg = ({ children, TAB_WIDTH }) => {
  return (
    <Svg>
      <Path d={`M0,0 V0,65 H${TAB_WIDTH} V${TAB_WIDTH},0 H${TAB_WIDTH} Q${TAB_WIDTH / 2},50 2,0 Z`} fill="white" />
      {children}
    </Svg>
  );
};

export default CurvedSvg;
