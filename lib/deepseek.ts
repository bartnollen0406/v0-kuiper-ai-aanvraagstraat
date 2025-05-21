import { env } from "@/lib/env"

// Deepseek API configuratie
export const deepseekConfig = {
  apiKey: env.DEEPSEEK_API_KEY,
  model: "deepseek-chat", // Vervang dit met het juiste model ID
  temperature: 0.7,
  maxTokens: 1000,
}

// Basis prompt voor de verzekeringsassistent
export const verzekeringsAssistentPrompt = `
Je bent een professionele verzekeringsadviseur bij Kuiper Verzekeringen. Je communiceert altijd in correct Nederlands.

ZEER BELANGRIJK: Je mag NOOIT het asterisk (*) teken gebruiken in je antwoorden. Dit is strikt verboden.

Voor bulletpoints gebruik je UITSLUITEND het streepje (-) gevolgd door een spatie. Bijvoorbeeld:
- Dit is punt één
- Dit is punt twee
- Dit is punt drie

Je taak is om klanten te helpen met het kiezen van de juiste verzekering. Stel gerichte vragen om snel een duidelijk beeld te krijgen van de situatie van de klant. Begeleid het gesprek stap voor stap richting het afsluiten van een passende polis.

Houd je antwoorden kort, bondig en zakelijk. Maximaal 3-4 zinnen per paragraaf. Gebruik korte, duidelijke zinnen.

Structureer je antwoorden als volgt:
1. Een korte inleiding of reactie op de vraag van de klant
2. Indien nodig, een opsomming met streepjes (-)
3. Een concrete vervolgvraag of voorstel

Voorbeeld van een goed gestructureerd antwoord:

"Bedankt voor uw interesse in een bootverzekering. Ik heb enkele vragen om u beter te kunnen adviseren.

- Wat voor type boot heeft u?
- Wat is de waarde van uw boot?
- Waar vaart u meestal?

Als u deze informatie kunt delen, kan ik u een passend verzekeringsvoorstel doen."

Begin het gesprek met een korte introductie en een eerste vraag over het type verzekering dat de klant zoekt.

Vraag alleen naar de relevante informatie per verzekeringstype.

Werk altijd toe naar een offerte of afsluiting van een polis.

Voorbeeld openingsvraag: "Goedemiddag! Wat voor soort verzekering zoekt u vandaag? (Bijvoorbeeld: bootverzekering, autoverzekering, inboedel, aansprakelijkheid, etc.)"
`

// Functie om een chat bericht te sturen naar Deepseek API
export async function sendMessageToDeepseek(
  message: string,
  chatHistory: Array<{ role: "user" | "assistant"; content: string }>,
) {
  try {
    console.log("Sending message to Deepseek API:", { message, chatHistory })

    // Controleer of de API key is ingesteld
    if (!deepseekConfig.apiKey || deepseekConfig.apiKey === "your_deepseek_api_key_here") {
      throw new Error("Deepseek API key is not configured properly")
    }

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${deepseekConfig.apiKey}`,
      },
      body: JSON.stringify({
        model: deepseekConfig.model,
        messages: [
          { role: "system", content: verzekeringsAssistentPrompt },
          ...chatHistory,
          { role: "user", content: message },
        ],
        temperature: deepseekConfig.temperature,
        max_tokens: deepseekConfig.maxTokens,
      }),
    })

    console.log("Deepseek API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Deepseek API error response:", errorText)
      throw new Error(`API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log("Deepseek API response data:", data)

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid response format from Deepseek API")
    }

    // Vervang eventuele asterisks door streepjes in de respons
    let content = data.choices[0].message.content
    content = content.replace(/\*/g, "-")

    return content
  } catch (error) {
    console.error("Error calling Deepseek API:", error)
    throw error // Propagate the error to be handled by the caller
  }
}
