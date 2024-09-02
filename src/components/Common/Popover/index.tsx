import { useEffect, useRef, useCallback } from "react";

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

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        displayComponentRef.current &&
        !displayComponentRef.current.contains(event.target as Node)
      ) {
        setPopoverOpen(false);
      }
    },
    [setPopoverOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const togglePopover = () => {
    setPopoverOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block text-left z-[1000]">
      <div
        onClick={togglePopover}
        ref={displayComponentRef}
        className="cursor-pointer">
        {displayComponent}
      </div>
      {popoverOpen && (
        <div ref={popoverRef} className="absolute right-0 ">
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
