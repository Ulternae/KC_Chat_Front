import { IconArrowRightLight } from "../../assets/IconArrowRightLight";
import React from "react";

const CardViewSettingsGroup = ({ children, canEdit, primaryText, secondaryText, onClick }) => {
  const childrenArray = React.Children.toArray(children)
  return (
    <div
      className="relative rounded-l-lg min-h-8 items-center bg-liwr-400 dark:bg-perl-500 grid grid-cols-[repeat(auto-fit,minmax(144px,1fr))]"
      onClick={onClick}
    >
      <div className="w-full min-w-36 bg-liwr-500/50 dark:bg-perl-400 h-8 rounded-l-lg border-r-2 border-liwr-300 dark:border-perl-300 rounded-r-sm px-4 flex items-center justify-between">
        <h1 className="text-liwr-900 dark:text-perl-200 font-medium leading-none truncate">
          {primaryText}
        </h1>
        {childrenArray[0]}
      </div>
      <div className="min-w-36 w-full h-8 px-4 flex justify-between items-center">
        <p className="text-liwr-700 dark:text-perl-100 font-medium truncate">
          {secondaryText}
        </p>
        {canEdit && (
          <IconArrowRightLight
            className={"cursor-pointer rotate-90 fill-liwr-600 dark:fill-perl-100"}
            onClick={onClick}
          />
        )}
      </div>
    </div>
  );
};


export { CardViewSettingsGroup };
