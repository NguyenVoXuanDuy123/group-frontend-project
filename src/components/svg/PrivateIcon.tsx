import { SVGProps } from "react";
const PrivateIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}>
    <title>{"lock_fill"}</title>
    <g fill="none" fillRule="evenodd">
      <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
      <path
        fill="#777"
        d="M6 8a6 6 0 1 1 12 0h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2zm6-4a4 4 0 0 1 4 4H8a4 4 0 0 1 4-4m2 10a2 2 0 0 1-1 1.732V17a1 1 0 1 1-2 0v-1.268A2 2 0 0 1 12 12a2 2 0 0 1 2 2"
      />
    </g>
  </svg>
);
export default PrivateIcon;
