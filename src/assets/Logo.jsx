const Logo = ({ ...props}) => {
  return (
    <svg
      {...props}
      viewBox="0 0 320 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M59.8071 44.373V65.5949L0 52.09L59.8071 44.373Z"
        className="fill-liwr-900 dark:fill-perl-200"
      />
      <path
        d="M98.3923 65.3318L113.826 92.6045H135.048L111.058 52.09L98.3923 65.3318Z"
        className="fill-liwr-900 dark:fill-perl-200"
      />
      <path
        d="M71.3826 0V92.6045H92.6045V71.3826L98.3923 65.3318L111.058 52.09L135.048 27.0096H109.968L92.6045 44.373V0H71.3826Z"
        className="fill-liwr-100 dark:fill-perl-100"
        />
      <path
        d="M146.624 92.6045L123.473 52.09L146.624 27.0096H169.775L146.624 52.09L169.775 92.6045H146.624Z"
        className="fill-liwr-100 dark:fill-perl-100"
      />
      <path
        d="M285.273 71.8971L320 58.3923L285.273 46.8167L277.556 56.463L285.273 71.8971Z"
        className="fill-liwr-900 dark:fill-perl-200"
      />
      <path
        d="M277.556 20.0768L255.82 20.0937L238.263 54.3418L259.164 63.537L267.539 40.1489L277.572 40.1411L277.556 20.0768Z"
        className="fill-liwr-100 dark:fill-perl-100"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M182.251 26.7524L193.955 53.5048L260.888 86.9708L285.916 86.9453L277.556 76.9132L267.524 60.1929L259.164 63.537L238.263 54.3418L182.251 26.7524Z"
        className="fill-liwr-900 dark:fill-perl-200"
      />
      <path
        d="M158.842 53.5048L180.635 93.7211L224.108 93.6874L232.411 75.2431H200.651L193.955 53.5048L182.251 26.7524L158.842 53.5048Z"
        className="fill-liwr-100 dark:fill-perl-100"
      />
    </svg>
  );
};

export { Logo }