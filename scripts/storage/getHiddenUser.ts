export const getHiddenUsers = async () => {
  try {
    const result = await chrome.storage.local.get(["hiddenUsers"]);
    const hiddenUsersList = result.hiddenUsers || [];
    return hiddenUsersList;
  } catch (error) {
    console.error("숨김 사용자 목록을 가져오는 중 오류 발생:", error);
  }
};
