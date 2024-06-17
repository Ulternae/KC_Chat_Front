const avatarNotFound = import.meta.env.VITE_AVATAR_NOT_FOUND_IMAGE

const avatarNotFoundError = (e) => {
  e.target.onerror = null;
  e.target.src = avatarNotFound;
}

export { avatarNotFoundError }