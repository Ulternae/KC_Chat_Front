import React, { useState, useEffect, useRef } from "react";

const SelectOptionsPersonalized = ({ className, children }) => {
  const selectRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
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
    setShowOptions(false);
  }

  const [firstChild, secondChild] = React.Children.toArray(children);
  const firstChildToggleOptions = React.cloneElement(firstChild, { onClick: toggleSelect })
  const secondChildCloseOptions = React.cloneElement(secondChild, { onClick: closeOptions})

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
