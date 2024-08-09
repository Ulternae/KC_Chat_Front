import React from "react";

const AccordionPersonalized = ({
  children,
  className,
  openSection,
  accion2,
  section,
  sectionElement,
}) => {
  const [firstChild, secondChild] = React.Children.toArray(children);
  const firstChildAccion = React.cloneElement(firstChild, {
    onClick: openSection,
  });
  const secondChildAccion = React.cloneElement(secondChild, {
    onClick: accion2,
  });

  return (
    <div className={className}>
      {firstChildAccion}
      {section === sectionElement && secondChildAccion}
    </div>
  );
};

export { AccordionPersonalized };
