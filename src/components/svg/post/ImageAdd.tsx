import { SVGProps } from "react";
const ImageAdd = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#2F3135"
      d="M12 10v2h-2v1.333h2v2h1.333v-2h2V12h-2v-2H12Zm-3.133 4H3.333C2.6 14 2 13.4 2 12.667V3.333C2 2.6 2.6 2 3.333 2h9.334C13.4 2 14 2.6 14 3.333v5.534c-.4-.134-.867-.2-1.333-.2-.734 0-1.467.2-2.067.6L9.667 8l-2.334 3-1.666-2-2.334 3h5.4c-.066.2-.066.467-.066.667 0 .466.066.933.2 1.333Z"
    />
  </svg>
);
export default ImageAdd;
