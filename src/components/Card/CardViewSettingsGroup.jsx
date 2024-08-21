const CardViewSettingsGroup = () => {
  <div className="relative rounded-l-lg min-h-8 items-center dark:bg-perl-500 grid grid-cols-[repeat(auto-fit,minmax(144px,1fr))]">
    <div className="w-full min-w-36 bg-liwr-300 dark:bg-perl-400 h-8 rounded-l-lg border-r-2 dark:border-perl-300 rounded-r-sm px-4 flex items-center justify-between">
      <h1 className="dark:text-perl-200 font-medium leading-none truncate">{t('general.management')}</h1>
    </div>
    <div className="min-w-36 w-full h-8 px-4 flex justify-between items-center">
      <p className="dark:text-perl-100 font-medium truncate">{t(`management.${typeManagement}`)}</p>
      {canEdit && (
        <IconArrowRightLight className={"cursor-pointer rotate-90 dark:fill-perl-100"} />
      )}
    </div>
  </div>
}

export { CardViewSettingsGroup }