const EVENTS_SOCKETS = {
  LISTENER_USER: 'listenerUser',
  SEND_MESSAGE: 'sendMessage',
  JOIN_ROOM: 'joinRoom',
  MESSAGE: 'message',
  LOAD_MESSAGE: 'loadMessages',
  NOTIFICATION: 'notification',
  NEW_CHAT: 'newChat',
}

const THEME = {
  DARK_MODE: 'darkMode',
  LIGHT_MODE: 'lightMode',
  DARK: 'dark'
}

const STORAGE = {
  KC_CRT: 'KC_CRT'
}

const GRP = {
  CRIMSON: 'crimson',
  EMERALD: 'emerald',
  AMBER: 'amber',
  SAPPHIRE: 'sapphire',
  ORCHID: 'orchid'
}


const VERIFY_ACCION = {
  INITIAL : 'INITIAL',
  PARTIAL : 'PARTIAL',
  CORRECT : 'CORRECT'
}

const ACCION_THEME = {
  INITIAL : 'swiks-100',
  PARTIAL : 'swiks-300',
  CORRECT : 'swiks-200'
}

const PERMISSIONS = {
  USER : 'user',
  MODERATOR : 'moderator'
}

const COLORS_USERS = {
  CRIMSON: 'crimson',
  EMERALD: 'emerald',
  AMBER: 'amber',
  SAPPHIRE: 'sapphire',
  ORCHID: 'orchid'
}

const RANDOM_AVATAR = () => parseInt(Math.random()*13 + 1)

export { EVENTS_SOCKETS, THEME, STORAGE, GRP, VERIFY_ACCION, ACCION_THEME, PERMISSIONS, RANDOM_AVATAR, COLORS_USERS }