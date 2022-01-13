import React from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import Tippy from "@tippyjs/react/headless";
import LabelTooltip from "../tooltips/LabelTooltip";

interface ViewProps extends React.ComponentPropsWithoutRef<"div"> {
  active: boolean;
  label: string;
}

export const ViewIcon: React.FC<ViewProps> = (props) => {
  return (
    <Tippy
      placement="bottom"
      render={(attrs) => <LabelTooltip {...attrs}>{props.label}</LabelTooltip>}>
      <Icon active={props.active} {...props}>
        {props.children}
      </Icon>
    </Tippy>
  );
};

const Icon = styled.div<{ active }>`
  ${(props) =>
    props.active
      ? css`
          ${tw`bg-gray-200`}
        `
      : ""}
`;

export default ViewIcon;
