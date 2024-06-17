const IconClose = ({ className, ...props }) => {
  return (
    <svg {...props} width="12" height="12" viewBox="0 0 12 12" className={`fill-liwr-500 dark:fill-perl-300 ${className}`}>
      <path d="M2.56067 0.439336C1.97488 -0.146445 1.02513 -0.146445 0.439336 0.439336C-0.146445 1.02513 -0.146445 1.97488 0.439336 2.56067L3.87871 6.00002L0.439336 9.43938C-0.146445 10.0251 -0.146445 10.9749 0.439336 11.5607C1.02513 12.1464 1.97488 12.1464 2.56067 11.5607L6.00002 8.12133L9.43938 11.5607C10.0251 12.1464 10.9749 12.1464 11.5607 11.5607C12.1464 10.9749 12.1464 10.0251 11.5607 9.43938L8.12133 6.00002L11.5607 2.56067C12.1464 1.97488 12.1464 1.02513 11.5607 0.439336C10.9749 -0.146445 10.0251 -0.146445 9.43938 0.439336L6.00002 3.87871L2.56067 0.439336Z" />
    </svg>

  )
}

export { IconClose }