import { useState } from "react";

type TabItemProps = {
  title: string;
  icon: React.ReactNode;
  onclick: () => void;
};

const TabItem = ({ title, icon, onclick }: TabItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <button
      disabled={isLoading}
      onClick={() => {
        setIsLoading(true);
        onclick();
        setIsLoading(false);
      }}
      className="w-full p-3 rounded-lg bg-light-grey mb-3 flex cursor-pointer hover:bg-dark-grey/25">
      {icon}
      <span className="ml-3">{title}</span>
    </button>
  );
};

export default TabItem;
