import { useTranslation } from "react-i18next";

const FormSelect = ({ options, selected, setSelected, typeTranslate, className='bg-liwr-300 dark:bg-perl-600 p-4 rounded-lg w-full grid gap-1' }) => {
  const { t } = useTranslation();
  const handleOptionChange = ({option}) => {
    setSelected(option);
  };

  return (
    <div className={className}>
      {options.map((option) => (
        <div 
  className="flex gap-2 items-center cursor-pointer group" 
  key={option}
  onClick={() => handleOptionChange({ option })}
>
  <div
    className={`${
      option === selected
        ? "bg-liwr-900 dark:bg-perl-100 border-liwr-900 dark:border-perl-100"
        : "border-liwr-900/50 dark:border-perl-100/40"
    } rounded-sm border-2  w-4 h-4 transition-colors duration-300 group-hover:bg-liwr-900 group-hover:dark:bg-perl-100 group-hover:border-liwr-900 group-hover:dark:border-perl-100`}
  />
  <p
    className={`${
      option === selected
        ? "text-liwr-900 dark:text-perl-100"
        : "text-liwr-900/50 dark:text-perl-100/40"
    } text-sm truncate transition-colors duration-300 group-hover:text-liwr-900 group-hover:dark:text-perl-100`}
  >
    {t(`${typeTranslate}.${option}`)}
  </p>
</div>

      ))}
    </div>
  );
};

export { FormSelect };