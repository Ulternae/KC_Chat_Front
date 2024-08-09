import { useOutletContext } from "react-router"
import { AccordionCard } from "@components/Accordion/AccordionCard"
import { LoadingSpinner } from "@loading/LoadingSpinner";
import { ACCION_THEME, PERMISSIONS } from "../../../constants"
import { ItemAddParticipant } from "../../../components/Item/ItemAddParticipant"
import { ItemViewParticipant } from "../../../components/Item/ItemViewParticipant"
import { InputSearch } from "../../../components/Input/InputSearch"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const AccordionParticipants = ({ fields, theme, infoAccordion, setFields }) => {
  const { t } = useTranslation()
  const { openSection, toggleSection, section } = infoAccordion
  const { friends: friendsOutlet } = useOutletContext()
  const { friendsUser, loadingFriends } = friendsOutlet
  const [search, setSearch] = useState('')

  const filteredFriends = friendsUser.filter(
    (friend) =>
      (friend.nickname.toLowerCase().includes(search.toLowerCase()) ||
        friend.username.toLowerCase().includes(search.toLowerCase())) &&
      !fields.some((fieldParticipant) => fieldParticipant.friend_id === friend.friend_id)
  );

  const participantsUsers = fields.filter((participant) => participant.permissions === PERMISSIONS.USER)
  const participantsModerators = fields.filter((participant) => participant.permissions === PERMISSIONS.MODERATOR)

  const notHasFieldsParticipants = fields.length === 0
  const hasParticipantsUsers = participantsUsers.length > 0 && !notHasFieldsParticipants
  const hasParticipantsModerators = participantsModerators.length > 0 && !notHasFieldsParticipants

  return (
    <AccordionCard
      statusColor={` fill-${ACCION_THEME[theme]}/50`}
      section={section}
      openSection={openSection}
      toggleSection={toggleSection}
      name={t('general.participants')}
    >
      <>
        {loadingFriends && <LoadingSpinner className={'h-[358px]'} />}

        {!loadingFriends && (
          <div className='flex flex-col gap-4'>
            <InputSearch
              search={search}
              setSearch={setSearch}
              text={t('groups.searchFriends')}
              classNameInput='text-sm bg-liwr-300 dark:bg-perl-500 placeholder:text-liwr-900/50 dark:placeholder:text-perl-100/40 rounded-lg text-liwr-900 dark:text-perl-100 focus:outline-none border-none w-full pl-4 pr-12 py-1'
            />
            <div className='max-h-48 overflow-x-hidden overflow-y-scroll grid gap-2'>
              {filteredFriends.map((friend) =>
                <ItemAddParticipant
                  key={friend.friend_id}
                  participant={friend}
                  setParticipants={setFields}
                />)}
            </div>
            <div className='h-1 w-full bg-liwr-300 dark:bg-perl-500 rounded-lg' />
            <div className='relative  flex flex-col' >

              <p className='mb-4 font-light text-sm leading-none text-liwr-900 dark:text-perl-100/80'>
                {t('general.users')}
              </p>

              <div className='py-4 text-liwr-900 dark:text-perl-100 text-sm w-full min-h-[40px] max-h-[280px] overflow-x-hidden overflow-y-auto focus:outline-none rounded-lg border-none grid gap-2 xl:px-4 xl:py-6 xl:bg-liwr-300 xl:dark:bg-perl-500'>
                {notHasFieldsParticipants && (
                  <p className='text-sm leading-none text-center text-liwr-900/50 dark:text-perl-100/40'>
                    {t('groups.notHaveParticipants')}
                  </p>
                )}
                {hasParticipantsUsers && (
                  participantsUsers.map((participant) =>
                    <ItemViewParticipant
                      key={participant.friend_id}
                      participant={participant}
                      setParticipants={setFields}
                    />)
                )}
                {hasParticipantsModerators && (
                  participantsModerators.map((participant) =>
                    <ItemViewParticipant
                      key={participant.friend_id}
                      participant={participant}
                      setParticipants={setFields}
                    />)
                )}
              </div>

            </div>
          </div>

        )}
      </>

    </AccordionCard>
  )
}

export { AccordionParticipants }