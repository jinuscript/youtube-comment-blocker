export const getUserName = (body) => {
  const main = body.querySelector("#main");
  const header = main.querySelector("#header");
  const headerAuthor = header.querySelector("#header-author");
  const h3 = headerAuthor.querySelector("h3");

  return h3.textContent.trim();
};
