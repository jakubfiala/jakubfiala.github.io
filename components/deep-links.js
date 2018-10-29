const openDeepLinked = id => {
  const element = document.getElementById(id);
  if (element && 'open' in element) element.open = true;
};

export { openDeepLinked };
