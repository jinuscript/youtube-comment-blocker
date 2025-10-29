import { addHiddenUser } from "../storage/addHiddenUser";

export const createHideUserButton = (username: string) => {
  const div = document.createElement("div");
  div.classList.add("hideUserButtonContainer");

  const button = document.createElement("button");
  button.classList.add("hideUserButton");

  const img = document.createElement("img");
  img.src = chrome.runtime.getURL("hide-user.svg");
  img.classList.add("hideUserIcon");

  button.appendChild(img);

  button.addEventListener("click", async (e) => {
    e.stopPropagation();

    const hideUser = confirm(`${username}의 댓글을 숨기겠습니까?`);

    if (hideUser) {
      await addHiddenUser(username);
      const thread = e.target.closest("ytd-comment-thread-renderer");
      if (thread) {
        thread.style.display = "none";
      }
    }
  });

  div.appendChild(button);

  return div;
};
