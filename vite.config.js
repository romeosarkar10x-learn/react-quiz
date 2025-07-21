import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import child_process from "child_process";

let repo = process.env?.GITHUB_REPOSITORY?.split("/")?.at(-1);

if (!repo) {
    const branch = child_process.execSync("git branch --show-current").toString().trim();
    const remote = child_process.execSync(`git config --get branch.${branch}.remote`).toString().trim();
    const url = child_process.execSync(`git remote get-url ${remote}`).toString().trim();
    repo = url.split("/").at(-1).split(".").slice(0, -1).join(".");
}

console.log("Base URL:", repo);

export default defineConfig({
    plugins: [react()],
    base: "/" + repo,
});
