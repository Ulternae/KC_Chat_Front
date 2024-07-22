import { ButtonFocus } from "@components/Button/ButtonFocus"
import { GroupCardView } from "@components/Card/GroupCardView"
import { useTranslation } from "react-i18next"

const ViewFutureGroups = () => {
  const { t } = useTranslation()
  return (
    <div className="transition-colors duration-300 max-w-[1111px] grid gap-x-4 gap-y-12 sm:grid-cols-[minmax(240px,1fr)_minmax(188px,400px)_112px] sm:grid-rows-[120px_1fr]">
      <div className="row-start-1 row-end-2 col-start-1 col-end-3 sm:col-start-2 sm:col-end-3 flex sm:gap-4 items-center">
        <h1 className="sm:text-end text-liwr-700 dark:text-perl-200 font-semibold text-xl leading-none">
          {t('groups.inviteCreateJoin')}
        </h1>
      </div>

      <div className="col-start-1 col-end-3 sm:col-end-2 sm:row-start-1 sm:row-end-3 flex flex-col justify-between">
        <img className="w-full" src="headerSalamander.png" />
        <img className="pr-10 w-full max-w-[500px] object-contain" src="salamander.png" />
      </div>
      <ButtonFocus
        text={'Create Group'}
        className={'ml-auto sm:m-auto w-28 leading-none h-16 font-medium text-base row-start-3 row-end-4 col-start-1 col-end-3 sm:row-start-1 sm:row-end-2 sm:col-start-3 sm:col-end-4'}
      />
      <section className="col-start-1 col-end-3 sm:col-start-2 sm:col-end-4 scrollbar-liwr-300 dark:scrollbar-perl-400 mt-auto">
        <h2
          className=" text-liwr-700 dark:text-perl-200 font-semibold text-base "
        >
          {t('groups.joinPublic')}
        </h2>
        <div className="my-8 max-h-[340px] sm:max-h-[350px] lg:max-h-[348px] xl:max-h-[394px] overflow-x-hidden overflow-y-auto grid gap-x-3 gap-y-2 ">
          <GroupCardView />
          <GroupCardView />
          <GroupCardView />
          <GroupCardView />
          <GroupCardView />
          <GroupCardView />
          <GroupCardView />
          <GroupCardView />
        </div>
        { /* To switch views without lag */}
        {/* <div className="h-10"></div> */}
        <ButtonFocus
          text={'Confirm'}
          className={'w-full max-w-[300px] text-base'} />

      </section>
    </div>
  )
}

export { ViewFutureGroups }