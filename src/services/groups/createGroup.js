import { FIELDS_DB } from '../../constants'
const createGroup = async ({ token, fieldsGroup, t }) => {
  const baseUrl = import.meta.env.VITE_API

  try {
    const res = await fetch(`${baseUrl}/groups` , {
      method: "POST",
      headers: {
        "Content-type" : 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ...fieldsGroup })
    })
    const data = await res.json()

    if (res.ok) {
      return data
    }

    if (res.status !== 200) {
      throw { error: true, message: t(`errorBack.${data.type}`) , type: res.status , field: FIELDS_DB.GROUP};
    }

  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { createGroup }