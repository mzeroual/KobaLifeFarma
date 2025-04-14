const { execSync } = require("child_process")
const path = require("path")
const fs = require("fs")

// Install required packages
console.log("Installing bundle analyzer...")
execSync("npm install --save-dev @next/bundle-analyzer", { stdio: "inherit" })

// Create a temporary next.config.js with the analyzer
const nextConfigPath = path.join(process.cwd(), "next.config.mjs")
const originalConfig = fs.readFileSync(nextConfigPath, "utf8")

const withBundleAnalyzer = `
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: true,
})

${originalConfig.replace("export default nextConfig", "export default withBundleAnalyzer(nextConfig)")}
`

fs.writeFileSync(nextConfigPath, withBundleAnalyzer)

// Build the project
console.log("Building project with bundle analyzer...")
execSync("npm run build", { stdio: "inherit" })

// Restore original config
fs.writeFileSync(nextConfigPath, originalConfig)
console.log("Restored original next.config.mjs")
console.log("Bundle analysis complete! Check the .next/analyze folder for results.")
