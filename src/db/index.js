import mongoose from "mongoose";

const dbConnection = async () => {
  await mongoose
    .connect(`${process.env.MONGODB_CONNECTION_STRING}/${process.env.DB_NAME}`)
    .then(() => {
      console.log(`Connection to DB Successful`);
    })
    .catch((err) => {
      console.log(`Failed to connect to DB`);
      throw err;
    });
};

export { dbConnection };
