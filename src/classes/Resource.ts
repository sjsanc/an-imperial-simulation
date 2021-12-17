export class Resource {
  name: string = "";
  description: string = "";
  amount: number = 0;

  constructor(init: Partial<Resource>) {
    Object.assign(this, init);
  }
}
