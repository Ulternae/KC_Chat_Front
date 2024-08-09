const WarningCreateGroup = ({ errorInfo }) => {
  const { errorFields } = errorInfo;

  if (errorFields.error) {
    return (
      <div className="py-4">
        <p className="text-sm text-center text-warn-800 dark:text-warn-100 font-medium">
          {errorFields.message}
        </p>
      </div>
    );
  }
};

export { WarningCreateGroup };
