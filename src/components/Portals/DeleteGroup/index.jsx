import { ButtonFocus } from "../../Button/ButtonFocus";
import { ButtonWarning } from "../../Button/ButtonWarning";
import { LayoutBasePortal } from "../Layouts/LayoutBase";
import { LoadingSpinner } from "@loading/LoadingSpinner";
import { InputConfirmAccionPersonalized } from "../../Input/InputSettings";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  VALIDATE_ACCION as VA,
  VALIDATE_ACCION_VIEWS_COLORS as VA_VC,
} from "@constants";
import { getToken } from "../../../token";
import { deleteGroup } from "../../../services/groups/deleteGroup";
import { useNavigate, useOutletContext } from "react-router";

const DeleteGroupPortal = ({ setPortal, groupInfo, currentGroup }) => {
  const initialErrorFields = { error: false, message: "", type: null };
  const token = getToken()
  const navigate = useNavigate()
  const { t } = useTranslation();
  const { group_name, group_id } = groupInfo
  const { chats, groups } = useOutletContext()
  const { setChatsGroups, loadingChat } = chats
  const { setGroupsUser, loadingGroups} = groups

  const messageConfirmDelete = t("buttons.confirm");

  const [loading, setLoading] = useState(loadingChat || loadingGroups);
  const [userConfirm, setUserConfirm] = useState('');
  const [errorFields, setErrorFields] = useState(initialErrorFields);
  const [validate, setValidate] = useState(VA.INITIAL);

  const handleClosePortal = () => setPortal(false);

  
  const handleConfirmDeleteGroup = async () => {
  
    const isValidConfirm = userConfirm.toLowerCase() === messageConfirmDelete.toLowerCase()
    
    if (!userConfirm) {
      return setErrorFields({ error: true, message: t('deleteGroup.missingFields') })
    }
    if (!isValidConfirm) {
      return setErrorFields({ error: true, message: t('deleteGroup.errorConfirm') })
    }

    setLoading(true)

    try {
      await deleteGroup({ token, t, group_id })
      setGroupsUser((prev) => prev.filter((group) => group.group_id !== group_id))
      setChatsGroups((prev) => prev.filter((chat) => !currentGroup.chats_group.some((chatGroup) => chatGroup.chat_id === chat.chat_id)))
      navigate('/groups')
    } catch (error) {
      setErrorFields({...error})
    } finally {
      setLoading(false)
    }

  };

  useEffect(() => {
    const lengthConfirmDelete = userConfirm.length;
    setErrorFields(initialErrorFields)
    if (lengthConfirmDelete === 0) setValidate(VA.INITIAL);
    if (lengthConfirmDelete > 0) {
      if (userConfirm.toLowerCase() === messageConfirmDelete.toLowerCase()) {
        setValidate(VA.CORRECT); 
      } else {
        setValidate(VA.PARTIAL);
      }
    }
  }, [userConfirm]);

  return (
    <LayoutBasePortal className="z-30" setPortal={setPortal}>
      <h1 className="text-lg font-semibold text-liwr-900 dark:text-perl-100">
        {t("deleteGroup.title")}
      </h1>
      <p className="text-liwr-900 dark:text-perl-100 text-sm font-light">
        {t("deleteGroup.instruction", { group_name: group_name })}
        <span className="font-semibold">
          {t("buttons.confirm").toUpperCase()}
        </span>
      </p>
      <div className="relative transition-colors duration-300 mt-6 min-h-16">
        {!loading && (
          <>
            <div className="grid gap-3">
              <InputConfirmAccionPersonalized
                title={t("deleteGroup.confirmAccion")}
                placeholder={t("deleteGroup.instructionConfirm")}
                value={userConfirm}
                onChange={(e) => setUserConfirm(e.target.value)}
                themeValidate={VA_VC[validate]}
              />
            </div>

            <div className="min-h-10 mt-6 mb-6 flex items-center justify-center">
              {errorFields.error && (
                <p className="text-sm text-center text-warn-800 dark:text-warn-100 font-medium">
                  {errorFields.message}
                </p>
              )}
            </div>
          </>
        )}

        {loading && <LoadingSpinner className={"h-[164px]"} />}

        <div className="flex gap-2 justify-end">
          <ButtonFocus
            text={t("buttons.cancel")}
            className={"w-32 text-sm font-semibold"}
            onClick={handleClosePortal}
          />
          <ButtonWarning
            text={t("buttons.confirm")}
            className={`${
              loading ? "cursor-not-allowed" : ""
            } w-32 text-sm font-semibold`}
            onClick={handleConfirmDeleteGroup}
          />
        </div>
      </div>
    </LayoutBasePortal>
  );
};


export { DeleteGroupPortal };
