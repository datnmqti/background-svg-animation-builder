export const createBlobPreview = (str: string): string => {
  const blob = new Blob([str], { type: "image/svg+xml" });
  const preview = URL.createObjectURL(blob);
  return preview;
};
