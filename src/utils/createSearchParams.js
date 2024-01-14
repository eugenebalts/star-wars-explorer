const createSearchParams = (params) => {
  const result = { ...params };

  Object.keys(result).forEach((key) => {
    const value = result[key];

    if (!value || (Array.isArray(value) && !value.length)) {
      delete result[key];
    }
  });

  return new URLSearchParams(result);
};

export default createSearchParams;
