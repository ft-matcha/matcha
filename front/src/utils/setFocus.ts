const setFocus = <T extends HTMLElement>(components: T) => {
  for (const input of components.querySelectorAll('input') || []) {
    if (input) {
      if (input.value === '') {
        input.focus();
        return true;
      }
    }
  }
  return false;
};

export default setFocus;
