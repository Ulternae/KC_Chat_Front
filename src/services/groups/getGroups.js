const getGroups = async ({ token }) => {
  const baseUrl = import.meta.env.VITE_API

  try {
    const res = await fetch(`${baseUrl}/groups` , {
      method: "GET",
      headers: {
        "Content-type" : 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()

    if (res.ok) {
      return data
    }

    console.log({ dataErrorGroup: data})

  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { getGroups }