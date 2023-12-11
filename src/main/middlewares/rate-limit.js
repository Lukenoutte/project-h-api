import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
  max: 100, // max requests
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: "You have touched the maximum limit of request.",
});

export default limiter;
