const updateSettings = async({ token , settingsUpdate, t}) => {
  const baseUrl = import.meta.env.VITE_API;

  try {
    const res = await fetch(`${baseUrl}/settings`, {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...settingsUpdate })
    })

    const data = await res.json()

    if (res.ok) {
      return data;
    }
  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { updateSettings }