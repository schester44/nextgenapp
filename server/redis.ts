import Redis from "ioredis";

type Config = {
  port: number;
  host: any;
  password: string;
};

const config: Config = {
  port: parseInt(process.env.REDIS_PORT as string, 10),
  host: process.env.REDIS_URL as string,
  password: process.env.REDIS_PASSWORD as string,
};

export const createRedis = (): Redis.Redis => new Redis(config);
