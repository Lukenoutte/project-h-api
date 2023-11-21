import PostgreHelper from "../infra/helpers/postgre-helper";
import app from "./configs/app";
import logger from "./configs/logger";
import { postgreUrl, serverPort } from "./configs/env";

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
