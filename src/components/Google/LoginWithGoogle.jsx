const LoginWithGoogleButton = ({ setError, resetError, isRequesting, setIsRequesting, text, textStyle = 'font-medium text-sm dark:text-perl-200 text-liwr-800'}) => {
  
  const onSignInGoogle = () => {
    
    setError(resetError)
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.getSkippedReason() === "tap_outside") {
          google.accounts.id.prompt();
        }
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          initiateAlternativeGoogleSignIn();
        }
      });
    } else {
      initiateAlternativeGoogleSignIn();
    }
    setIsRequesting(true);
  };

  const initiateAlternativeGoogleSignIn = () => {
    const googleAlternative = document.querySelector(".googleSigninButtonAlternative");
    const googleButton = googleAlternative.querySelector("div[role='button']");
    
    if (googleButton) googleButton.click();
  };

  return (
    <>
      <div
        className="googleSigninButtonAlternative hidden"
        ref={(el) => {
          if (el && window.google && window.google.accounts.id) {
            window.google.accounts.id.renderButton(el, {
              theme: "outline",
              text: "signin",
              width: "200",
            });
          }
        }}
      ></div>
      <div className="flex items-center gap-4">
        <p
          disabled={true}
          className={` ${textStyle}`}
        >
          {text}
        </p>
        <button
          onClick={onSignInGoogle}
          disabled={isRequesting}
          className={`${isRequesting ? "cursor-not-allowed" : ""}`}
        >
          <img src="gmail.svg" alt="Gmail Sign In" />
        </button>
      </div>
    </>
  );
};

export { LoginWithGoogleButton };
