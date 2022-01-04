import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Resource } from "../../classes/Resource";

export default function ResourceTooltip({ res }: { res: Resource }) {
  return (
    <Wrapper>
      <h3>{res.name}</h3>
      <p>{res.description}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
  ${tw`p-2 bg-white`}

  h3 {
    ${tw`text-center`}
  }

  p {
    font-size: 12px;
  }
`;
