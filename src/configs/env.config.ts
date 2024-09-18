import { IEnvConfig } from "../interfaces";

const ENV = (import.meta.env.NODE_ENV as string) || "development";

export const envConfig: IEnvConfig = {
  test: ENV === "test",
  dev: ENV === "development",
  prod: ENV === "production",
};
