import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
console.log("hello from vite config");
console.log(process.env.GITHUB_REPOSITORY);

export default defineConfig({
    plugins: [react()],

    base: process.env.GITHUB_REPOSITORY,
});
