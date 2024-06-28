const updateProfile = async ({ token, updatedUserData, t }) => {
  const baseUrl = import.meta.env.VITE_API;

  try {
    const res = await fetch(`${baseUrl}/profile`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...updatedUserData })
    });

    const data = await res.json();

    if (res.ok) {
      return data;
    }
    
    if (res.status === 400 || res.status === 500 || res.status === 404 ) {
      throw { error: true, message: t(`errorBack.${data.type}`)}
    }

    if (res.status === 422) {
      throw { error: true, message: t(`validationBack.${data.error[0].message}`) };
    }

  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
};

export { updateProfile }
