const FormText = ({ text }) => {
  return (
    <div className='z-20 px-2 h-5 w-auto rounded-lg absolute top-0 left-3 bg-liwr-400 dark:bg-perl-550'>
      <p className='font-light text-sm leading-none text-liwr-900 dark:text-perl-100/80'>
        { text }
      </p>
    </div>
  )
}

export { FormText }