import PostgreHelper from "../infra/helpers/postgre-helper";
import app from "./config/app";
import logger from "./config/logger";
import { postgreUrl, serverPort } from "./config/env";

async function execute() {
  try {
    await PostgreHelper.connect(postgreUrl);
    app.listen(serverPort, () => {
      logger.info(`Server running at http://localhost:${serverPort}`);
    });
  } catch (error) {
    logger.error(error);
  }
}

execute();
