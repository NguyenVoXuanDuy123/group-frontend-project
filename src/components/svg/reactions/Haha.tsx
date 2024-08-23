import { SVGProps } from "react";
const HahaReaction = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="#FCC738"
      fillRule="evenodd"
      d="M12 0c6.628 0 12 5.372 12 12s-5.372 12-12 12S0 18.628 0 12 5.372 0 12 0Zm2.4 12H9.6a1.2 1.2 0 0 0-1.2 1.2v3.6a3.6 3.6 0 1 0 7.2 0v-3.6a1.2 1.2 0 0 0-1.2-1.2ZM9.6 6H7.2a1.2 1.2 0 0 0 0 2.4h2.4a1.2 1.2 0 1 0 0-2.4Zm7.2 0h-2.4a1.2 1.2 0 0 0-.14 2.392l.14.008h2.4a1.2 1.2 0 0 0 .14-2.392L16.8 6Z"
      clipRule="evenodd"
    />
  </svg>
);
export default HahaReaction;
