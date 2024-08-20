import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const postgreUrl = process.env.DATABASE_URL as string;
const serverPort = process.env.PORT || 3000;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

export { postgreUrl, serverPort, accessTokenSecret, refreshTokenSecret };
