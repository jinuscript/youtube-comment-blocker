import { createHideUserButton } from "./../element/createHideUserButton";
import { getUserName } from "../utils";
import { getHiddenUsers } from "../storage/getHiddenUser";

export const observeContents = async () => {
  const comments = document.querySelector("#comments");
  const sections = comments.querySelector("#sections");
  const contents = sections.querySelector("#contents");

  const contentsObserver = new MutationObserver(async (mutations) => {
    const blockedUsersList = await getHiddenUsers();

    for (const m of mutations) {
      if (m.type === "childList" && m.addedNodes.length > 0) {
        m.addedNodes.forEach((node) => {
          if (node.tagName === "YTD-COMMENT-THREAD-RENDERER") {
            const commentContainer = node.querySelector("#comment-container");
            const commentViewModel = commentContainer.querySelector(
              "ytd-comment-view-model"
            );
            const body = commentViewModel.querySelector("#body");

            if (body) {
              // 댓글 작성자 이름
              const username = getUserName(body);

              if (blockedUsersList.includes(username)) {
                // 차단 리스트 O - 해당 node 숨김처리
                node.style.display = "none";
              } else {
                // 차단 리스트 X - 숨김 버튼 추가
                const hideUserButton = createHideUserButton(username);
                body.appendChild(hideUserButton);
              }

              // contentsObserver.disconnect();
              // 숨김 버튼 DOM에 주입
            }
          }
        });
      }
    }
  });

  contentsObserver.observe(contents, { childList: true });
};
