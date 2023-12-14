import { rateLimit } from "express-rate-limit";

export default rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: "You have touched the maximum limit of request.",
});
