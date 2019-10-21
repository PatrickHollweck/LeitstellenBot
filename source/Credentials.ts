import * as fs from "fs";

export class Credentials {
  public email: string;
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  static async fromFile(path: string) {
    const content = await fs.promises.readFile(path);
    const json = JSON.parse(content.toString());

    return new Credentials(json.email, json.password);
  }
}
