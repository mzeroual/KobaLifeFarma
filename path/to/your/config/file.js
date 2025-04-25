// This is a new file, so we'll create the initial structure and incorporate the updates.

async function loadUserConfig() {
  let userConfig
  try {
    // Replace the ESM import path
    userConfig = await import("./MAZA-user-next.config.mjs")
  } catch (esmError) {
    console.warn("Failed to load ESM config, attempting CJS fallback:", esmError)
    try {
      // Replace the CJS fallback import path
      userConfig = await import("./MAZA-user-next.config")
    } catch (cjsError) {
      console.error("Failed to load CJS config:", cjsError)
      throw new Error("Failed to load user config (ESM and CJS)")
    }
  }
  return userConfig
}

export default loadUserConfig
