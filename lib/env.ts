// Functie om environment variables veilig te laden
export const env = {
  DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY || "",
}

// Verbeter de validateEnv functie om meer informatie te geven over ontbrekende environment variables

export function validateEnv() {
  const requiredEnvVars = ["DEEPSEEK_API_KEY"]
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !env[envVar as keyof typeof env] || env[envVar as keyof typeof env] === "",
  )

  if (missingEnvVars.length > 0) {
    console.warn(`Ontbrekende environment variables: ${missingEnvVars.join(", ")}`)
    console.warn("Maak een .env.local bestand aan op basis van .env.local.example")
    return false
  }

  // Controleer of de API key niet de placeholder waarde is
  if (env.DEEPSEEK_API_KEY === "your_deepseek_api_key_here") {
    console.warn("DEEPSEEK_API_KEY bevat nog de placeholder waarde. Vervang deze met een echte API key.")
    return false
  }

  return true
}
