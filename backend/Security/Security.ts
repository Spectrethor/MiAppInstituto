import bcryptjs from "bcryptjs";

export default class Security {
  public static async Encription(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
  }

  public static async Description(
    password: string,
    hash: string
  ): Promise<boolean> {
    const coninciden = await bcryptjs.compare(password, hash);
    if (coninciden) {
      return true;
    } else {
      return false;
    }
  }
}
