import Popover from "@/components/Common/Popover";
import NotificationIcon from "@/components/svg/side-bar-icons/NotificationIcon";
import { useState } from "react";

const NotificationWithPopover = () => {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  return (
    <Popover
      displayComponent={
        <div className="mr-3 flex  items-center justify-center w-12 h-12 bg-light-grey rounded-full cursor-pointer">
          <NotificationIcon />
        </div>
      }
      popoverOpen={popoverOpen}
      setPopoverOpen={setPopoverOpen}>
      <div className="h-[600px] w-[340px] p-4 bg-white shadow-2xl rounded-md overflow-y-auto ">
        <h2 className="font-bold text-2xl">Notifications</h2>
      </div>
    </Popover>
  );
};

export default NotificationWithPopover;
