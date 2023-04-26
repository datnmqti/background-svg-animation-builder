import styled from "styled-components";
import ControlItem from "./common/ControlItem";
import Label from "./common/Label";
import Input from "./common/Input";
import SliderBar from "./common/Slidebar";
import Checkbox from "./common/Checkbox";
import { CiSettings } from "react-icons/ci";
import { Settings } from "../types/Settings";

const Container = styled.div`
  width: 350px;
  min-width: 200px;
  margin-right: 25px;
  border: 3px solid #818181;
  border-radius: 4px;
`;

const PanelTitle = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  background: #d4d4d4;
  padding: 10px 20px;
  border-bottom: 1px solid #c9c9c9;
`;

const PanelTitleIcon = styled.i`
  margin-right: 4px;
  line-height: 0;
`;

const PanelContent = styled.div`
  padding: 10px 10px;
`;

interface Props {
  settings: Settings;
  svgViewBoxSize: { width: number; height: number };
  onDurationChange: (value: number) => void;
  onLoopChange: (value: boolean | number) => void;
}

const SettingPanel: React.FC<Props> = ({
  settings,
  svgViewBoxSize,
  onDurationChange,
  onLoopChange,
}) => {
  return (
    <Container>
      <PanelTitle>
        <PanelTitleIcon>
          <CiSettings />
        </PanelTitleIcon>
        Settings
      </PanelTitle>
      <PanelContent>
        {/* <ControlItem>
          <Label>Viewbox Width</Label>
          <Input type="number" disabled={true} value={settings.viewBox.width} />
        </ControlItem>
        <ControlItem>
          <Label>Viewbox Height</Label>
          <Input
            type="number"
            disabled={true}
            value={settings.viewBox.height}
          />
        </ControlItem> */}
        <SliderBar
          min={1}
          max={50}
          step={1}
          value={settings.duration}
          label="Duration (s)"
          onChange={onDurationChange}
        />
        <Checkbox
          label="Loop"
          value={settings.repeatCount}
          onChange={onLoopChange}
        />
        <ControlItem>
          <Label>Scale x</Label>
          <Input
            type="text"
            value={Number(1 / svgViewBoxSize.width).toFixed(8)}
            disabled={true}
          />
        </ControlItem>
        <ControlItem>
          <Label>Scale y</Label>
          <Input
            type="text"
            value={Number(1 / svgViewBoxSize.height).toFixed(8)}
            disabled={true}
          />
        </ControlItem>
      </PanelContent>
    </Container>
  );
};

export default SettingPanel;
