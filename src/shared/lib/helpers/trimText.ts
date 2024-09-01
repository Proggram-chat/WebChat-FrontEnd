export const trimText = (text: string, max: number) => {
  return text.length >= max ? text.slice(0, max) + '...' : text;
};
