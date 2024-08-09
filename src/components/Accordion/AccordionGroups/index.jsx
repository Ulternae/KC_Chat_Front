import { IconArrowBottom } from "../../../assets/IconArrowBottom";

const AccordionGroups = ({
  title,
  section,
  openSection,
  toggleSection,
  children,
  classNameChildren = ''
}) => {
  return (
    <div className="rounded-lg bg-gradient-to-b from-liwr-200 dark:from-perl-800 to-liwr-400 dark:to-perl-500 px-2 sm:px-4 md:px-6 py-6 w-full">
      <div className="flex gap-8 cursor-pointer" onClick={() => toggleSection(section)}>
        <h1 className="font-semibold dark:text-perl-200 text-liwr-900">
          {title}
        </h1>
        <IconArrowBottom
          className={`h-[24px] w-[14px] fill-liwr-900 dark:fill-perl-200 self-center transform transition-transform duration-300 cursor-pointer ${
            openSection === section ? "rotate-180" : ""
          }`}
        />
      </div>
      {openSection === section && <div className={classNameChildren}>{children}</div>}
    </div>
  );
};

export { AccordionGroups };
