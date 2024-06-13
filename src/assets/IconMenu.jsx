const IconMenu = ({ ...props }) => {
  return (
    <svg
      { ...props }
      width="70"
      height="34"
      viewBox="0 0 70 34"
      fill="none"
    >
      <path
        d="M69.5002 26L68.0437 26.2462H0L66.6811 34.0086L69.5002 26Z"
        className="dark:fill-perl-300 fill-liwr-500"
      />
      <path
        d="M0 0V19.9737L69.8078 20L69.8091 19.9999L70 19.985L0 0Z"
        className="dark:fill-perl-300 fill-liwr-500"
      />
      <circle cx="29" cy="22" r="6" className="dark:fill-perl-100 fill-liwr-800" />
      <circle cx="44" cy="22" r="6" className="dark:fill-perl-100 fill-liwr-800" />
      <circle cx="59" cy="22" r="6" className="dark:fill-perl-100 fill-liwr-800" />
    </svg>
  );
};

export { IconMenu };
