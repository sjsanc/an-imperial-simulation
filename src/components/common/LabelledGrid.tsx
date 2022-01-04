import React from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";

export default function LabelledGrid({
  cols = 1,
  label = "",
  className = "",
  children,
}: {
  cols?: number;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Wrapper cols={cols} className={className}>
      <label>{label}</label>
      <div className="labelled-grid">{children}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ cols }>`
  label {
    ${tw`text-gray-500 font-medium uppercase flex mb-1`}
    font-size: 9px;
  }
  > div {
    grid-template-columns: repeat(${(props) => props.cols}, 1fr);
    ${tw`grid`}
  }
`;
