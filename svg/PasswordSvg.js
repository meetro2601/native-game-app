import * as React from "react";
import Svg, { Path } from "react-native-svg";
const PasswordSvgComponent = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={16} height={21} fill="none" {...props}>
    <Path
      fill="#ACACAC"
      d="M8 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1V5a5 5 0 1 1 10 0v2h1ZM8 2a3 3 0 0 0-3 3v2h6V5a3 3 0 0 0-3-3Z"
    />
  </Svg>
);
export default PasswordSvgComponent;
