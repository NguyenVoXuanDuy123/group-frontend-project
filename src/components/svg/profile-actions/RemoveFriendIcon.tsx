const RemoveFriendIcon = ({
  color,
  className,
}: {
  color: string;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 24 24"
    className={className}>
    <title>{"user_x_fill"}</title>
    <g fill="none" fillRule="evenodd">
      <path d="M24 0v24H0V0zM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036c-.01-.003-.019 0-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01z" />
      <path
        fill={color}
        d="M11 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10m0 11c-2.395 0-4.575.694-6.178 1.672-.8.488-1.484 1.064-1.978 1.69C2.358 16.976 2 17.713 2 18.5c0 .845.411 1.511 1.003 1.986.56.45 1.299.748 2.084.956C6.665 21.859 8.771 22 11 22c.23 0 .46-.002.685-.005a1 1 0 0 0 .89-1.428A5.973 5.973 0 0 1 12 18c0-1.252.383-2.412 1.037-3.373a1 1 0 0 0-.72-1.557c-.43-.046-.87-.07-1.317-.07m5.586 2.172a1 1 0 0 0-1.414 1.414L16.586 18l-1.414 1.414a1 1 0 1 0 1.414 1.414L18 19.414l1.414 1.414a1 1 0 1 0 1.414-1.414L19.414 18l1.414-1.414a1 1 0 0 0-1.414-1.414L18 16.586z"
      />
    </g>
  </svg>
);
export default RemoveFriendIcon;
