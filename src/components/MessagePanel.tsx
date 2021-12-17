import React from "react";
import styled from "styled-components";

export default function MessagePanel() {
  return <Wrapper></Wrapper>;
}

const Wrapper = styled.div`
  width: 250px;
  padding: 6px;
  height: 100%;
  background: white;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
  position: absolute;
  right: 0;
  top: 0;
`;
