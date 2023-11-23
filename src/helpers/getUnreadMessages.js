export const getUnreadMessages = messages => {
  let lastIndex = messages.length - 1;

  if (lastIndex < 0 || messages[lastIndex].messageOwner === 'user') {
    return null;
  }

  let count = 0;
  while (lastIndex >= 0 && messages[lastIndex].messageOwner !== 'user') {
    count++;
    lastIndex--;
  }

  return count;
};
