const IconTriangle = ({ className }) => {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      className={className} //fill
    >
      <path d="M7 9H0L9 0V7C9 8.6 7.66667 9 7 9Z"  />
    </svg>
  );
};

export { IconTriangle };
