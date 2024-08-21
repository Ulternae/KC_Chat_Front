import React, { useState, useEffect, useRef } from "react";

const SelectOptionsPersonalized = ({ className, children, closeViewOptions = true }) => {
  const selectRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target) && closeViewOptions) {
        setShowOptions(false);
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleSelect = () => {
    setShowOptions(!showOptions)
  };

  const closeOptions = () => {
    if (closeViewOptions) {
      setShowOptions(false);
    }
  }

  const childArray = React.Children.toArray(children);

  const firstChild = childArray[0];
  const secondChild = childArray[1];

  const firstChildToggleOptions = firstChild
    ? React.cloneElement(firstChild, { onClick: toggleSelect })
    : null;

  const secondChildCloseOptions = secondChild
    ? React.cloneElement(secondChild, { onClick: closeOptions })
    : null;

  return (
    <>
      <div ref={selectRef} className={className}>
        {firstChildToggleOptions}
        {showOptions && secondChildCloseOptions}
      </div>
    </>
  );
};

export { SelectOptionsPersonalized };
