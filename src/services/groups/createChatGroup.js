import { FIELDS_DB } from "../../constants"

const createChatGroup = async ({ token , chatInfo , groupId , t }) => {
  const baseUrl = import.meta.env.VITE_API
  const { chat_users , chat_id , name } = chatInfo 
  try {
    const res = await fetch(`${baseUrl}/groups/${groupId}/chats`, {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${token}`
      } , 
      body: JSON.stringify({ chat_users , chat_id , name })
    })
    const data = await res.json() 

    if (res.ok) {
      return data
    }

    if (res.status !== 200) {
      throw { error: true, message: t(`errorBack.${data.type}`) , type: res.status , field: FIELDS_DB.CHATS};
    }

  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { createChatGroup }