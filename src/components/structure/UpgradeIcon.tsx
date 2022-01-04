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
      <Tippy placement="bottom" render={(attrs) => <div></div>}>
        <Wrapper
        //   insufficient={job.insufficient}
        //   active={job.workers > 0}
        //   onMouseDown={(e) => actions.setWorkers(job, 1, e)}>
        >
          {/* {job.workers} */}
        </Wrapper>
      </Tippy>
    );
}

const Wrapper = styled.div`
  aspect-ratio: 1;
  ${tw`bg-gray-300 rounded flex items-center justify-center cursor-pointer`};
  /* ${({ insufficient }) =>
    insufficient &&
    css`
      border: 1px solid #ff5314;
      box-shadow: 0 0 3px #ff7542;
    `}
  ${({ active }) =>
    active &&
    css`
      border: 1px solid #dca800;
      box-shadow: 0 0 3px #fff09d;
    `} */
`;

const EmptyIcon = styled.div`
  aspect-ratio: 1;
  ${tw`bg-gray-200 rounded`}
`;
