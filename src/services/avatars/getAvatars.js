const getAvatars = async ({ token, t }) => {
  const baseUrl = import.meta.env.VITE_API

  try {
    const response = await fetch(`${baseUrl}/avatars` , {
      method: "GET",
      headers: {
        "Content-type" : 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()
    if (response.ok) {
      return data
    }

    if (response.status === 400 || response.status === 500) {
      throw { error: true, message: t(`errorBack.${data.type}`)}
    }

  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { getAvatars }