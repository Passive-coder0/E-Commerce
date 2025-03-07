import Redis from "ioredis"
import dotenv from "dotenv"

//Configure Redis

dotenv.config()

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);
