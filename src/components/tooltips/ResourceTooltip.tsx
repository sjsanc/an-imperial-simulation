import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Resource } from "../../classes/Resource";

export default function ResourceTooltip({ res }: { res: Resource }) {
  return (
    <Wrapper>
      <img src={`/assets/icons/ICON_${res.iconPath}.png`} alt={res.name} />
      <h3>{res.name}</h3>
      <label>{res.resourceType.replace("_", " ")}</label>
      {" ~ "}
      <p>{res.description}</p>
      {" ~ "}
      <label>Amount: {res.amount}</label>
      <label>Value: {res.value}</label>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
  ${tw`py-2 px-4 bg-white text-center flex flex-col items-center`}
  width: 150px;

  img {
    height: 16px;
    width: 16px;
  }

  h3 {
    ${tw`m-0`}
  }

  label {
    ${tw`text-gray-500 font-medium uppercase mb-1`}
    font-size: 9px;
  }

  p {
    font-size: 11px;
    font-style: italic;
  }
`;
