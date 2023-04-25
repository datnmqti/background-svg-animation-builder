import { useCallback, useEffect, useMemo, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { AnimatePresence, Reorder } from "framer-motion";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Layout from "./layout";
import SettingPanel from "./components/SettingPanel";
import ShapePreviewItem from "./components/ShapePreviewItem";
import StyledDropzone from "./components/StyledDropzone";
import DefaultShape1 from "./animation-shapes/shape1";
import DefaultShape2 from "./animation-shapes/shape2";
import DefaultShape3 from "./animation-shapes/shape3";
import CodeViewer from "./components/CodeViewer";
import Modal from "./components/Modal";
import { Settings } from "./types/Settings";
import formatCode from "./utils/formatCode";
import { createBlobPreview } from "./utils/createBlobPreview";

const AreaDivider = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 30px auto 0;
  padding: 0 50px;
`;

const Preview = styled.div`
  width: 90%;
  margin: 0 auto;
  background-color: #c4c4c4;
  border-radius: 4px;
  border: 3px solid #818181;
`;

const ShapePreview = styled.div`
  display: flex;
  padding: 20px;
  background-color: #dfb5b5;
`;

const PreviewList = styled(Reorder.Group)`
  display: flex;
  margin: 0 -15px;
  list-style: none;
`;

const ImageContainer = styled.div`
  margin: 0 auto;
  width: 500px;
  height: 500px;
  text-align: center;
  overflow: hidden;
  clip-path: url(#clipPath);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CodeBlock = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 25px;
  }
`;

const CodeName = styled.p`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
`;

type ShapeType = {
  id: string;
  shape: string;
};

const defaultShapeFiles: ShapeType[] = [
  {
    id: "1",
    shape: DefaultShape1,
  },
  {
    id: "2",
    shape: DefaultShape2,
  },
  {
    id: "3",
    shape: DefaultShape3,
  },
];

const CSS_CODE = `
  .bound {
    clip-path: url(#clipPath);
  }
`;

function App() {
  const [svgViewBoxSize, setSVGViewBoxSize] = useState({
    width: 0,
    height: 0,
  });
  const [settings, setSettings] = useState<Settings>({
    duration: 4,
    repeatCount: true,
    viewBox: {
      x: 0,
      y: 0,
      width: 500,
      height: 500,
    },
  });
  const [stringSvgFiles, setStringSvgFiles] =
    useState<ShapeType[]>(defaultShapeFiles);
  const [shapes, setShapes] = useState<string[]>([]);

  const [image] = useState(
    "https://www.wildlifearchives.com/wp-content/uploads/2016/09/landscape-vietnam-1474137809n4g8k-1280x853.jpg"
  );

  const handleDurationChange = (value: number) => {
    setSettings((prev) => ({ ...prev, duration: value }));
  };

  const handleLoopChange = (value: boolean | number) => {
    setSettings((prev) => ({
      ...prev,
      repeatCount:
        typeof value === "boolean" && value === false ? Number(value) : value,
    }));
  };

  const handleFilesUploadChange = useCallback((files: string[]) => {
    const newData = files.map((file) => ({
      id: nanoid(),
      shape: file,
    }));

    setStringSvgFiles((prev) => [...prev, ...newData]);
  }, []);

  const handleShapeRemove = (idx: number) => {
    setStringSvgFiles((prevData) => {
      const newData = [...prevData];
      newData.splice(idx, 1);
      return newData;
    });
  };

  const getDValuesFrom = (svgFiles: ShapeType[]) => {
    const result: string[] = [];
    svgFiles.forEach((item, idx) => {
      // TODO: Reseach this, when move this regex out loop, it doesn't work as expected
      const dValueRegx = /d=(?:"|')(.*[Z|z])(?:"|')/g;
      const matches = dValueRegx.exec(item.shape);

      if (matches && matches[1]) {
        result.push(matches[1]);
      }
    });

    return result;
  };

  const values = useMemo(() => {
    const withEndShape = [...shapes, shapes[0]];
    return withEndShape.join(";");
  }, [shapes]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [htmlCode, setHtmlCode] = useState("");
  const handleExport = () => {
    const data = document.querySelector("#preview")?.innerHTML;

    const htmlRaw = formatCode(`
      ${ReactDOMServer.renderToString(renderSVG(settings))}

      <div class="bound">
        <img src="[REPLACE_IMAGE_URL]" alt="" />
      </div>
    `);
    if (data) setHtmlCode(htmlRaw);
    handleOpen();
  };

  useEffect(() => {
    const dValues = getDValuesFrom(stringSvgFiles);
    setShapes(dValues);

    const regx = /viewBox="([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)"/;
    const firstItem = stringSvgFiles[0];
    if (firstItem) {
      const matches = regx.exec(firstItem.shape);
      if (matches) {
        setSVGViewBoxSize({
          width: Number(matches[3]),
          height: Number(matches[4]),
        });
      }
    }
  }, [stringSvgFiles]);

  const renderSVG = (settings: Settings) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`${settings.viewBox.x} ${settings.viewBox.y} ${settings.viewBox.width} ${settings.viewBox.height}`}
        width="0"
        height="0"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <clipPath id="clipPath" clipPathUnits="objectBoundingBox">
          <path
            transform={`scale(${1 / svgViewBoxSize.width}, ${
              1 / svgViewBoxSize.height
            })`}
            d={shapes[0]}
          >
            <animate
              attributeType="XML"
              attributeName="d"
              repeatCount={
                settings.repeatCount === true
                  ? "indefinite"
                  : Number(settings.repeatCount)
              }
              dur={settings.duration}
              keySplines="0.9 0.0 0.9 1.0"
              values={values}
            ></animate>
          </path>
        </clipPath>
      </svg>
    );
  };

  return (
    <Layout onExport={handleExport}>
      <ShapePreview>
        <PreviewList
          axis="x"
          values={stringSvgFiles}
          onReorder={setStringSvgFiles}
        >
          <AnimatePresence initial={false}>
            {stringSvgFiles && stringSvgFiles.length
              ? stringSvgFiles.map((shapeItem: ShapeType, idx) => {
                  return (
                    <Reorder.Item
                      key={shapeItem.id}
                      value={shapeItem.shape}
                      whileDrag={{ backgroundColor: "#eee" }}
                    >
                      <ShapePreviewItem
                        image={createBlobPreview(shapeItem.shape)}
                        onRemove={() => handleShapeRemove(idx)}
                      />
                    </Reorder.Item>
                  );
                })
              : null}
          </AnimatePresence>
        </PreviewList>
        <StyledDropzone onChange={handleFilesUploadChange} />
      </ShapePreview>
      <AreaDivider>
        <SettingPanel
          svgViewBoxSize={svgViewBoxSize}
          settings={settings}
          onDurationChange={handleDurationChange}
          onLoopChange={handleLoopChange}
        />
        <Preview id="preview">
          {values ? renderSVG(settings) : null}

          <ImageContainer>
            <Image src={image} alt="" />
          </ImageContainer>
        </Preview>
      </AreaDivider>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <CodeBlock>
          <CodeName>CSS Code: </CodeName>
          <CodeViewer code={formatCode(CSS_CODE)} language="css" />
        </CodeBlock>

        <CodeBlock>
          <CodeName>HTML Code: </CodeName>
          <CodeViewer code={htmlCode} language="html" />
        </CodeBlock>
      </Modal>
    </Layout>
  );
}

export default App;
