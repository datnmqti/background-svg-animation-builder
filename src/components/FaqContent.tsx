import styled from "styled-components";
import { Disclosure } from "@headlessui/react";
import { TbChevronUp } from "react-icons/tb";

const Wrapper = styled.div`
  width: 100%;
  padding: 16px 0 0 4px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 1rem;
  padding: 2px;

  & > * {
    margin-bottom: 1rem;
  }
`;

const Button = styled(Disclosure.Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 0.5rem;
  background-color: #f1f1f1;
  padding: 0.5rem 1rem;
  font-size: 15px;
  font-weight: 500;
  color: #000;

  &:hover {
    background-color: #c3dafe;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #a3bffa;
  }
`;

const Panel = styled(Disclosure.Panel)`
  padding: 0.5rem 1rem;
  font-size: 15px;
  color: #6b7280;
  text-align: left;
`;

const ImageContainer = styled.figure`
  width: 100%;
  margin-top: 20px;

  img {
    width: 100%;
  }
`;

const FAQContent = () => {
  return (
    <Wrapper>
      <Content>
        <Disclosure>
          {({ open }) => (
            <>
              <Button>
                <span>How can I create my own animated shapes?</span>
                <TbChevronUp
                  style={{ transform: open ? "rotate(180deg)" : "none" }}
                />
              </Button>
              <Panel>
                You can create shapes using any software that supports SVG, such
                as Illustrator or Figma. Once you've created your shapes, make
                sure to export them in the same format and size.
                <br />
                <ImageContainer>
                  <img src={require("../images/export-direction.gif")} alt="" />
                </ImageContainer>
              </Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Button>
                <span>Can I change the order of the animated shapes?</span>
                <TbChevronUp
                  style={{ transform: open ? "rotate(180deg)" : "none" }}
                />
              </Button>
              <Panel>
                Yes, you can easily change the order of your animated shapes by
                dragging and dropping them into the desired position.
              </Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Button>
                <span>When I upload new SVG file, it's NOT SMOOTH, why?</span>
                <TbChevronUp
                  style={{ transform: open ? "rotate(180deg)" : "none" }}
                />
              </Button>
              <Panel>
                It can be svg files have not had the same number of anchors or
                you create them in different sofwares.
              </Panel>
            </>
          )}
        </Disclosure>
      </Content>
    </Wrapper>
  );
};

export default FAQContent;
