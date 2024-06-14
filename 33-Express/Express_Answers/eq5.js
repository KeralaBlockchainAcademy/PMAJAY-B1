const express = require('express');
const app = express();

const rateLimit = {};

const rateLimitMiddleware = (req, res, next) => {
  const userIp = req.ip;
  if (!rateLimit[userIp]) {
    rateLimit[userIp] = { count: 1, startTime: Date.now() };
  } else {
    const timeElapsed = Date.now() - rateLimit[userIp].startTime;
    if (timeElapsed > 60000) {
      rateLimit[userIp] = { count: 1, startTime: Date.now() };
    } else {
      rateLimit[userIp].count += 1;
      if (rateLimit[userIp].count > 5) {
        return res.status(429).send('Too many requests');
      }
    }
  }
  next();
};

app.use(rateLimitMiddleware);

app.get('/api', (req, res) => {
  res.send('API response');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
