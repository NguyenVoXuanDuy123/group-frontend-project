import * as React from "react";
import { SVGProps } from "react";
const CloseButton = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={20}
    height={20}
    stroke="#000"
    viewBox="0 0 512 512"
    {...props}>
    <path
      className="fill-dark-grey"
      d="m355.269 191.767-35.036-35.036L256 220.964l-64.233-64.233-35.036 35.036L220.964 256l-64.233 64.233 35.036 35.036L256 291.036l64.233 64.233 35.036-35.036L291.036 256z"
    />
  </svg>
);
export default CloseButton;
