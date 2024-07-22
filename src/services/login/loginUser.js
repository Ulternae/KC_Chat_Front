const LoginUser = async ({ dataUser , t}) => {
  const baseUrl = import.meta.env.VITE_API

  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...dataUser }),
    });
    const data = await response.json();

    if (response.ok) {
      return data
    }

    if (response.status === 400) {
      throw { error: true, message: t(`errorBack.${data.type}`) };
    }

    if (response.status === 422) {
      const typeError = data.error[0].message;
      throw { error: true, message: t(`validationBack.${typeError}`) };
    }

  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { LoginUser }