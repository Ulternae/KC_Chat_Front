import React from "react";

const ConditionalView = ({ children, conditional }) => {
  const childrenArray = React.Children.toArray(children);
  const condition = typeof conditional === 'function' ? conditional() : conditional;
  
  if (childrenArray.length === 1) {
    return <>{condition && childrenArray[0]}</>;
  }

  return <>{condition ? childrenArray[0] : childrenArray[1]}</>;
};


export { ConditionalView };
