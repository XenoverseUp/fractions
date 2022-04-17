const safe = dangerousData => {
  return dangerousData ?? 0;
};

export default safe;
