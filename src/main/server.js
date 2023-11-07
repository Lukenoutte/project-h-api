import PostgreHelper from "../infra/helpers/postgre-helper";
import app from "./config/app";
import logger from "./config/logger";
import { postgreUrl, serverPort } from "./config/env";

function execute() {
  const postgreHelper = new PostgreHelper();
  postgreHelper
    .connect(postgreUrl)
    .then(() => {
      app.listen(serverPort, () => {
        logger.info(`Server running at http://localhost:${serverPort}`);
      });
    })
    .catch((err) => {
      logger.info(err);
    });
}

execute();
