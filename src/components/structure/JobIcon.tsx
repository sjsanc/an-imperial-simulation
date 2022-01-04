import Tippy from "@tippyjs/react/headless";
import React from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { useGameEngine } from "../../hooks/useGameEngine";
import { Job } from "../../classes/Job";
import { useStore } from "../../store/store";
import JobTooltip from "../tooltips/JobTooltip";

export default function JobIcon({ job }: { job: Job | "x" }) {
  const actions = useGameEngine();

  if (job === "x") return <EmptyIcon />;
  else
    return (
      <Tippy placement="bottom" render={(attrs) => <JobTooltip {...attrs} job={job} />}>
        <Wrapper
          insufficient={job.insufficient}
          active={job.workers > 0}
          onMouseDown={(e) => actions.setWorkers(job, 1, e)}>
          {job.initials}
          {job.workers > 0 && <div className="workers">{job.workers}</div>}
        </Wrapper>
      </Tippy>
    );
}

const Wrapper = styled.div<{ insufficient; active }>`
  aspect-ratio: 1;
  ${tw`bg-gray-300 rounded flex items-center justify-center cursor-pointer relative`};
  .workers {
    bottom: 0;
    right: 0;
    font-size: 12px;
    padding: 1px 3px;
    ${tw`bg-gray-600 text-white rounded absolute`}
  }

  ${({ insufficient }) =>
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
    `}
`;

const EmptyIcon = styled.div`
  aspect-ratio: 1;
  ${tw`bg-gray-200 rounded`}
`;
