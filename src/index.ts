import { app } from "app";
import chalk from "chalk";
import emoji from "node-emoji";
import { connectToMongoDB } from "infrastructure/database/mongodb/mongoose-connection";
import { envTypeGuards } from "infrastructure/env/env-type-guards";
import { redisWrapper } from "infrastructure/database/redis/redis-client";
import { startCacheMongooseQueries } from "infrastructure/cache/redis-cache-extension";
const boldGreen = chalk.bold.green;

const start = async () => {
  envTypeGuards();
  await connectToMongoDB();
  if (process.env.USING_CACHE === "true") {
    // Connect to Redis
    await redisWrapper.connect(process.env.REDIS_URL!);
    // Start Mongoose cache queries
    await startCacheMongooseQueries();
  }
  const PORT = process.env.PORT;
  app.listen(PORT, () =>
    console.log(
      boldGreen(
        `${emoji.get(
          "white_check_mark"
        )} Express server started on port ${PORT} ${emoji.get("beer")}`
      )
    )
  );
};

start();
