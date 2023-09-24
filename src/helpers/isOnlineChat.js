const currentTime = new Date().getHours();

export const isOnlineChat = currentTime < 9 || currentTime > 18;
