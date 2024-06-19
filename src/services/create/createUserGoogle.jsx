
const createUserGoogle = async ({ token, settings, t }) => {
  const baseUrl = import.meta.env.VITE_API
  try {
    const res = await fetch(`${baseUrl}/register/google`, {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({ token, settings })
    })
    
    const data = await res.json()
    if (res.ok) {
      return data;
    }

    if (res.status === 400) {
      throw { error: true, type: t(`errorBack.${data.type}`) };
    }

  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { createUserGoogle }