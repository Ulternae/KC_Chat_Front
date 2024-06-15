const ButtonSecondary = ({ text, className, ...props }) => {
    return (
        <button
            className={`${className} px-4 rounded-md py-2 text-liwr-900 dark:text-perl-100 transition-colors duration-300 bg-transparent dark:bg-transparent  `}
            {...props}
        >
            {text}
        </button>
    );
};

export { ButtonSecondary };
