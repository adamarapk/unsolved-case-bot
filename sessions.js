const sessions = {};

export function startSession(user, name, mode) {
  sessions[user] = { name, mode, start: Date.now() };
}

export function getSession(user) {
  return sessions[user];
}

export function endSession(user) {
  delete sessions[user];
}