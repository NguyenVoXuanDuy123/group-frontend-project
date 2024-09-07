type TabItemProps = {
  title: string;
  icon: React.ReactNode;
};

const TabItem = ({ title, icon }: TabItemProps) => {
  return (
    <button className="w-full p-3 rounded-lg bg-light-grey mb-3 flex cursor-pointer hover:bg-dark-grey/25">
      {icon}
      <span className="ml-3">{title}</span>
    </button>
  );
};

export default TabItem;
