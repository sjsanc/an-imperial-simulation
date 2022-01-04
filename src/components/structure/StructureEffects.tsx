import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Structure } from "../../classes/Structure";
import { useGameEngine } from "../../hooks/useGameEngine";
import { useStore } from "../../store/store";
import { EffectReference, Parcel } from "../../types/types";
import LabelledGrid from "../common/LabelledGrid";
import Tippy from "@tippyjs/react/headless";
import ResourceTooltip from "../tooltips/ResourceTooltip";
import { Effect } from "../../classes/Effect";
import { get } from "lodash/fp";
import * as _ from "lodash";

export default function StructureEffects({ str }: { str: Structure }) {
  const { state, dispatch } = useStore();
  const actions = useGameEngine();

  const PassiveDisplay = ({ effectRef, str }: { effectRef: EffectReference; str: Structure }) => {
    let inject = (str: string, obj: any) => str.replace(/\{{(.*?)}}/g, (x, g) => obj[g]);

    if (!effectRef) return null;
    const effect: Effect = state.getDatum("effects", effectRef.name);
    const clone = _.clone(effectRef);

    if (effectRef.multipliers.length > 0) {
      effectRef.multipliers.forEach((mult) => {
        const value = get(mult, state.data);
        if (value !== 0) clone.amount = clone.amount * value;
      });
    }

    const html = inject(effect.message, { ...[clone.amount] });

    if (effectRef.amount !== 0) {
      return React.createElement("p", { dangerouslySetInnerHTML: { __html: html } });
    } else {
      return null;
    }
  };

  const ParcelDisplay = ({
    parcel,
    type,
  }: {
    parcel: Parcel;
    type: "consumption" | "production";
  }) => {
    const res = state.getDatum("resources", parcel[0]);
    if (res)
      return (
        <Tippy placement="bottom" render={(attrs) => <ResourceTooltip {...attrs} res={res} />}>
          <div
            className={[type === "consumption" ? "decrease" : "increase", "productionEntry"].join(
              " "
            )}>
            <img alt={res.name} src={`/assets/icons/ICON_${res.iconPath}.png`} />
            {parcel[1]}/s
          </div>
        </Tippy>
      );
    else return <div>{parcel[0]}</div>;
  };

  console.log(str);

  return (
    <Wrapper>
      <LabelledGrid label="passive effects" className="passive">
        {str.builtCount > 0 &&
          str.effects.map((eff: EffectReference, i: number) => (
            <PassiveDisplay effectRef={eff} key={i} str={str} />
          ))}
      </LabelledGrid>
      <LabelledGrid label="consumption" className="consumption">
        {str.productionReport !== []
          ? str.productionReport.consumption.map((res: Parcel, i: number) => (
              <ParcelDisplay parcel={res} type={"consumption"} />
            ))
          : null}
      </LabelledGrid>
      <LabelledGrid label="production" className="production">
        {str.productionReport !== []
          ? str.productionReport.production.map((res: Parcel, i: number) => (
              <ParcelDisplay parcel={res} type={"production"} />
            ))
          : null}
      </LabelledGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${tw`grid gap-1 h-full`}
  grid-template-columns: repeat(3, 1fr);
  > div {
    ${tw`bg-gray-100 rounded p-1`}
  }

  .passive {
    p {
      font-size: 11px;
    }
    span {
      ${tw`font-bold`}
    }
  }

  .productionEntry {
    img {
      height: 16px;
      width: 16px;
      ${tw`mr-1`}
    }
    ${tw`inline-flex rounded items-center font-medium p-1 flex-wrap`}
    font-size: 11px;
    &:hover {
      ${tw`bg-gray-200`}
    }
  }
`;
