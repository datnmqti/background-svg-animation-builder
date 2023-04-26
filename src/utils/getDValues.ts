import { ShapeType } from "../types/ShapeType";

const getDValues = (svgFiles: ShapeType[]) => {
  const result: string[] = [];
  svgFiles.forEach((item) => {
    const dValueRegx = /d=(?:"|')(.*[Z|z])(?:"|')/g;
    const matches = dValueRegx.exec(item.shape);

    if (matches && matches[1]) {
      result.push(matches[1]);
    }
  });

  return result;
};

export default getDValues;
