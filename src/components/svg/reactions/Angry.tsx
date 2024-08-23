import { SVGProps } from "react";
const AngryReaction = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="#E66232"
      fillRule="evenodd"
      d="M12 0c6.628 0 12 5.372 12 12s-5.372 12-12 12S0 18.628 0 12 5.372 0 12 0Zm0 13.2a5.982 5.982 0 0 0-3.968 1.5 1.2 1.2 0 0 0 1.587 1.8A3.582 3.582 0 0 1 12 15.6a3.576 3.576 0 0 1 2.38.9 1.2 1.2 0 0 0 1.59-1.8A5.982 5.982 0 0 0 12 13.2ZM6.127 7.864a1.2 1.2 0 0 0 .537 1.609l2.4 1.2a1.2 1.2 0 1 0 1.072-2.146l-2.4-1.2a1.2 1.2 0 0 0-1.609.537Zm10.137-.537-2.4 1.2a1.199 1.199 0 1 0 1.072 2.146l2.4-1.2a1.199 1.199 0 1 0-1.072-2.146Z"
      clipRule="evenodd"
    />
  </svg>
);
export default AngryReaction;
