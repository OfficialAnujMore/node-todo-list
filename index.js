import dotenv from "dotenv";
import app  from "./app.js";
import { dbConnection } from "./src/db/index.js";

dotenv.config({ path: ".env" });

dbConnection()
  .then((res) => {
    app.listen(process.env.PORT, () => {
      console.log(`App running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Failed to start the server ${err}`);
  });
