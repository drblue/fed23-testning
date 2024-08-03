import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		baseUrl: "https://fed22-firebase-todos.netlify.app",
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
