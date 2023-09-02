import React from "react";
import { Path, Svg } from "react-native-svg";

const PencilSvg = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
      <Path
        d="M5.707 17.707L15 8.414L10.586 4L1.293 13.293C1.16506 13.4211 1.07418 13.5814 1.03 13.757L0 19L5.242 17.97C5.418 17.926 5.579 17.835 5.707 17.707ZM18 5.414C18.3749 5.03895 18.5856 4.53033 18.5856 4C18.5856 3.46967 18.3749 2.96106 18 2.586L16.414 1C16.0389 0.62506 15.5303 0.414429 15 0.414429C14.4697 0.414429 13.9611 0.62506 13.586 1L12 2.586L16.414 7L18 5.414Z"
        fill="black"
      />
    </Svg>
  );
};

export default PencilSvg;
