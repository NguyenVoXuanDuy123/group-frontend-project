import { SVGProps } from "react";

const CommentAction = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#777"
      d="M16.5 11a5.5 5.5 0 0 1 4.821 8.148l.386 1.311a1.005 1.005 0 0 1-1.248 1.248l-1.31-.386A5.501 5.501 0 1 1 16.5 11ZM11 3a9.004 9.004 0 0 1 8.708 6.719 7.5 7.5 0 0 0-9.22 11.267 8.952 8.952 0 0 1-4.097-1.255l-2.65.78a1.008 1.008 0 0 1-1.252-1.252l.78-2.65A9 9 0 0 1 11 3Z"
    />
  </svg>
);
export default CommentAction;
