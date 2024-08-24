const updateChatGroup = async ({ token, chat_id, infoChat, group_id, t}) => {
  const baseUrl = import.meta.env.VITE_API;
  
  try {
    const res = await fetch(`${baseUrl}/groups/${group_id}/chats/${chat_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...infoChat })
    });
    const data = await res.json();

    if (res.ok) {
      return data;
    }

    if (res.status === 500) {
      throw {
        error: true,
        message: t(`errorBack.${data.type}`),
        type: res.status,
      };
    }

  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { updateChatGroup }