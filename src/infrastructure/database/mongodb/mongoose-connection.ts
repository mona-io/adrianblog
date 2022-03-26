import { connect } from "mongoose";
import emoji from "node-emoji";
import chalk from "chalk";
import { DatabaseConnectionError } from "infrastructure/errors/database-connection-error";

const boldGreen = chalk.bold.green;

export const connectToMongoDB = async () => {
  try {
    await connect(process.env.DB_HOST!);
    console.log(
      boldGreen(
        `${emoji.get("white_check_mark")} Connected to MongoDB ${emoji.get(
          "cocktail"
        )}`
      )
    );
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};
