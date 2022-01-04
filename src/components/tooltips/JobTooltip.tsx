import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Job } from "../../classes/Job";

export default function JobTooltip({ job }: { job: Job }) {
  return (
    <Wrapper>
      <label>JOB</label>
      <h4>{job.name}</h4>
      <p>{job.description}</p>
      <p>
        Consumes{" "}
        {job.costs.map(function (cost, i) {
          return <span key={i}>{(i ? ", " : "") + cost[0]} </span>;
        })}
      </p>
      <p>
        Produces{" "}
        {job.product.map(function (prod, i) {
          return <span key={i}>{(i ? ", " : "") + prod[0]} </span>;
        })}
      </p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
  ${tw`p-2 rounded bg-white flex flex-col items-center`}
  width: 110px;

  label {
    ${tw`text-gray-500 font-medium uppercase flex`}
    font-size: 9px;
  }

  h3 {
    ${tw`text-center`}
  }
  p {
    font-size: 11px;
  }
`;
