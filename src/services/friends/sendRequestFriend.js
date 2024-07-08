const sendRequestFriend = async ({ user_id_friend , token , t}) => {
  const baseUrl = import.meta.env.VITE_API;

  try {
    const res = await fetch(`${baseUrl}/friends`, {
      method: 'POST',
      headers: { 
        "Content-type" : "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ friend_id: user_id_friend })
    })

    const data = await res.json()

    if (res.ok) {
      return data
    }

    if (res.status === 422) {
      const errorData = await res.json();
      const typeError = errorData.error[0].message;
      throw { error: true, message: t(`validationBack.${typeError}`) };
    }

    if (res.status === 404 || res.status === 500 || res.status === 409 ) {
      const detailsChat = data?.details?.chat_id
      throw { error: true, message: t(`errorBack.${data.type}`), status: res.status, detailsChat};
    }

  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { sendRequestFriend }
