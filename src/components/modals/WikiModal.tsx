import React from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { useGameEngine } from "../../hooks/useGameEngine";
import { useStore } from "../../store/store";
import ModalWrapper from "./ModalWrapper";

export default function WikiModal() {
  // const { state } = useStore();
  const actions = useGameEngine();

  return (
    <Wrapper>
      <ModalWrapper title="wiki">Hi</ModalWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
