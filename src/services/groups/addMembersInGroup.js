import { FIELDS_DB } from "../../constants"

const addMembersInGroup = async ({ token, groupId, membersGroup : users_ids, t }) => {
  const baseUrl = import.meta.env.VITE_API

  try {
    const res = await fetch(`${baseUrl}/groups/${groupId}/members` , {
      method: "POST",
      headers: {
        "Content-type" : 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ users_ids })
    })
    const data = await res.json()

    console.log({ res })
    if (res.ok) {
      return data
    }

    if (res.status !== 200) {
      throw { error: true, message: t(`errorBack.${data.type}`) , type: res.status , field: FIELDS_DB.MEMBERS};
    }

  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { addMembersInGroup }