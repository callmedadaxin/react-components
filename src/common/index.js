export const nfn = () => {};

export const getJson = obj => {
  try {
    return JSON.parse(obj);
  } catch (e) {
    return {};
  }
};

export const stringfy = obj => {
  try {
    return JSON.stringfy(obj);
  } catch (e) {
    return "";
  }
};
