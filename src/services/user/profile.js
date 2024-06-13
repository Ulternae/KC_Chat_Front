const Profile = async ({ token, t }) => {
  const baseUrl = import.meta.env.VITE_API;
  try {
    const res = await fetch(`${baseUrl}/profile`, {
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

    if (res.status === 403 || res.status === 401) {
      throw { error: true, message: t(`errorBack.${data.type}`) , type: res.status };
    }
  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
};

export { Profile };
