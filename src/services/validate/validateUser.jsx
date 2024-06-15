const validateUser = async ({ token, password, t }) => {
  const baseUrl = import.meta.env.VITE_API
  try {
    const response = await fetch(`${baseUrl}/users/validate`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ password })
    })
    const data = await response.json()

    if (response.ok) {
      return data
    }

    if (response.status === 400) {
      const typeError = data.type
      throw { error: true, message: t(`errorBack.${typeError}`) }
    }
    if (response.status === 401) {
      throw { error: true, message: t('errorType.unauthorized.401_edit') }
    }
    if (response.status === 403) {
      throw { error: true, message: t('errorType.unauthorized.403_edit') }
    }
    if (response.status === 422) {
      const typeError = data.error[0].message;
      throw { error: true, message: t(`validationBack.${typeError}`) };
    }
    if (response.status === 500) {
      throw { error: true, message: t('errorBack.databaseError') }
    }

  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { validateUser }