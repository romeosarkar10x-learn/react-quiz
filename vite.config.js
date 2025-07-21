import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
const REPO_NAME = process.env.GITHUB_REPOSITORY.split("/").at(-1);
console.log("REPO_NAME:", REPO_NAME);

export default defineConfig({
    plugins: [react()],

    base: process.env.GITHUB_REPOSITORY,
});
