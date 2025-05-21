import { type NextRequest, NextResponse } from "next/server"
import { sendMessageToDeepseek } from "@/lib/deepseek"
import { validateEnv } from "@/lib/env"

export async function POST(req: NextRequest) {
  // Valideer environment variables
  if (!validateEnv()) {
    return NextResponse.json(
      { error: "Server is niet correct geconfigureerd. Neem contact op met de beheerder." },
      { status: 500 },
    )
  }

  try {
    const { message, chatHistory } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Bericht is vereist" }, { status: 400 })
    }

    try {
      // Stuur bericht naar Deepseek API
      let response = await sendMessageToDeepseek(message, chatHistory || [])

      // Extra veiligheidscontrole: vervang alle asterisks door streepjes
      response = response.replace(/\*/g, "-")

      // Zorg ervoor dat bulletpoints correct zijn geformatteerd
      response = response.replace(/^\s*\*\s+/gm, "- ")

      return NextResponse.json({ response })
    } catch (error) {
      console.error("Error in Deepseek API call:", error)

      // Geef een meer specifieke foutmelding terug
      if (error instanceof Error) {
        return NextResponse.json(
          {
            error: "Er is een fout opgetreden bij het verbinden met de AI service",
            details: error.message,
          },
          { status: 500 },
        )
      }

      return NextResponse.json(
        {
          error: "Er is een onbekende fout opgetreden bij het verbinden met de AI service",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error parsing request:", error)
    return NextResponse.json({ error: "Ongeldige aanvraag" }, { status: 400 })
  }
}
