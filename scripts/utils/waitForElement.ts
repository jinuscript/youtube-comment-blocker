// import { getElementByXPath } from "./getElementByXPath";

// export const waitForElement = () => {
//   const observer = new MutationObserver(() => {
//     console.log("찾는중");

//     // 첫 댓글
//     const commentsContainer = getElementByXPath(
//       "//ytd-comments//ytd-item-section-renderer/div[3]"
//     ) as Element;

//     if (commentsContainer) {
//       waitForElement2();
//       console.log(commentsContainer);
//       observer.disconnect(); // 감시 종료
//     }
//   });

//   observer.observe(document.body, { childList: true, subtree: true });
// };

// const waitForElement2 = () => {
//   const observer = new MutationObserver(() => {
//     const commentsContainer = getElementByXPath(
//       "//ytd-comments//ytd-item-section-renderer/div[3]"
//     ) as Element;

//     // 첫 댓글
//     const comments = commentsContainer.querySelectorAll(
//       "ytd-comment-thread-renderer"
//     );

//     if (comments && comments.length > 0) {
//       console.log(comments);

//       observer.disconnect();
//       console.log("옵저버로 발견!");
//     }
//   });

//   observer.observe(document.body, { childList: true, subtree: true });
// };

import { getElementByXPath } from "./getElementByXPath";

export const waitForElement = () => {
  let lastCount = 0;
  let timeoutId: number | null = null;

  const observer = new MutationObserver(() => {
    const commentsContainer = getElementByXPath(
      "//ytd-comments//ytd-item-section-renderer/div[3]"
    ) as Element;

    if (!commentsContainer) return;

    const comments = commentsContainer.querySelectorAll(
      "ytd-comment-thread-renderer"
    );

    // If new comments appeared
    if (comments.length !== lastCount) {
      console.log(`Found ${comments.length} comments`);
      lastCount = comments.length;

      // Reset the debounce timer
      if (timeoutId) clearTimeout(timeoutId);

      // Wait for 1s of no new comments before stopping observation
      timeoutId = window.setTimeout(() => {
        console.log("No new comments detected — stopping observer.");
        observer.disconnect();
      }, 1000);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};
