const createUser = async ({ dataUser, t }) => {
  const baseUrl = import.meta.env.VITE_API

  try {
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...dataUser }),
    });

    if (response.status === 400 || response.status === 500) {
      const errorData = await response.json();
      const typeError = errorData.type;
      throw { error: true, message: t(`errorBack.${typeError}`) };
    }

    if (response.status === 422) {
      const errorData = await response.json();
      const typeError = errorData.error[0].message;
      throw { error: true, message: t(`validationBack.${typeError}`) };
    }

    if (response.ok) {
      const data = await response.json();
      return data
    }
    
  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
};

export { createUser };
