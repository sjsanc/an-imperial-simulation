import Tippy from "@tippyjs/react/headless";
import React from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { useGameEngine } from "../../hooks/useGameEngine";
import { Job } from "../../classes/Job";
import { useStore } from "../../store/store";
import JobTooltip from "../tooltips/JobTooltip";
import { Upgrade } from "../../classes/Upgrade";

export default function UpgradeIcon({ upg }: { upg: Upgrade | "x" }) {
  const actions = useGameEngine();

  if (upg === "x") return <EmptyIcon />;
  else
    return (
      <Tippy placement="bottom" render={(attrs) => <div>{upg.name}</div>}>
        <Wrapper onClick={() => actions.build(upg, 1)} built={upg.builtCount > 0}>
          {upg.initials}
        </Wrapper>
      </Tippy>
    );
}

const Wrapper = styled.div<{ built }>`
  aspect-ratio: 1;
  ${tw`bg-gray-300 rounded flex items-center justify-center cursor-pointer`};
  ${({ built }) =>
    built &&
    css`
      border: 2px solid gray;
      /* box-shadow: 0 0 3px #ff7542; */ */
    `}
`;

const EmptyIcon = styled.div`
  aspect-ratio: 1;
  ${tw`bg-gray-200 rounded`}
`;
