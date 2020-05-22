const openDeepLinked = id => {
  if (id === '') return;
  const element = document.getElementById(id);
  if (element && 'open' in element) element.open = true;
};

export { openDeepLinked };
