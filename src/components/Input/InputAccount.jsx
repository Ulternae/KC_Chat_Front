import { useState } from "react";
import { Show } from "../../assets/Show";
import { Hidden } from "../../assets/Hidden";

const InputAccountText = ({ title, text }) => {
  return (
    <div className="transition-colors duration-300 relative scrollbar-liwr-500 dark:scrollbar-perl-300 overflow-x-hidden min-h-16 ">
      <div className="absolute py-[2px] left-4 w-32 rounded-bl-lg rounded-tr-lg bg-liwr-500 dark:bg-perl-100 px-3">
        <p className="text-sm font-semibold text-liwr-100 dark:text-perl-800">
          {title}
        </p>
      </div>
      <div className="pt-3">
        <div className="overflow-x-scroll w-full overflow-hidden min-h-16 border-2 border-liwr-500 dark:border-perl-300/70 bg-liwr-300 dark:bg-perl-600 rounded-lg flex items-center md:px-8  py-4 px-4 ">
          <div>
            <p className="text-ellipsis text-sm text-liwr-900 dark:text-perl-100 mt-1 -mb-1">
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputAccountEdit = ({ title, setFields, fields }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="transition-colors duration-300 relative min-h-16">
      <div className="absolute py-[2px] left-4 w-32 rounded-bl-lg rounded-tr-lg bg-liwr-500 dark:bg-perl-100 px-3">
        <p className="text-sm font-semibold text-liwr-100 dark:text-perl-800">
          {title}
        </p>
      </div>
      <div className="pt-3">
        <div
          className={`transition-colors duration-300 w-full min-h-16 border-2 ${isFocused ? 'border-liwr-600 dark:border-perl-200 bg-liwr-200 dark:bg-perl-300' : 'border-liwr-500 dark:border-perl-300/70 bg-liwr-300 dark:bg-perl-300/70'} 
          hover:border-liwr-600 hover:dark:border-perl-200 hover:bg-liwr-200 hover:dark:bg-perl-300 rounded-lg flex items-center md:px-8 pb-4 pt-6 px-4`}
        >
          <input
            className="w-full focus:outline-none text-ellipsis text-sm text-liwr-900 dark:text-perl-100 bg-transparent"
            value={fields[title]}
            onChange={(e) => setFields({ ...fields, [title]: e.target.value })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={`Insert your new ${title}`}
          />
        </div>
      </div>
    </div>
  );
};

const InputAccountEditPassword = ({ title, password, setPassword }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const onToggleShowPassword = () => setShowPassword(!showPassword)

  return (
    <div className="transition-colors duration-300 relative min-h-16">
      <div className="absolute py-[2px] left-4 w-32 rounded-bl-lg rounded-tr-lg bg-liwr-500 dark:bg-perl-100 px-3">
        <p className="text-sm font-semibold text-liwr-100 dark:text-perl-800">
          {title}
        </p>
      </div>
      <div className="pt-3">
        <div
          className={` transition-colors duration-300   w-full min-h-16 border-2 ${isFocused ? 'border-liwr-600 dark:border-perl-200 bg-liwr-200 dark:bg-perl-300' : 'border-liwr-500 dark:border-perl-300/70 bg-liwr-300 dark:bg-perl-300/70'} 
          hover:border-liwr-600 hover:dark:border-perl-200 hover:bg-liwr-200 hover:dark:bg-perl-300 rounded-lg flex items-center md:px-8 pb-4 pt-6 px-4`}
        >
          <div className="relative flex justify-between w-full">
            <input
              className="w-full focus:outline-none text-ellipsis text-sm text-liwr-900 dark:text-perl-100 bg-transparent "
              value={password}
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={`Insert your new ${title}`}
            />
            <button
              type="button"
              onClick={onToggleShowPassword}
              className="flex items-center "
            >
              {showPassword ? <Show className={'w-6 h-5 mt-1'} /> : <Hidden className={'w-6 h-5 mt-1'} />}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

const InputAccountLoading = () => {
  return (
    <div className="transition-colors scrollbar-liwr-500 dark:scrollbar-perl-300 overflow-hidden duration-300 relative min-h-16 ">
      <div className="absolute py-[2px] left-4 w-32 rounded-bl-lg rounded-tr-lg bg-liwr-900/40 dark:bg-perl-200/50 px-3 ">
        <div className="w-6/12 h-3 my-1  bg-liwr-100/70 dark:bg-perl-800/70 rounded-lg"></div>
      </div>
      <div className="pt-3">
        <div className="bg-liwr-300 dark:bg-perl-700 rounded-lg overflow-x-scroll w-full overflow-hiddenh-16 dark:border-perl-300/70 flex items-center md:px-8 py-4 px-4">
          <div className="w-6/12 h-4 mt-2 bg-liwr-500/50 dark:bg-perl-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export { InputAccountText, InputAccountEdit, InputAccountLoading, InputAccountEditPassword };
