const IconMessages = ({ ...props }) => {
  return (
    <svg
      { ...props }
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <path
        d="M4 6.25C4 5.83579 4.33579 5.5 4.75 5.5H10.75C11.1642 5.5 11.5 5.83579 11.5 6.25C11.5 6.66421 11.1642 7 10.75 7H4.75C4.33579 7 4 6.66421 4 6.25Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8C16 4.22876 16 2.34315 14.8284 1.17157C13.6569 -1.19209e-07 11.7712 0 8 0C4.22876 0 2.34315 -1.19209e-07 1.17157 1.17157C-1.19209e-07 2.34315 0 4.22876 0 8V14C0 14.9428 5.96046e-08 15.4142 0.29289 15.7071C0.58579 16 1.05719 16 2 16H8C11.7712 16 13.6569 16 14.8284 14.8284C16 13.6569 16 11.7712 16 8ZM13.5 2.5C14.5251 3.52513 14.5 4.70017 14.5 8C14.5 11.2998 14.5251 12.4749 13.5 13.5C12.4749 14.5251 11.2998 14.5 8 14.5H3.5C2.67504 14.5 2.25629 14.2563 2 14C1.74372 13.7437 1.5 12.8249 1.5 12V8C1.5 4.70017 1.47488 3.52513 2.5 2.5C3.52513 1.47488 4.70017 1.5 8 1.5C11.2998 1.5 12.4749 1.47488 13.5 2.5Z"
      />
      <path
        d="M4.75 9H8.25C8.66421 9 9 9.33579 9 9.75C9 10.1642 8.66421 10.5 8.25 10.5H4.75C4.33579 10.5 4 10.1642 4 9.75C4 9.33579 4.33579 9 4.75 9Z"
      />
    </svg>
  );
};

export { IconMessages };
