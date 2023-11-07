import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const postgreUrl = process.env.POSTGRE_URL;
const serverPort = process.env.PORT || 3000;

export { postgreUrl, serverPort };

export default { postgreUrl, serverPort };
