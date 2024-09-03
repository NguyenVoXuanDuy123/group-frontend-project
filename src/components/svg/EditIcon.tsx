import { SVGProps } from "react";
const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <title>{"pencil_fill"}</title>
    <g fill="none" fillRule="evenodd">
      <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
      <path
        className="fill-dark-grey"
        fill="#09244BFF"
        d="M20.131 3.16a3 3 0 0 0-4.242 0l-.707.708 4.95 4.95.706-.707a3 3 0 0 0 0-4.243l-.707-.707Zm-1.414 7.072-4.95-4.95-9.09 9.091a1.5 1.5 0 0 0-.401.724l-1.029 4.455a1 1 0 0 0 1.2 1.2l4.456-1.028a1.5 1.5 0 0 0 .723-.401z"
      />
    </g>
  </svg>
);
export default EditIcon;
