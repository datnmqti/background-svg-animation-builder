import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import styled from "styled-components";
import { hasOnePath } from "../utils/validator";

type ColorProps = {
  isDragAccept: boolean;
  isDragReject: boolean;
  isFocused: boolean;
};

const getColor = (props: ColorProps) => {
  if (props.isDragAccept) {
    return "green";
  }
  if (props.isDragReject) {
    return "red";
  }
  if (props.isFocused) {
    return "blue";
  }
  return "#eee";
};

type ContainerProps = {
  isDragAccept: boolean;
  isDragReject: boolean;
  isFocused: boolean;
};

const Dropzone = styled.div<ContainerProps>`
  border-color: ${(props) => getColor(props)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
  padding: 5px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  color: #000;
  outline: none;
  transition: border 0.24s ease-in-out;
  text-align: center;
  cursor: pointer;
  width: 100px;
  height: 100px;
`;

interface Props {
  onChange: (data: any) => void;
}

const StyledDropzone = ({ onChange }: Props) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const promises = acceptedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const svgString = e.target?.result;
          if (hasOnePath(svgString as string)) {
            resolve(svgString);
          } else {
            toast.error(`SVG file should have one <path> tag`, {
              role: "e",
            });
            reject();
          }
        };

        reader.readAsText(file);
      });
    });
    onChange(await Promise.all(promises));
    toast.success("Upload file(s) successfully");
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "image/svg": [".svg"] },
      onDrop: onDrop,
    });

  return (
    <Dropzone {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      <p>
        Drag 'n' Drop to upload SVG files <br /> or click to select files
      </p>
    </Dropzone>
  );
};

export default StyledDropzone;
