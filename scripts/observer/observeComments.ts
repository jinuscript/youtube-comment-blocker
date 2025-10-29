import { observeContents } from "./observerContents";

export const observeComments = () => {
  // 1. 댓글 영역 감지
  const comments = document.querySelector("#comments");

  if (comments) {
    const commentsObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "childList" && m.addedNodes.length > 0) {
          m.addedNodes.forEach((node) => {
            if (node.id === "sections") {
              const sections = comments.querySelector("#sections");
              const contents = sections.querySelector("#contents");

              if (contents) {
                // commentsObserver.disconnect();
                observeContents();
              }
            }
          });
        }
      }
    });

    // childList - 자식의 추가/삭제를 감시
    // subtree - 감시 범위를 직속 자식 + 모든 후손으로 확장
    // 둘 다 true여야 전체 하위 트리 전체를 감시함
    commentsObserver.observe(comments, { childList: true, subtree: true });
  }
};
