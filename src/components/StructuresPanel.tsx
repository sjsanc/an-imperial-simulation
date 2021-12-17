import styled from "styled-components";
import useStructureActions from "../actions/useStructureActions";
import { getItem } from "../helpers/storeHelpers";
import { useStore } from "../store/store";
import { Structure } from "../classes/Structure";

const StructureDisplay = ({ structure }: { structure: Structure }) => {
  const { buildStructure, destroyStructure, setWorker } = useStructureActions();
  const { state, dispatch } = useStore();

  return (
    <StructureDiv>
      <div className="information">
        <div className="icon" />
        <div>
          <h3>{structure.name}</h3>
          <p>{structure.description}</p>
        </div>
        <div className="count">
          <label>Count</label>
          <h1>{structure.builtCount}</h1>
        </div>
      </div>

      <div className="actions">
        <button
          onClick={() => {
            buildStructure("House");
          }}>
          BUILD ONE
        </button>
        <button
          onClick={() => {
            destroyStructure("House");
          }}>
          DESTROY ONE
        </button>
      </div>

      <div className="details">
        <div>
          <div className="jobs">
            <label>Jobs</label>
            <div>
              {structure.jobNames.map((j, i) => {
                const [jobIndex, job] = getItem(j, state.jobs);
                if (job) {
                  return (
                    <div
                      className="job"
                      key={i}
                      id={job.name}
                      onClick={() => {
                        setWorker(job.name);
                      }}>
                      {job.assignedWorkerCount}
                    </div>
                  );
                } else {
                  throw new ReferenceError(`Unable to render Job Icon with name "${j}"`);
                }
              })}
            </div>
          </div>

          <div className="modules">
            <label>Upgrades</label>
            <div>
              {structure.moduleNames.map((m: string, i: number) => {
                const [moduleIndex, module] = getItem(m, state.modules);
                if (module) {
                  return <div className="module" key={i} onClick={() => console.log("")}></div>;
                }
              })}
            </div>
          </div>
        </div>

        <div className="performance">
          <div className="performance-consuming">
            <label>Consuming</label>
            <div>
              <div className="res-display">
                <i></i>
                <p>22.3/s</p>
              </div>
              <div className="res-display">
                <i></i>
                <p>22.3/s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StructureDiv>
  );
};

export default function StructuresPanel() {
  const { state } = useStore();

  return (
    <Wrapper>
      {state.structures.map((structure, i) => (
        <StructureDisplay key={i} structure={structure} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 6px;

  @media screen and (max-width: 1400px) {
    grid-template-columns: 1fr;
  }
`;

const StructureDiv = styled.div`
  width: 100%;
  min-height: 60px;
  background: white;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);

  label {
    font-size: 10px;
    color: grey;
    font-weight: 500;
    text-transform: uppercase;
  }

  .icon {
    height: 64px;
    width: 64px;
    border-radius: 6px;
    background: ${({ theme: { colors } }) => colors.grey};
  }

  .information {
    display: grid;
    grid-template-columns: 64px auto 64px;
    width: 100%;
    grid-gap: 10px;
    margin-bottom: 10px;
  }

  .actions {
    width: 100%;
    padding: 10px;
    background: #f0f0f0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;

    button {
      border: none;
      padding: 10px;
      margin-left: 5px;
      background: #404040;
      color: white;
      border-radius: 6px;
      cursor: pointer;
    }
  }

  .count {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
  }

  .details {
    display: grid;
    grid-template-columns: 160px auto;
    grid-gap: 10px;
    width: 100%;
  }

  .modules {
    > div {
      display: grid;
      grid-gap: 5px;
      grid-template-columns: repeat(4, 1fr);
    }

    .module {
      aspect-ratio: 1;
      width: 100%;
      cursor: pointer;
      border-radius: 6px;
      background: #e9e9e9;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .jobs {
    margin-bottom: 5px;

    > div {
      display: grid;
      grid-gap: 5px;
      grid-template-columns: repeat(3, 1fr);
    }
    .job {
      aspect-ratio: 1;
      width: 100%;
      cursor: pointer;
      border-radius: 6px;
      background: #e9e9e9;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .performance {
    width: 100%;
    padding: 10px;
    background: #f0f0f0;
    border-radius: 4px;
  }

  .res-display {
    display: inline-flex;
    align-items: flex-end;
    padding: 2px;
    border-radius: 4px;

    &:hover {
      background: #bdbdbd;
    }

    p {
      font-size: 12px;
      font-family: monospace;
    }

    i {
      height: 20px;
      width: 20px;
      border-radius: 4px;
      margin-right: 6px;
      background: #404040;
    }
  }
`;
