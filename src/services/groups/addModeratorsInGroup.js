const addModeratorsInGroup = async ({ token, groupId, moderatorsGroup : users_ids }) => {
  const baseUrl = import.meta.env.VITE_API

  try {
    const res = await fetch(`${baseUrl}/groups/${groupId}/moderators` , {
      method: "POST",
      headers: {
        "Content-type" : 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ users_ids })
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

export { addModeratorsInGroup }