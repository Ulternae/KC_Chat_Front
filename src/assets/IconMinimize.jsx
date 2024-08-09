const IconMinimize = ({ className, ...props }) => {
  return (
    <svg
      width="9"
      height="3"
      viewBox="0 0 9 3"
      fill="#828FA3"
      className={className}
      {...props}
    >
      <path
        d="M1.5 3H7.63078C7.96412 3 9 2.7 9 1.5C9 0.3 7.96412 0 7.63078 0H1.5C1.16667 0 0 0.3 0 1.5C0 2.7 1.16667 3 1.5 3Z"
      />
    </svg>
  );
};

export { IconMinimize }