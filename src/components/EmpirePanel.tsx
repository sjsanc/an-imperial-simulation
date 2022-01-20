import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useStore } from "../store/store";

const EMPIRE_DETAILS = [
  {
    name: "fertility",
    desc: "Determines the growth rate of your empire. Affected by magic, your policies or simply by the people's quality of life.",
  },
  {
    name: "sanitation",
    desc: "Indicates how clean your empire is. Impacts the health and happiness of your people, and the likelihood of plagues.",
  },
  {
    name: "loyalty",
    desc: "Determines the loyalty of your citizens, affecting the moral of your soldiers, and their resilience to bribes.",
  },
  {
    name: "piety",
    desc: "Measures your people's faith to the patron cult of your empire, affecting the boons (or punishments) that such worships awards you.",
  },
  {
    name: "constitution",
    desc: "Dictates the health and hardiness of your people, and crucially, your soldiers. Affected by factors such as diet, illness and sanitation",
  },
  {
    name: "learnedness",
    desc: "The overall standard of education for your people. A learned empire produces legendary heroes, and builds great wonders.",
  },
];

// Settlement levels are determined by overall value
const SETTLEMENT_LEVELS = [
  "pathetic",
  "meagre",
  "unremarkable",
  "promising",
  "impressive",
  "grandiose",
  "legendary",
  "mythic",
];

export default function EmpirePanel() {
  const { state } = useStore();

  return (
    <Wrapper>
      <div>
        <h1>{state.config.empireName}</h1>
        <h2>{SETTLEMENT_LEVELS[state.state.empire.secondary.settlementLevel]}</h2>
      </div>
      <div className="stat-wrapper">
        <h3>Imperial Attributes</h3>
        <p>These are the most important metrics about your Empire. Keep an eye on them.</p>
        <div>
          {EMPIRE_DETAILS.map((stat, i) => (
            <div key={i} className="stat">
              <h2>{state.state.empire.primary[stat.name]}</h2>
              <div>
                <h4>{stat.name}</h4>
                <p>{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${tw`flex flex-col items-center`}

  > div {
    ${tw`text-center`}

    h2 {
    }
  }

  .stat-wrapper {
    ${tw`text-center`}
    > div {
      ${tw`flex flex-wrap items-center justify-center`}
    }
  }

  .stat {
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
      0px 1px 3px 0px rgb(0 0 0 / 12%);
    ${tw`bg-white rounded p-2 flex m-1`}
    width: 320px;

    p {
      font-size: 11px;
    }

    h4 {
      ${tw`m-0`}
    }

    h2 {
      height: 60px;
      aspect-ratio: 1;
      ${tw`bg-gray-200 rounded flex items-center justify-center mr-1 mt-0`}
    }
  }
`;
