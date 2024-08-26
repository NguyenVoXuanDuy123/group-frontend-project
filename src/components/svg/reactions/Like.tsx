import { SVGProps } from "react";
const LikeReaction = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}>
    <rect width={24} height={24} fill="#4D98EF" rx={12} />
    <g clipPath="url(#a)">
      <path
        fill="white"
        d="M14 9.333h1.603a2.666 2.666 0 0 1 2.624 3.144l-.606 3.334A2.667 2.667 0 0 1 14.998 18H9.333v-8l1.214-3.859c.198-.46.707-.877 1.35-.753 1.019.195 2.103.99 2.103 2.279v1.666ZM8 10a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v-8Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M4 4h16v16H4z" />
      </clipPath>
    </defs>
  </svg>
);
export default LikeReaction;
