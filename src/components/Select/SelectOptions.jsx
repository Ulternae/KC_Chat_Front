import { useTranslation } from "react-i18next";
import { IconArrowBottom } from "@assets/IconArrowBottom";
import { useState, useEffect, useRef } from "react";

const SelectOptions = ({ typeTranslate, options, title, valueOption, setValueOption }) => {
  const selectRef = useRef(null);
  const { t } = useTranslation();
  const [showOptions, setShowOptions] = useState(false);

  const toggleSelect = () => {
    setShowOptions(!showOptions)
  };

  useEffect(() => {
    const handleClickOutside = (e) => {

      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={selectRef} className="w-full sm:w-72">
        <div className="px-2 py-2 w-full sm:w-72 h-11 bg-liwr-200 dark:bg-perl-800 flex items-center justify-between rounded-lg border-2 border-liwr-100/70 dark:border-perl-300">
          <div
            className="ml-2 flex items-center gap-2 cursor-pointer"
            onClick={toggleSelect}
          >
            <IconArrowBottom />
            <h1 className="text-liwr-900 dark:text-perl-100 truncate  ">
              {t(`${typeTranslate}.${valueOption}`)}
            </h1>
          </div>
          <div className="relative w-1 sm:w-24 h-full">
          <div className="absolute -top-[20px] right-0 sm:relative sm:-top-0 bg-liwr-700 dark:bg-perl-100 w-24 h-full px-3 rounded-bl-lg rounded-tr-lg flex items-center">
            <p className="text-sm font-semibold dark:text-liwr-900 text-perl-100">{title}</p>
          </div>
          </div>
        </div>
        <div className="h-auto mt-2 relative">
          {showOptions && (
            <div className="absolute z-10 rounded-lg top-0 left-0 w-full sm:w-72 py-4 border-2 border-liwr-100/70 dark:border-perl-300 bg-liwr-200 dark:bg-perl-800">
              {options.map((value) => (
                <div
                  key={value}
                  className={`px-6 h-10 flex items-center cursor-pointer hover:bg-liwr-400 hover:dark:bg-perl-500 ${
                    value === valueOption ? "bg-liwr-400/70 dark:bg-perl-400" : ""
                  }`}
                  onClick={() => {
                    setValueOption(value);
                    setShowOptions(false);
                  }}
                >
                  <h1 className="text-liwr-900 dark:text-perl-100 text-sm">
                    {t(`${typeTranslate}.${value}`)}
                  </h1>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { SelectOptions };
