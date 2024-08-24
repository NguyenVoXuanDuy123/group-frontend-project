import { SVGProps } from "react";
const LikeAction = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#777"
      d="M15.5 8h2.405a4 4 0 0 1 3.936 4.716l-.91 5A4 4 0 0 1 16.997 21H8.5V9l1.821-5.788c.296-.69 1.06-1.316 2.024-1.13C13.874 2.375 15.5 3.566 15.5 5.5V8Zm-9 1a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3V9Z"
    />
  </svg>
);
export default LikeAction;
