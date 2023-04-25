export const hasOnePath = (svgString: string): boolean => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const paths = doc.getElementsByTagName("path");
  return paths.length === 1;
};
