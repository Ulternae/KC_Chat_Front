const loginUserGoogle = async ({ response, t }) => {
  const baseUrl = import.meta.env.VITE_API

  try {
    const res = await fetch(`${baseUrl}/login/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: response.credential }),
    });
    const data = await res.json();

    if (res.ok) {
      return data;
    }

    if (res.status === 400) {
      throw { error: true, type: t(`errorBack.${data.type}`), data: data.dataUser };
    }
  } catch (error) {
    console.error("Error sending data to backend:", { error: error.error, type: error.type });
    throw error;
  }
};

export { loginUserGoogle };
