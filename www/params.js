// See wiki for more details: https://github.com/jinjagit/myUI/wiki

const params = (() => {
  let uiParams = new Map();

  const setUiParam = (id, value) => { uiParams.set(id, value); };
  const getUiParam = (id) => { return uiParams.get(id); };
  const getUiParams = () => { return uiParams; };

  return { setUiParam, getUiParam, getUiParams };
})();

export { params }
