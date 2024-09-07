type RefreshIconProps = {
  size?: number;
};

const RefreshIcon = ({ size = 24 }: RefreshIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
    <title>{"refresh_2_line"}</title>
    <g fill="none">
      <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
      <path
        className="fill-dark-grey"
        d="M2 12.08c-.006-.862.91-1.356 1.618-.975l.095.058 2.678 1.804c.972.655.377 2.143-.734 2.007l-.117-.02-1.063-.234a8.002 8.002 0 0 0 14.804.605 1 1 0 0 1 1.82.828c-1.987 4.37-6.896 6.793-11.687 5.509A10.003 10.003 0 0 1 2 12.08m.903-4.228C4.89 3.482 9.799 1.06 14.59 2.343a10.002 10.002 0 0 1 7.414 9.581c.007.863-.91 1.358-1.617.976l-.096-.058-2.678-1.804c-.972-.655-.377-2.143.734-2.007l.117.02 1.063.234A8.002 8.002 0 0 0 4.723 8.68a1 1 0 1 1-1.82-.828"
      />
    </g>
  </svg>
);
export default RefreshIcon;
