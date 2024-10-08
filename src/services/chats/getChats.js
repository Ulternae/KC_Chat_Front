const getChats = async ({ token , t }) => {
  const baseUrl = import.meta.env.VITE_API

  try {
    const res = await fetch(`${baseUrl}/chats` , { 
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()
    if (res.ok) {
      return data
    }

    if (res.status !== 200) {
      throw { error: true, message: t(`errorBack.${data.type}`), type: res.status };
    }
  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { getChats }