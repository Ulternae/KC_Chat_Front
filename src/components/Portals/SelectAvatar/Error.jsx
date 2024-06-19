import { IconClose } from "../../../assets/IconClose"

const SelectAvatarError = ({ text, setPortal }) => {
  const closePortal = () => setPortal(false);

  return (
    <div
      className="absolute inset-0 bg-liwr-200/50 dark:bg-perl-800/50 max-w-[1111px] bg-opacity-50 flex justify-center items-center"
      onClick={closePortal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative py-8 sm:px-14 sm:py-10 shadow-liwr-focus dark:shadow-perl-focus rounded-lg bg-liwr-100 dark:bg-perl-800 w-full max-w-[639px] sm:max-w-[680px]"
      >
        <div className="px-1 flex gap-4 w-full items-center">
          <div className="w-8 h-8">
            <div className="bg-liwr-900 dark:bg-perl-200 w-full h-full rounded-l-full rounded-br-full"></div>
          </div>
          <p className="text-sm  font-light text-liwr-900 dark:text-perl-100 leading-none">{text}</p>

          <div>
          </div>
          <IconClose
            className={"absolute right-4 md:right-8 top-4 md:top-8 cursor-pointer"}
            onClick={closePortal}
          />
        </div>
      </div>
    </div>
  )
}

export { SelectAvatarError }