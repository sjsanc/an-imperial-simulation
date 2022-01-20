import React from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import Tippy from "@tippyjs/react/headless";
import LabelTooltip from "../tooltips/LabelTooltip";

interface ViewProps extends React.ComponentPropsWithoutRef<"div"> {
  active: boolean;
  label?: string;
  bg?: string;
}

export const ViewIcon: React.FC<ViewProps> = (props) => {
  return (
    <Tippy
      placement="bottom"
      render={(attrs) => props.label && <LabelTooltip {...attrs}>{props.label}</LabelTooltip>}>
      <Icon active={props.active} bg={props.bg} {...props} className="view-icon">
        {props.children}
      </Icon>
    </Tippy>
  );
};

const Icon = styled.div<{ active; bg }>`
  ${(props) =>
    props.active && !props.bg
      ? css`
          ${tw`bg-gray-200`}
        `
      : ""}
  background: ${(props) =>
    props.active && props.bg
      ? props.bg
      : props.active && !props.bg
      ? css`
          ${tw`bg-gray-200`}
        `
      : ""}
`;

export default ViewIcon;
