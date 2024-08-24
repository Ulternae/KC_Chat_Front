const deleteGroup = async ({ token, t, group_id }) => {
  const baseUrl = import.meta.env.VITE_API;

  try {
    const res = await fetch(`${baseUrl}/groups/${group_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (res.ok) {
      return data;
    }

    if (res.status === 500) {
      throw {
        error: true,
        message: t(`errorBack.${data.type}`),
        type: res.status,
      };
    }

  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
};

export { deleteGroup };
