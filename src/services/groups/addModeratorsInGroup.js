import { FIELDS_DB } from "../../constants"

const addModeratorsInGroup = async ({ token, groupId, moderatorsGroup : users_ids, t }) => {
  const baseUrl = import.meta.env.VITE_API

  try {
    const res = await fetch(`${baseUrl}/groups/${groupId}/moderators` , {
      method: "POST",
      headers: {
        "Content-type" : 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ users_ids })
    })
    const data = await res.json()

    if (res.ok) {
      return data
    }

    if (res.status !== 200) {
      throw { error: true, message: t(`errorBack.${data.type}`) , type: res.status , field: FIELDS_DB.MODERATORS};
    }

  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { addModeratorsInGroup }