export const getDomain = url => {
  //  Create an anchor element (note: no need to append this element to the document)
  const anchor = document.createElement("a");
  //  Set href to any path
  anchor.setAttribute("href", url);
  return anchor.hostname;
};
