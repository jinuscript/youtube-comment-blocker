import { getHiddenUsers } from "./getHiddenUser";

export const deleteUserFromStorage = async (userName: string) => {
  try {
    // 사용자 목록 접근
    const hiddenUsersList = await getHiddenUsers();

    // 입력된 이름 제외하고 새로운 배열 생성
    const removedHiddenUsersList = hiddenUsersList.filter(
      (user: string) => user !== userName
    );

    await chrome.storage.local.set({ hiddenUsers: removedHiddenUsersList });

    console.log("제거 완료");
  } catch (error) {
    console.error("숨김 사용자 목록을 저장 중 오류 발생:", error);
  }
};
