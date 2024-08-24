const EVENTS_SOCKETS = {
  LISTENER_USER: "listenerUser",
  SEND_MESSAGE: "sendMessage",
  JOIN_ROOM: "joinRoom",
  MESSAGE: "message",
  LOAD_MESSAGE: "loadMessages",
  NOTIFICATION: "notification",
  NEW_CHAT: "newChat",
};

const THEME = {
  DARK_MODE: "darkMode",
  LIGHT_MODE: "lightMode",
  DARK: "dark",
};

const STORAGE = {
  KC_CRT: "KC_CRT",
};

const GRP = {
  CRIMSON: "crimson",
  EMERALD: "emerald",
  AMBER: "amber",
  SAPPHIRE: "sapphire",
  ORCHID: "orchid",
};

const VERIFY_ACCION = {
  INITIAL: "INITIAL",
  PARTIAL: "PARTIAL",
  CORRECT: "CORRECT",
};

const ACCION_THEME = {
  INITIAL: "swiks-100",
  PARTIAL: "swiks-300",
  CORRECT: "swiks-200",
};

const PERMISSIONS = {
  ADMIN: "admin",
  USER: "user",
  MODERATOR: "moderator",
};

const COLORS_USERS = {
  CRIMSON: "crimson",
  EMERALD: "emerald",
  AMBER: "amber",
  SAPPHIRE: "sapphire",
  ORCHID: "orchid",
};

const MANAGEMENT_GROUPS = {
  PUBLIC: "public",
  PRIVATE: "private",
};

const OPTIONS_PARTICIPANTS = {
  ALL: "all",
  MODERATOR: "moderator",
  USER: "user",
  PERSONALIZED: "personalized",
};

const MARKDOWN = {
  DEFAULT:
    '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":null,"format":"","indent":0,"type":"root","version":1}}',
};

const CHAT = {
  FOUND: "found",
  NOT_FOUND: "notFound",
};

const FIELDS_DB = {
  GROUP: "groups",
  MEMBERS: "members",
  MODERATORS: "moderators",
  CHATS: 'chats'
}

const SECTION_HEADER_GROUP = {
  NAME : 'name' ,
  CATEGORY: 'category',
  AVATAR: 'avatar',
  DESCRIPTION : 'description'
}

const VALIDATE_ACCION = {
  INITIAL: 'initial',
  PARTIAL: 'partial',
  CORRECT: 'correct'
}

const VALIDATE_ACCION_VIEWS_COLORS = {
  'initial': 'stroke-swiks-100',
  'partial': 'stroke-swiks-300',
  'correct': 'stroke-swiks-200'
}

const MENU = {
  PROFILE: 'profile',
  FRIENDS: 'friends',
  GROUPS: 'groups',
  MESSAGES: 'messages',
  DARK_MODE: 'darkMode',
  LIGHT_MODE: 'lightMode',
  SETTINGS: 'settings',
  ACCOUNT: 'account',
  CREATE_GROUP: 'createGroup'
}

const RANDOM_AVATAR = () => parseInt(Math.random() * 13 + 1);
const RANDOM_COLOR = () => {
  const colors = Object.keys(COLORS_USERS)
  const selectedRandom = colors[Math.floor(Math.random() * colors.length)];
  return COLORS_USERS[selectedRandom]
}

export {
  EVENTS_SOCKETS,
  THEME,
  STORAGE,
  GRP,
  VERIFY_ACCION,
  ACCION_THEME,
  PERMISSIONS,
  RANDOM_AVATAR,
  COLORS_USERS,
  MANAGEMENT_GROUPS,
  OPTIONS_PARTICIPANTS,
  MARKDOWN,
  CHAT,
  RANDOM_COLOR,
  FIELDS_DB,
  SECTION_HEADER_GROUP,
  VALIDATE_ACCION,
  VALIDATE_ACCION_VIEWS_COLORS,
  MENU
};
