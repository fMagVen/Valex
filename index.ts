import app from "./app.js"
import "dotenv/config"

app.listen(process.env.PORT, () => {
	console.log("Server is listening on port " + process.env.PORT);
  });