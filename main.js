import App from "./src/App";
import { version } from "./manifest.chromium.json";

const app = new App();
app.setVersion(version);

// npm run push --message="README is updated."
