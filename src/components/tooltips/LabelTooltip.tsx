import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

export default function LabelTooltip(props: any) {
  return <Tooltip>{props.children}</Tooltip>;
}

const Tooltip = styled.div`
  ${tw`p-2 bg-gray-600 text-white rounded`}
  font-size: 10px;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: -3px;
    right: 0;
    left: 0;
    margin: 0 auto;
    height: 7px;
    width: 7px;
    background: red;
    transform: rotate(45deg);
    ${tw`bg-gray-600`}
  }
`;
