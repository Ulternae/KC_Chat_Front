const updateGroup = async ({ token, infoGroup, group_id, t}) => {
  const baseUrl = import.meta.env.VITE_API;
  
  try {
    const res = await fetch(`${baseUrl}/groups/${group_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...infoGroup })
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

    if (res.status === 422) {
      const typeError = data.error[0].message;
      throw { error: true, message: t(`validationBack.${typeError}`) };
    }

  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { updateGroup }