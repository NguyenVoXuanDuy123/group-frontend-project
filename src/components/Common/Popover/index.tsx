import { RootState } from "@/redux/store";
import { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";

type PopoverProps = {
  displayComponent: React.ReactNode;
  children: React.ReactNode;
  popoverOpen: boolean;
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Popover = ({
  displayComponent,
  children,
  popoverOpen,
  setPopoverOpen,
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const displayComponentRef = useRef<HTMLDivElement>(null);
  const openModalsCount = useSelector(
    (state: RootState) => state.modal.openModalsCount
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      // Close the popover if there are no open modals
      if (openModalsCount > 0) return;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        displayComponentRef.current &&
        !displayComponentRef.current.contains(event.target as Node)
      ) {
        setPopoverOpen(false);
      }
    },
    [openModalsCount, setPopoverOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const togglePopover = () => {
    setPopoverOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block text-left ">
      <div
        onClick={togglePopover}
        ref={displayComponentRef}
        className="cursor-pointer z-30">
        {displayComponent}
      </div>
      {popoverOpen && (
        <div ref={popoverRef} className="absolute right-0 z-50">
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
