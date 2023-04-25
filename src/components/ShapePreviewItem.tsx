import styled from 'styled-components';
import { CiCircleRemove } from 'react-icons/ci';

const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  opacity: 0;
  transition: opacity 0.15s ease-in, transform 0.15s ease-in;
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    transform: scale(1.2);
  }
`;

const ShapePreviewItemContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  padding: 15px;
  margin: 0 10px;
  border: 2px dashed #333;
  overflow: hidden;
  text-align: center;

  svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${RemoveButton} {
      opacity: 1;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  pointer-events: none;
`;

interface Props {
  image: string;
  fileName?: string;
  onRemove?: () => void;
}

const ShapePreviewItem: React.FC<Props> = ({ image, fileName, onRemove }) => {
  return (
    <ShapePreviewItemContainer>
      <Image src={image} alt="" />
      <RemoveButton onClick={onRemove}>
        <CiCircleRemove />
      </RemoveButton>
      {/* <p>{fileName}</p> */}
    </ShapePreviewItemContainer>
  );
};

export default ShapePreviewItem;
