const UserActionCard = ({ dataUser , icon: Icon, accion}) => {
  const { avatar_url, nickname, username = ''} = dataUser
  return (
    <div className="grid grid-cols-[1fr_48px] w-full h-11 ">
      <div className="bg-liwr-200 dark:bg-perl-600 rounded-l-lg rounded-r-[4px] z-10 h-11 flex  items-center px-3 gap-2">
        <img className="w-8 h-8 object-cover rounded-full cursor-pointer" src={avatar_url} alt="Non friends user avatar" />
        <span className="flex flex-col">
        <p className="text-sm font-normal text-liwr-800 dark:text-perl-100 leading-none truncate">{nickname}</p>
        <p className="font-light text-xs text-liwr-700 dark:text-perl-200 leading-none truncate">{username}</p>
        </span>
      </div>
      <div 
        className="bg-liwr-300 dark:bg-perl-400 rounded-lg -ml-3 z-0 pl-3 h-11 flex items-center justify-center cursor-pointer"
        onClick={accion}
      >
        <Icon className="w-6 h-6" />
      </div>
    </div>
  )
}

export { UserActionCard }