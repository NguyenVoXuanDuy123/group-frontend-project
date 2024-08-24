import React from "react";

interface TabItemProps {
  title: string;
  icon: React.ReactNode;
  onclick: () => void;
}

const TabItem = ({ title, icon, onclick }: TabItemProps) => {
  return (
    <div
      onClick={onclick}
      className="w-full p-3 rounded-lg bg-light-grey mb-3 flex "
    >
      {icon}
      <span className="ml-3">{title}</span>
    </div>
  );
};

export default TabItem;
