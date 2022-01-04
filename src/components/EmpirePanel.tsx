import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useStore } from "../store/store";

const EMPIRE_DETAILS = [
  {
    name: "fertility",
    desc: "Fertility determines the natural growth rate of your empire. It can be affected using magic, medicinal policy or simply by providing a good life for your people",
  },
  {
    name: "population capacity",
  },
];

export default function EmpirePanel() {
  const { state } = useStore();

  return (
    <Wrapper>
      {EMPIRE_DETAILS.map((stat) => (
        <div className="stat">
          <div className="value">
            <h2>100</h2>
          </div>
          <h4>{stat.name}</h4>
          <p>{stat.desc}</p>
        </div>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${tw`grid gap-2`}
  grid-template-columns: repeat(5, 1fr);

  @media screen and (max-width: 1500px) {
    grid-template-columns: repeat(3, 1fr);
  }

  .stat {
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
      0px 1px 3px 0px rgb(0 0 0 / 12%);
    ${tw`bg-white rounded p-4 flex flex-col text-center`}

    p {
      font-size: 11px;
      /* ${tw`mx-4`} */
    }

    .value {
      height: 60px;
      width: 60px;
      ${tw`mx-auto bg-gray-200 rounded flex items-center justify-center mb-2`}
    }
  }
`;
