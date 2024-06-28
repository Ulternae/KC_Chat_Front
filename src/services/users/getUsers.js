const getUsers = async({ t }) => {
  const baseUrl = import.meta.env.VITE_API;

  try {
    const res = await fetch(`${baseUrl}/users`, {
      method: 'GET',
    })

    const data = await res.json()

    if (res.ok) {
      return data
    }

    if (res.status !== 200) {
      throw { error: true, message: t(`errorBack.${data.type}`) };
    }

  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { getUsers }