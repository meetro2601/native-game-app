import * as React from "react";
import Svg, { Path } from "react-native-svg";
const EmailSvgComponent = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={16} fill="none" {...props}>
    <Path
      fill="#ACACAC"
      d="M18 0H2C.9 0 .01.9.01 2L0 14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm-.4 4.25-7.07 4.42c-.32.2-.74.2-1.06 0L2.4 4.25a.85.85 0 1 1 .9-1.44L10 7l6.7-4.19a.85.85 0 1 1 .9 1.44Z"
    />
  </Svg>
);
export default EmailSvgComponent;
