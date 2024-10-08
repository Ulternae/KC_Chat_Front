const deleteProfile = async ({ token }) => {
  const baseUrl = import.meta.env.VITE_API;
  try {
    const res = await fetch(`${baseUrl}/profile`, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()

    if (res.ok) {
      return data
    }
  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { deleteProfile }