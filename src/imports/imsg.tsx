import * as React from "react";
const SVGComponent = ({...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width={100}
    height={100}
    viewBox="0,0,256,256"
    {...props}
  >
    <g
      fill="none"
      fillRule="nonzero"
      stroke="none"
      strokeWidth={1}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit={10}
      strokeDasharray=""
      strokeDashoffset={0}
      fontFamily="none"
      fontWeight="none"
      fontSize="none"
      //textAnchor="none"
      style={{
        mixBlendMode: "normal",
      }}
    >
      <g transform="scale(5.33333,5.33333)">
        <path
          d="M35,6h-22c-3.866,0 -7,3.134 -7,7v22c0,3.866 3.134,7 7,7h22c3.866,0 7,-3.134 7,-7v-22c0,-3.866 -3.134,-7 -7,-7z"
          fill="#3ec13e"
        />
        <path
          d="M24,12c-7.18,0 -13,4.925 -13,11c0,4.074 2.624,7.622 6.513,9.523c-0.582,1.25 -1.426,2.426 -2.513,3.477c2.162,-0.38 4.191,-1.175 5.937,-2.32c0.984,0.202 2.006,0.32 3.063,0.32c7.18,0 13,-4.925 13,-11c0,-6.075 -5.82,-11 -13,-11z"
          fill="#ffffff"
        />
      </g>
    </g>
  </svg>
);
export default SVGComponent;
