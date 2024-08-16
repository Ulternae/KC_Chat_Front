const IconAdd = ({
  className = "cursor-pointer stroke-liwr-100 dark:stroke-perl-200",
  ...props
}) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
      className={className}
    >
      <path
        d="M2 8H8M8 8H14M8 8V2M8 8V14"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { IconAdd };
