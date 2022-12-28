import app from "./server";

import config from "./config";

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Hello on http://localhost:${PORT}`);
});
