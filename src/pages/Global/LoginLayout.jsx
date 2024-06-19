const LoginLayout = ({ children }) => {
  return (
    <div className="w-full flex items-center min-h-screen bg-gradient-to-b dark:from-perl-800 dark:to-perl-300 from-liwr-200 to-liwr-500 sm:px-12 px-8 sm:grid place-content-center">
      {children}
    </div>
  );
};

export { LoginLayout };
