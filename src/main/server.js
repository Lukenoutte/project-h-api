import app from "./config/app";
import logger from "./config/logger";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});

export default app;
