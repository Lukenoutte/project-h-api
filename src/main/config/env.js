import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const postgreUrl = process.env.POSTGRE_URL;
const serverPort = process.env.PORT || 3000;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export { postgreUrl, serverPort, accessTokenSecret, refreshTokenSecret };
