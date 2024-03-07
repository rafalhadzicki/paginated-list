const setParams = (
  searchParams: URLSearchParams,
  param: string,
  value?: string
) => {
  if (!value) {
    searchParams.delete(param);
    window.history.pushState({}, '', '?' + searchParams.toString());
    return;
  }
  searchParams.set(param, value);
  window.history.pushState({}, '', '?' + searchParams.toString());
};

export default setParams;
