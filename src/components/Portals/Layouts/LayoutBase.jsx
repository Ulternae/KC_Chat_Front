import { IconClose } from "../../../assets/IconClose"

const LayoutBasePortal = ({ className = '', secondaryClassname = '',  setPortal, children }) => {
  const onClosePortal = () => setPortal(false)

  return (
    <div
      className={`absolute inset-0 bg-liwr-200/50 dark:bg-perl-800/50 max-w-[1111px] bg-opacity-50 flex justify-center items-center ${className}`}
      onClick={onClosePortal}
    >
      <div
        className={`relative bg-liwr-100 shadow-liwr-focus dark:shadow-perl-focus rounded-lg dark:bg-perl-800 px-4 py-8 sm:px-14 sm:py-10 rounded-11/12 max-w-[639px] grid gap-4 ${secondaryClassname}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <IconClose
          className={" absolute right-4 md:right-8 top-4 md:top-8 cursor-pointer"}
          onClick={onClosePortal}
        />
      </div>

    </div>
  )
}

export { LayoutBasePortal }