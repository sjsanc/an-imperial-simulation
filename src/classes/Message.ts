export interface MessageProps {
  tick: number;
  body: string;
  type: string;
}

export class Message {
  tick: number = 0;
  body: string = "";
  type: "flavour" = "flavour";
  index: number = 0;

  constructor(props: MessageProps) {
    Object.assign(this, props);
  }
}
