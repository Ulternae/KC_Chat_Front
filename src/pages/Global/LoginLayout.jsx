const LoginLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b dark:from-perl-800 dark:to-perl-300 from-liwr-200 to-liwr-500 px-12 py-6 grid place-content-center">
      {children}
    </div>
  );
};

export { LoginLayout };
