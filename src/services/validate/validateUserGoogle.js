const validateUserGoogle = async ({ tokenSession, tokenGoogle, t}) => {
  const baseUrl = import.meta.env.VITE_API

  try {
    const response = await fetch(`${baseUrl}/users/validate/google`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokenSession}`
      },
      body: JSON.stringify({ token: tokenGoogle })
    })
    const data = await response.json()

    if (response.ok) {
      return data
    }

    if (response.status === 422 || response.status === 400) {
      throw { error: true, message: t(`errorBack.${data.type}`)}
    }

  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { validateUserGoogle }