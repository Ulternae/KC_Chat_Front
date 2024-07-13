const createChat = async ({ token, friend_id, chat_id }) => {
  const baseUrl = import.meta.env.VITE_API

  try {
    const res = await fetch(`${baseUrl}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ friend_id, chat_id })
    })
    
    const data = await res.json();
    
    if (res.ok) {
      return data
    }
  
  } catch (error) {
    console.error("Error sending data to backend:", error);
    throw error;
  }
}

export { createChat }