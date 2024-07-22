const FormInput = ({ text , fields, setFields, type}) => {
  return (
    <input
      type="text"
      placeholder={ text }
      className='placeholder:text-liwr-900/50 dark:placeholder:text-perl-100/40 text-liwr-900 dark:text-perl-100 text-sm w-full h-[40px] focus:outline-none rounded-lg px-5 py-3 border-none bg-liwr-300 dark:bg-perl-600'
      value={fields[type]}
      onChange={(e) => setFields({ ...fields, [type]: e.target.value })}
    />
  )
}

export { FormInput }