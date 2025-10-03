import React, { useEffect, type JSX } from "react";

export const useOutsideAlerter = (ref: any, setX: any): void => {
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    // function handleClickOutside(event: React.MouseEvent<HTMLElement>) {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setX(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setX]);
};

export interface DropdownProps {
  button: JSX.Element;
  classNames?: string;
  parentClassName?: string;
  onViewChange?: (bool: boolean) => void;
  disableMenu?: boolean;
}
const Dropdown = (props: React.PropsWithChildren<DropdownProps>) => {
  const {
    button,
    children,
    classNames,
    disableMenu,
    onViewChange,
    parentClassName,
  } = props;
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [openWrapper, setOpenWrapper] = React.useState(false);
  useOutsideAlerter(wrapperRef, setOpenWrapper);

  useEffect(() => {
    onViewChange?.(openWrapper);
  }, [openWrapper]);
  return (
    <div ref={wrapperRef} className={`relative ${parentClassName ?? ""}`}>
      <div className="w-auto" onMouseDown={() => setOpenWrapper(!openWrapper)}>
        {button}
      </div>
      {!disableMenu && (
        <div
          className={`absolute w-full z-10 origin-top-right transition-all duration-300 ease-in-out ${
            openWrapper ? "scale-100" : "scale-0 hidden"
          } ${classNames ?? ""}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
