import React from "react";
import { useGameEngine } from "../../hooks/useGameEngine";
import { DataClasses } from "../../types/types";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import Tippy from "@tippyjs/react/headless";

interface IconProps extends React.ComponentPropsWithoutRef<"div"> {
  itemData: any | "x";
  count?: number;
  color?: string;
  fontSize?: number;
  tooltip?: any;
  state?: (data: any) => "active" | "warning" | "built";
}

const GameIcon: React.FC<IconProps> = (props) => {
  const actions = useGameEngine();

  function Tooltip() {
    return props.tooltip;
  }

  if (props.itemData === "x") return <EmptyIcon />;
  else {
    let state: string;
    if (typeof props.state === "function") state = props.state(props.itemData);
    return (
      <Tippy placement="bottom" render={(attrs) => props.tooltip && <Tooltip {...attrs} />}>
        <Wrapper fontSize={props.fontSize || 12} {...props}>
          <div className={state}>
            {!props.itemData.iconPath ? (
              props.itemData.initials
            ) : (
              <img
                src={`/assets/icons/ICON_${props.itemData.iconPath}.png`}
                alt={props.itemData.name}
              />
            )}
            {props.count > 0 && <div className="counter">{props.count}</div>}
          </div>
        </Wrapper>
      </Tippy>
    );
  }
};

export default GameIcon;

interface GameIconStyleProps {
  fontSize: number;
}

const Wrapper = styled.div<GameIconStyleProps>`
  aspect-ratio: 1;
  ${tw`bg-gray-300 rounded cursor-pointer relative`};

  .counter {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: ${(props) => props.fontSize + "px"};
    padding: 1px 3px;
    ${tw`bg-gray-600 text-white rounded`};
  }

  > div {
    ${tw`h-full w-full flex items-center justify-center rounded`}
  }

  .active {
    @include state;
    border: 2px solid red;
  }
`;

const EmptyIcon = styled.div`
  aspect-ratio: 1;
  ${tw`bg-gray-200 rounded`}
`;
