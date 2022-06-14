import server from "./src/app.js";
import "./src/db.js";

const PORT = 3001;

server.listen(PORT, () => console.log(`server listening at ${PORT}`));
