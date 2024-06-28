const getFriends = async ({ token }) => {
  const baseUrl = import.meta.env.VITE_API;

  try {
    const res = await fetch(`${baseUrl}/friends`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      return data;
    }
  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
};

export { getFriends };
