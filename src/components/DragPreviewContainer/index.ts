import styled from "styled-components";

type DragPreviewContainerProps = {
  isHidden?: boolean;
  isPreview?: boolean;
};

const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  opacity: ${(props) => (props.isHidden ? 0 : 1)};
  transform: ${(props) => (props.isPreview ? "rotate(5deg)" : undefined)};
`;

export default DragPreviewContainer;
