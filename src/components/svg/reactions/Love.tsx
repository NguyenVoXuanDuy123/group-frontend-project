import { SVGProps } from "react";
const LoveReaction = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <rect width={24} height={24} fill="#F06D6D" rx={12} />
    <path
      fill="#fff"
      d="M16.33 6.534c1.396.814 2.379 2.467 2.335 4.395C18.573 15 13 18 12 18s-6.574-3-6.665-7.071C5.29 9 6.274 7.349 7.67 6.534c1.306-.76 2.947-.765 4.329.358 1.381-1.123 3.023-1.12 4.33-.358Z"
    />
  </svg>
);
export default LoveReaction;
