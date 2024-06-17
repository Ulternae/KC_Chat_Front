import { IconClose } from "../../../assets/IconClose"

const SelectAvatarLoading = ({ setPortal }) => {
  const closePortal = () => setPortal(false);
  const avatarImgs = new Array(16).fill('');
  return (
    <div
      className=" scrollbar-liwr-500 dark:scrollbar-perl-300 absolute inset-0 bg-liwr-200/50 dark:bg-perl-800/50 max-w-[1111px] bg-opacity-50 flex justify-center items-center"
      onClick={closePortal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" relative pl-4 pr-2 py-8 sm:pl-14 sm:pr-8 sm:py-10 w-full h-full max-h-[400px] h-sm:max-h-[500px] h-md:max-h-[680px] bg-liwr-100 shadow-liwr-focus dark:shadow-perl-focus rounded-lg dark:bg-perl-800 rounded-11/12 max-w-[639px] sm:max-w-[680px] grid gap-4"
      >
        <div className="animate-pulse px-1 grid grid-cols-[30px_1fr] gap-4 w-full">
          <div className="w-8 h-8 overflow-hidden">
            <div
              className="bg-liwr-500 dark:bg-perl-300 w-full h-full object-cover rounded-l-full rounded-br-full" />
          </div>
          <div>
            <div className="w-16 h-3 mb-2 bg-liwr-900/40 dark:bg-perl-200/50 rounded-xl"></div>
            <div className="w-5/12 h-3 mb-2 bg-liwr-900/40 dark:bg-perl-200/50 rounded-xl"></div>

          </div>
          <IconClose
            className={"absolute right-4 md:right-8 top-4 md:top-8 cursor-pointer"}
            onClick={closePortal}
          />
        </div>

        <div className="animate-pulse pl-1 pr-[6px] sm:pl-1 sm:pr-5 overflow-x-hidden flex flex-wrap gap-4 py-2 justify-between">
          {avatarImgs.map((_, index) => (
            <div key={index}>
              <div
                className={'px-[6px] rounded-full w-24 h-24 bg-liwr-500 dark:bg-perl-300'}
              ></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export { SelectAvatarLoading }