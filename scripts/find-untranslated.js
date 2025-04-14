import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, "..")

// Regex patterns to find potential hardcoded text
const patterns = [
  /<[^>]*>([^<>{]*)<\/[^>]*>/g, // Text between tags
  /className="[^"]*"[^>]*>([^<>{]*)</g, // Text after className
  /label="([^"]*)"/, // label attributes
  /placeholder="([^"]*)"/, // placeholder attributes
  /title="([^"]*)"/, // title attributes
  /alt="([^"]*)"/, // alt attributes
]

// Extensions to scan
const extensions = [".tsx", ".jsx", ".js", ".ts"]

// Directories to exclude
const excludeDirs = ["node_modules", ".next", "public", "dictionaries"]

// Words to ignore (common programming terms, etc.)
const ignoreWords = ["div", "span", "className", "flex", "grid", "container", "import", "export", "const", "function"]

async function scanDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    // Skip excluded directories
    if (entry.isDirectory() && !excludeDirs.includes(entry.name)) {
      await scanDirectory(fullPath)
    }
    // Check files with matching extensions
    else if (entry.isFile() && extensions.includes(path.extname(entry.name))) {
      await scanFile(fullPath)
    }
  }
}

async function scanFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf8")
    const potentialHardcodedText = []

    // Apply each regex pattern
    for (const pattern of patterns) {
      const matches = [...content.matchAll(pattern)]
      for (const match of matches) {
        const text = match[1]?.trim()
        if (text && text.length > 2 && !ignoreWords.includes(text) && !/^[0-9.]+$/.test(text)) {
          // Check if it's not already using the T component
          const prevText = content.substring(Math.max(0, match.index - 30), match.index)
          if (!prevText.includes("<T path=")) {
            potentialHardcodedText.push(text)
          }
        }
      }
    }

    if (potentialHardcodedText.length > 0) {
      console.log(`\nFile: ${path.relative(rootDir, filePath)}`)
      console.log("Potential hardc oded text:")
      potentialHardcodedText.forEach((text) => {
        console.log(`  - "${text}"`)
      })
    }
  } catch (error) {
    console.error(`Error scanning file ${filePath}:`, error.message)
  }
}

// Start scanning
console.log("Scanning for potential untranslated text...")
await scanDirectory(rootDir)
console.log("\nScan complete. Review the results and update your components to use the T component.")
