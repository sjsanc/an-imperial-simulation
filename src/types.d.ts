import store from "../store/store";

export type PreReq = {
  research: string[];
  structures: string[];
  achievments: string[];
};

export type QuantType = {
  name: string;
  amount: number;
};

// ### JOB TYPES ###
export type JobPreType = {
  name: string;
  desc: string;
  cost: QuantType[];
  product: QuantType[];
  parentStructure: string;
  duration: number;
  research: string[];
};

type JobAdditions = {
  completed: number;
  workers: number;
  progress: number;
  insuff: boolean | undefined;
};

export type JobType = JobPreType & JobAdditions;
// ### JOB TYPES ###

// ### RES TYPES ###
type ResAdditions = {
  amount: number;
};

type ResPreType = {
  name: string;
  desc: string;
  category: string;
};

export type ResType = ResPreType & ResAdditions;
// ### RES TYPES ###

// ### STRUCTURE TYPES ###
type StructureType = {
  name: string;
  desc: string;
  type: string;
  amount: number; // for houses etc
  unique: boolean; // if true, only 1 can be built
  available: boolean;
  built: boolean;
  cost: QuantType[];
  prereqs?: PreReq;
  jobs: string[];
};
// ### STRUCTURE TYPES ###

// ### REDUX TYPES ###
export type customDispatch = typeof store.dispatch;
