const handled = async (asyncFunc, ...params) => {
  try {
    const res = await asyncFunc(...params);
    return [null, res];
  } catch (error) {
    return [error, null];
  }
};

export default handled;
