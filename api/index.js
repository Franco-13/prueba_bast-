import server from "./src/app.js";
import "./src/db.js";

server.listen(process.env.PORT, () =>
  console.log(`server listening at ${process.env.PORT}`)
);
