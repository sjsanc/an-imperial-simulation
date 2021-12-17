import React from "react";
import styled from "styled-components";

export default function ResourcePanel() {
  return (
    <Wrapper>
      <Header>Resources</Header>
      <Grid>
        <ResourceItem />
        <ResourceItem />
        <ResourceItem />
        <ResourceItem />
        <ResourceItem />
        <ResourceItem />
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 250px;
  padding: 6px;
  height: 100%;
  background: white;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
`;

const Header = styled.p`
  font-size: 20px;
  text-align: center;
  width: 100%;
  color: #292929;
  margin-bottom: 6px;
  font-weight: bold;
  padding: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
`;

const ResourceItem = styled.div`
  aspect-ratio: 1;
  width: 100%;
  border-radius: 3px;
  background: ${({ theme: { colors } }) => colors.lgray};

  &:hover {
    cursor: pointer;
    background: ${({ theme: { colors } }) => colors.grey};
  }
`;
