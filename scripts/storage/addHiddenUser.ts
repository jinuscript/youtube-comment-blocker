import { getHiddenUsers } from "./getHiddenUser";

export const addHiddenUser = async (userName: string) => {
  try {
    // 사용자 목록 접근
    const hiddenUsersList = await getHiddenUsers();

    // 사용자 목록X -> 이름 추가
    if (hiddenUsersList.includes(userName)) return;

    // 갱신된 배열을 다시 저장소에 저장합니다.
    const newHiddenUsersList = [...hiddenUsersList];
    newHiddenUsersList.push(userName);

    await chrome.storage.local.set({ hiddenUsers: newHiddenUsersList });

    console.log("사용자 추가:", newHiddenUsersList);
  } catch (error) {
    console.error("숨김 사용자 목록을 저장 중 오류 발생:", error);
  }
};
