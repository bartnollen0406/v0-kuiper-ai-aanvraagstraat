"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Shield, Send, Calendar, FileText, Home, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { nl } from "date-fns/locale"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import Link from "next/link"

// Types for our chat messages
type MessageType =
  | "text"
  | "options"
  | "input"
  | "date"
  | "select"
  | "radio"
  | "checkbox"
  | "summary"
  | "recommendation"

interface Message {
  id: string
  sender: "bot" | "user"
  type: MessageType
  content: string
  options?: Array<{ value: string; label: string }>
  field?: string
  placeholder?: string
  required?: boolean
  summary?: FormData
  recommendations?: Array<{ title: string; description: string; price: string }>
}

// Type for our form data
interface FormData {
  voornaam?: string
  achternaam?: string
  geboortedatum?: string
  email?: string
  telefoon?: string
  adres?: string
  postcode?: string
  plaats?: string
  land?: string
  // Boot specifieke velden
  bootType?: string
  bootMerk?: string
  bootModel?: string
  bootBouwjaar?: string
  bootWaarde?: string
  bootLengte?: string
  bootMotor?: string
  bootLigplaats?: string
  vaargebied?: string
  // Auto specifieke velden
  autoMerk?: string
  autoModel?: string
  autoBouwjaar?: string
  autoWaarde?: string
  autoKilometerstand?: string
  autoGebruik?: string
  autoStalling?: string
  autoRestauratie?: string
  // Algemene verzekeringsvelden
  dekking?: string
  eigenRisico?: string
  aanvullendeDekkingen?: string[]
  ingangsdatum?: string
  [key: string]: any
}

// Type voor de chatgeschiedenis voor de Deepseek API
interface ChatHistoryItem {
  role: "user" | "assistant"
  content: string
}

export default function DialogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({})
  const [progress, setProgress] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([])
  const [verzekeringType, setVerzekeringType] = useState<"boot" | "auto">("boot")

  // Bepaal het type verzekering op basis van de URL parameter
  useEffect(() => {
    const type = searchParams.get("type")
    if (type === "auto") {
      setVerzekeringType("auto")
    } else {
      setVerzekeringType("boot")
    }
  }, [searchParams])

  // Define the conversation flow for boats
  const bootConversationSteps = [
    {
      id: "welcome",
      message:
        "Welkom bij de Kuiper AI Aanvraagstraat! Ik ben Lisa, uw virtuele assistent. Ik help u graag bij het aanvragen van een verzekering voor uw pleziervaartuig. Ik zal u stap voor stap door het proces leiden en u adviseren over de beste opties voor uw situatie. Laten we beginnen!",
      type: "text" as MessageType,
    },
    {
      id: "intro_question",
      message: "Heeft u al eerder een verzekering bij Kuiper Verzekeringen afgesloten?",
      type: "options" as MessageType,
      options: [
        { value: "ja", label: "Ja, ik ben al klant" },
        { value: "nee", label: "Nee, dit is mijn eerste verzekering bij Kuiper" },
      ],
    },
    {
      id: "returning_customer",
      message:
        "Fijn dat u opnieuw voor ons kiest! Ik zie dat u al bij ons geregistreerd staat. Ik heb alvast uw gegevens opgehaald, zodat u deze niet opnieuw hoeft in te voeren. Klopt het dat u woont op [adres]?",
      type: "options" as MessageType,
      options: [
        { value: "ja_adres", label: "Ja, dat klopt" },
        { value: "nee_adres", label: "Nee, mijn adres is gewijzigd" },
      ],
      condition: (data: FormData) => data.intro_question === "ja",
    },
    {
      id: "voornaam",
      message: "Wat is uw voornaam?",
      type: "input" as MessageType,
      field: "voornaam",
      placeholder: "Voer uw voornaam in",
    },
    {
      id: "achternaam",
      message: "En wat is uw achternaam?",
      type: "input" as MessageType,
      field: "achternaam",
      placeholder: "Voer uw achternaam in",
    },
    {
      id: "personalized_greeting",
      message: (data: FormData) =>
        `Aangenaam kennis te maken, ${data.voornaam}! Ik ga u helpen bij het vinden van de beste verzekering voor uw pleziervaartuig. Kuiper Verzekeringen is sinds de jaren '70 gespecialiseerd in verzekeringen voor pleziervaartuigen, dus u bent bij ons in goede handen.`,
      type: "text" as MessageType,
    },
    {
      id: "geboortedatum",
      message: "Wat is uw geboortedatum?",
      type: "date" as MessageType,
      field: "geboortedatum",
    },
    {
      id: "email",
      message: "Op welk e-mailadres kunnen we u bereiken?",
      type: "input" as MessageType,
      field: "email",
      placeholder: "bijv. naam@voorbeeld.nl",
    },
    {
      id: "telefoon",
      message: "En wat is uw telefoonnummer? Zo kunnen we u bereiken als we aanvullende informatie nodig hebben.",
      type: "input" as MessageType,
      field: "telefoon",
      placeholder: "bijv. 0612345678",
    },
    {
      id: "adres",
      message: "Wat is uw adres?",
      type: "input" as MessageType,
      field: "adres",
      placeholder: "Straatnaam en huisnummer",
    },
    {
      id: "postcode",
      message: "Wat is uw postcode?",
      type: "input" as MessageType,
      field: "postcode",
      placeholder: "bijv. 1234 AB",
    },
    {
      id: "plaats",
      message: "In welke plaats woont u?",
      type: "input" as MessageType,
      field: "plaats",
      placeholder: "bijv. Amsterdam",
    },
    {
      id: "boot_intro",
      message: (data: FormData) =>
        `Bedankt voor uw persoonlijke gegevens, ${data.voornaam}! Nu zou ik graag wat meer willen weten over uw pleziervaartuig. Deze informatie helpt ons om de juiste dekking voor uw specifieke situatie te bepalen.`,
      type: "text" as MessageType,
    },
    {
      id: "bootType",
      message: "Wat voor type boot wilt u verzekeren?",
      type: "select" as MessageType,
      field: "bootType",
      options: [
        { value: "zeilboot", label: "Zeilboot" },
        { value: "motorboot", label: "Motorboot" },
        { value: "sloep", label: "Sloep" },
        { value: "catamaran", label: "Catamaran" },
        { value: "anders", label: "Anders" },
      ],
    },
    {
      id: "bootMerk",
      message: "Wat is het merk van uw boot?",
      type: "input" as MessageType,
      field: "bootMerk",
      placeholder: "bijv. Beneteau, Bavaria, etc.",
    },
    {
      id: "bootModel",
      message: "En welk model is het?",
      type: "input" as MessageType,
      field: "bootModel",
      placeholder: "bijv. Oceanis 40, etc.",
    },
    {
      id: "bootBouwjaar",
      message: "Wat is het bouwjaar van uw boot?",
      type: "input" as MessageType,
      field: "bootBouwjaar",
      placeholder: "bijv. 2015",
    },
    {
      id: "bootWaarde",
      message: "Wat is de huidige waarde van uw boot (in euro's)?",
      type: "input" as MessageType,
      field: "bootWaarde",
      placeholder: "bijv. 50000",
    },
    {
      id: "bootLengte",
      message: "Wat is de lengte van uw boot (in meters)?",
      type: "input" as MessageType,
      field: "bootLengte",
      placeholder: "bijv. 8.5",
    },
    {
      id: "bootMotor",
      message: "Heeft uw boot een binnenboordmotor of buitenboordmotor?",
      type: "radio" as MessageType,
      field: "bootMotor",
      options: [
        { value: "binnenboord", label: "Binnenboordmotor" },
        { value: "buitenboord", label: "Buitenboordmotor" },
        { value: "geen", label: "Geen motor" },
      ],
    },
    {
      id: "bootLigplaats",
      message: "Waar ligt uw boot meestal?",
      type: "radio" as MessageType,
      field: "bootLigplaats",
      options: [
        { value: "jachthaven", label: "Jachthaven" },
        { value: "thuishaven", label: "Thuishaven/eigen steiger" },
        { value: "droog", label: "Op de wal/trailer" },
        { value: "wisselend", label: "Wisselende locaties" },
      ],
    },
    {
      id: "vaargebied",
      message: "In welk gebied vaart u meestal?",
      type: "select" as MessageType,
      field: "vaargebied",
      options: [
        { value: "binnenwater", label: "Nederlandse binnenwateren" },
        { value: "kustwateren", label: "Nederlandse kustwateren" },
        { value: "europa_binnen", label: "Europese binnenwateren" },
        { value: "europa_kust", label: "Europese kustwateren" },
        { value: "middellandse_zee", label: "Middellandse Zee" },
        { value: "wereldwijd", label: "Wereldwijd" },
      ],
    },
    {
      id: "analysis_message",
      message: (data: FormData) =>
        `Dank u wel voor deze informatie over uw ${data.bootMerk} ${data.bootModel}. Ik analyseer nu de gegevens om de beste verzekeringsopties voor u te bepalen...`,
      type: "text" as MessageType,
    },
    {
      id: "analysis_result",
      message: (data: FormData) => {
        const bootType = data.bootType === "zeilboot" ? "zeilboot" : "motorboot"
        const waarde = Number.parseInt(data.bootWaarde || "0")
        const bouwjaar = Number.parseInt(data.bootBouwjaar || "0")
        const huidigeJaar = new Date().getFullYear()
        const leeftijd = huidigeJaar - bouwjaar

        let risicoAnalyse = ""
        if (leeftijd > 25) {
          risicoAnalyse =
            "Uw boot is ouder dan 25 jaar, wat betekent dat een taxatierapport nodig is voor een correcte waardevaststelling."
        } else if (waarde > 100000) {
          risicoAnalyse =
            "Gezien de hoge waarde van uw boot, adviseer ik een All Risk verzekering met uitgebreide dekking."
        } else {
          risicoAnalyse =
            "Op basis van de leeftijd en waarde van uw boot, hebben we verschillende passende opties voor u."
        }

        return `Op basis van mijn analyse van uw ${bootType} (${data.bootMerk} ${data.bootModel}) uit ${data.bootBouwjaar} met een waarde van €${data.bootWaarde}, kan ik u de volgende verzekeringsopties aanbieden. ${risicoAnalyse}`
      },
      type: "text" as MessageType,
    },
    {
      id: "dekking",
      message: "Welke dekking wilt u voor uw bootverzekering?",
      type: "radio" as MessageType,
      field: "dekking",
      options: [
        { value: "wa", label: "WA (Wettelijke Aansprakelijkheid) - vanaf €8,75/maand" },
        { value: "waplus", label: "WA+ (WA + Beperkt Casco) - vanaf €15,50/maand" },
        { value: "allrisk", label: "All-Risk (Volledig Casco) - vanaf €22,95/maand" },
      ],
    },
    {
      id: "dekking_explanation",
      message: (data: FormData) => {
        if (data.dekking === "wa") {
          return "U heeft gekozen voor WA-dekking. Deze dekt schade die u met uw boot aan anderen toebrengt. Schade aan uw eigen boot is niet gedekt. Dit is de meest basis dekking."
        } else if (data.dekking === "waplus") {
          return "U heeft gekozen voor WA+ dekking. Naast schade aan anderen, dekt deze ook schade aan uw eigen boot door brand, diefstal, storm en aanvaring met een vast object."
        } else {
          return "U heeft gekozen voor All-Risk dekking. Dit is de meest uitgebreide dekking die ook schade aan uw eigen boot dekt, ongeacht de oorzaak (met uitzondering van normale slijtage en opzet)."
        }
      },
      type: "text" as MessageType,
    },
    {
      id: "eigenRisico",
      message: "Welk eigen risico wilt u?",
      type: "radio" as MessageType,
      field: "eigenRisico",
      options: [
        { value: "0", label: "€0 (+€4,50/maand)" },
        { value: "250", label: "€250 (+€2,00/maand)" },
        { value: "500", label: "€500 (standaard)" },
        { value: "1000", label: "€1000 (-€2,25/maand)" },
      ],
    },
    {
      id: "aanvullendeDekkingen",
      message: "Wilt u aanvullende dekkingen toevoegen aan uw verzekering?",
      type: "checkbox" as MessageType,
      field: "aanvullendeDekkingen",
      options: [
        { value: "rechtsbijstand", label: "Rechtsbijstandverzekering (+€4,25/maand)" },
        { value: "ongevallen", label: "Ongevallenverzekering opvarenden (+€3,75/maand)" },
        { value: "pechhulp", label: "Vaartuighulp (+€2,95/maand)" },
        { value: "inboedel", label: "Uitgebreide inboedeldekking (+€3,50/maand)" },
      ],
    },
    {
      id: "recommendation",
      message:
        "Op basis van uw boottype en vaargebied heb ik nog enkele aanbevelingen die goed bij uw situatie passen:",
      type: "recommendation" as MessageType,
      recommendations: [
        {
          title: "Trailer verzekering",
          description: "Bescherm uw boottrailer tegen diefstal en schade",
          price: "+€2,50/maand",
        },
        {
          title: "Uitgebreide vaargebied dekking",
          description: "Vaar zorgeloos in een groter gebied dan standaard gedekt",
          price: "+€4,75/maand",
        },
      ],
    },
    {
      id: "ingangsdatum",
      message: "Wat is de gewenste ingangsdatum van uw verzekering?",
      type: "date" as MessageType,
      field: "ingangsdatum",
    },
    {
      id: "ai_analysis",
      message: (data: FormData) => {
        const bootWaarde = Number.parseInt(data.bootWaarde || "0")
        const bootLeeftijd = new Date().getFullYear() - Number.parseInt(data.bootBouwjaar || "0")

        let risicoProfiel = ""
        if (data.vaargebied === "binnenwater" && data.bootType === "sloep") {
          risicoProfiel = "laag"
        } else if (data.vaargebied === "wereldwijd" || (data.bootWaarde && bootWaarde > 150000)) {
          risicoProfiel = "verhoogd"
        } else {
          risicoProfiel = "gemiddeld"
        }

        let advies = ""
        if (risicoProfiel === "laag") {
          advies = "Uw risicoprofiel is laag. U heeft een goede dekking gekozen die past bij uw situatie."
        } else if (risicoProfiel === "verhoogd") {
          advies =
            "Uw risicoprofiel is verhoogd vanwege het vaargebied of de waarde van uw boot. Ik adviseer u om te overwegen uw eigen risico te verlagen en aanvullende dekkingen toe te voegen voor optimale bescherming."
        } else {
          advies =
            "Uw risicoprofiel is gemiddeld. Uw gekozen dekking biedt een goede balans tussen premie en bescherming."
        }

        return `Ik heb een analyse gemaakt van uw bootgegevens en verzekeringsbehoeften. ${advies} Onze geavanceerde algoritmes hebben uw gegevens vergeleken met vergelijkbare boten en gebruikspatronen in onze database om deze aanbeveling te doen.`
      },
      type: "text" as MessageType,
    },
    {
      id: "summary_intro",
      message: "Bedankt voor alle informatie! Hier is een samenvatting van uw aanvraag:",
      type: "text" as MessageType,
    },
    {
      id: "summary",
      message: "Controleer of alle gegevens correct zijn:",
      type: "summary" as MessageType,
    },
    {
      id: "confirmation",
      message: "Wilt u deze aanvraag indienen?",
      type: "options" as MessageType,
      options: [
        { value: "ja", label: "Ja, dien aanvraag in" },
        { value: "nee", label: "Nee, ik wil wijzigingen maken" },
      ],
    },
    {
      id: "final_message",
      message: (data: FormData) =>
        `Geweldig, ${data.voornaam}! Uw aanvraag is succesvol ingediend. Een van onze specialisten zal uw aanvraag binnen 24 uur beoordelen en contact met u opnemen voor eventuele aanvullende informatie. U ontvangt ook een bevestigingsmail op ${data.email} met een overzicht van uw aanvraag. Heeft u in de tussentijd nog vragen, dan kunt u altijd contact opnemen met onze klantenservice op 020-1234567. Bedankt voor uw vertrouwen in Kuiper Verzekeringen!`,
      type: "text" as MessageType,
    },
  ]

  // Define the conversation flow for classic cars
  const autoConversationSteps = [
    {
      id: "welcome",
      message:
        "Welkom bij de Kuiper AI Aanvraagstraat! Ik ben Lisa, uw virtuele assistent. Ik help u graag bij het aanvragen van een verzekering voor uw klassieke auto. Ik zal u stap voor stap door het proces leiden en u adviseren over de beste opties voor uw situatie. Laten we beginnen!",
      type: "text" as MessageType,
    },
    {
      id: "intro_question",
      message: "Heeft u al eerder een verzekering bij Kuiper Verzekeringen afgesloten?",
      type: "options" as MessageType,
      options: [
        { value: "ja", label: "Ja, ik ben al klant" },
        { value: "nee", label: "Nee, dit is mijn eerste verzekering bij Kuiper" },
      ],
    },
    {
      id: "returning_customer",
      message:
        "Fijn dat u opnieuw voor ons kiest! Ik zie dat u al bij ons geregistreerd staat. Ik heb alvast uw gegevens opgehaald, zodat u deze niet opnieuw hoeft in te voeren. Klopt het dat u woont op [adres]?",
      type: "options" as MessageType,
      options: [
        { value: "ja_adres", label: "Ja, dat klopt" },
        { value: "nee_adres", label: "Nee, mijn adres is gewijzigd" },
      ],
      condition: (data: FormData) => data.intro_question === "ja",
    },
    {
      id: "voornaam",
      message: "Wat is uw voornaam?",
      type: "input" as MessageType,
      field: "voornaam",
      placeholder: "Voer uw voornaam in",
    },
    {
      id: "achternaam",
      message: "En wat is uw achternaam?",
      type: "input" as MessageType,
      field: "achternaam",
      placeholder: "Voer uw achternaam in",
    },
    {
      id: "personalized_greeting",
      message: (data: FormData) =>
        `Aangenaam kennis te maken, ${data.voornaam}! Ik ga u helpen bij het vinden van de beste verzekering voor uw klassieke auto. Kuiper Verzekeringen is gespecialiseerd in verzekeringen voor klassieke auto's en oldtimers, dus u bent bij ons in goede handen.`,
      type: "text" as MessageType,
    },
    {
      id: "geboortedatum",
      message: "Wat is uw geboortedatum?",
      type: "date" as MessageType,
      field: "geboortedatum",
    },
    {
      id: "email",
      message: "Op welk e-mailadres kunnen we u bereiken?",
      type: "input" as MessageType,
      field: "email",
      placeholder: "bijv. naam@voorbeeld.nl",
    },
    {
      id: "telefoon",
      message: "En wat is uw telefoonnummer? Zo kunnen we u bereiken als we aanvullende informatie nodig hebben.",
      type: "input" as MessageType,
      field: "telefoon",
      placeholder: "bijv. 0612345678",
    },
    {
      id: "adres",
      message: "Wat is uw adres?",
      type: "input" as MessageType,
      field: "adres",
      placeholder: "Straatnaam en huisnummer",
    },
    {
      id: "postcode",
      message: "Wat is uw postcode?",
      type: "input" as MessageType,
      field: "postcode",
      placeholder: "bijv. 1234 AB",
    },
    {
      id: "plaats",
      message: "In welke plaats woont u?",
      type: "input" as MessageType,
      field: "plaats",
      placeholder: "bijv. Amsterdam",
    },
    {
      id: "auto_intro",
      message: (data: FormData) =>
        `Bedankt voor uw persoonlijke gegevens, ${data.voornaam}! Nu zou ik graag wat meer willen weten over uw klassieke auto. Deze informatie helpt ons om de juiste dekking voor uw specifieke situatie te bepalen.`,
      type: "text" as MessageType,
    },
    {
      id: "autoMerk",
      message: "Wat is het merk van uw klassieke auto?",
      type: "input" as MessageType,
      field: "autoMerk",
      placeholder: "bijv. Porsche, Jaguar, Mercedes-Benz, etc.",
    },
    {
      id: "autoModel",
      message: "En welk model is het?",
      type: "input" as MessageType,
      field: "autoModel",
      placeholder: "bijv. 911, E-Type, 280SL, etc.",
    },
    {
      id: "autoBouwjaar",
      message: "Wat is het bouwjaar van uw klassieke auto?",
      type: "input" as MessageType,
      field: "autoBouwjaar",
      placeholder: "bijv. 1968",
    },
    {
      id: "autoWaarde",
      message: "Wat is de huidige getaxeerde waarde van uw klassieke auto (in euro's)?",
      type: "input" as MessageType,
      field: "autoWaarde",
      placeholder: "bijv. 50000",
    },
    {
      id: "autoKilometerstand",
      message: "Wat is de huidige kilometerstand van uw klassieke auto?",
      type: "input" as MessageType,
      field: "autoKilometerstand",
      placeholder: "bijv. 85000",
    },
    {
      id: "autoGebruik",
      message: "Hoe gebruikt u uw klassieke auto voornamelijk?",
      type: "radio" as MessageType,
      field: "autoGebruik",
      options: [
        { value: "hobby", label: "Hobbymatig gebruik (maximaal 7.500 km per jaar)" },
        { value: "seizoen", label: "Seizoensgebonden gebruik (alleen zomermaanden)" },
        { value: "shows", label: "Voornamelijk voor shows en evenementen" },
        { value: "dagelijks", label: "Dagelijks gebruik" },
      ],
    },
    {
      id: "autoStalling",
      message: "Waar stalt u uw klassieke auto meestal?",
      type: "radio" as MessageType,
      field: "autoStalling",
      options: [
        { value: "afgesloten_garage", label: "Afgesloten privégarage" },
        { value: "gedeelde_garage", label: "Gedeelde garage" },
        { value: "carport", label: "Carport/oprit" },
        { value: "straat", label: "Op straat" },
      ],
    },
    {
      id: "autoRestauratie",
      message: "Is uw klassieke auto gerestaureerd of in originele staat?",
      type: "radio" as MessageType,
      field: "autoRestauratie",
      options: [
        { value: "origineel", label: "Originele staat" },
        { value: "gerestaureerd", label: "Volledig gerestaureerd" },
        { value: "deels_gerestaureerd", label: "Deels gerestaureerd" },
        { value: "gemodificeerd", label: "Gemodificeerd/aangepast" },
      ],
    },
    {
      id: "analysis_message",
      message: (data: FormData) =>
        `Dank u wel voor deze informatie over uw ${data.autoMerk} ${data.autoModel}. Ik analyseer nu de gegevens om de beste verzekeringsopties voor u te bepalen...`,
      type: "text" as MessageType,
    },
    {
      id: "analysis_result",
      message: (data: FormData) => {
        const waarde = Number.parseInt(data.autoWaarde || "0")
        const bouwjaar = Number.parseInt(data.autoBouwjaar || "0")
        const huidigeJaar = new Date().getFullYear()
        const leeftijd = huidigeJaar - bouwjaar

        let risicoAnalyse = ""
        if (leeftijd >= 40) {
          risicoAnalyse =
            "Uw auto kwalificeert als een echte oldtimer (40+ jaar). Dit betekent dat u in aanmerking komt voor onze speciale oldtimerverzekering met gunstige premies."
        } else if (leeftijd >= 25 && leeftijd < 40) {
          risicoAnalyse =
            "Uw auto kwalificeert als een youngtimer (25-40 jaar). Voor deze categorie bieden wij speciale youngtimerverzekeringen aan."
        } else {
          risicoAnalyse =
            "Uw auto is jonger dan 25 jaar, maar kan als klassieker worden verzekerd op basis van de zeldzaamheid en waarde."
        }

        let stallingAdvies = ""
        if (data.autoStalling === "straat") {
          stallingAdvies =
            " Gezien uw auto op straat geparkeerd staat, adviseren wij een uitgebreide dekking met diefstalbeveiliging."
        }

        return `Op basis van mijn analyse van uw ${data.autoMerk} ${data.autoModel} uit ${data.autoBouwjaar} met een waarde van €${data.autoWaarde}, kan ik u de volgende verzekeringsopties aanbieden. ${risicoAnalyse}${stallingAdvies}`
      },
      type: "text" as MessageType,
    },
    {
      id: "dekking",
      message: "Welke dekking wilt u voor uw klassieke autoverzekering?",
      type: "radio" as MessageType,
      field: "dekking",
      options: [
        { value: "wa", label: "WA (Wettelijke Aansprakelijkheid) - vanaf €7,50/maand" },
        { value: "waplus", label: "WA+ (WA + Beperkt Casco) - vanaf €12,75/maand" },
        { value: "allrisk", label: "All-Risk (Volledig Casco) - vanaf €18,95/maand" },
      ],
    },
    {
      id: "dekking_explanation",
      message: (data: FormData) => {
        if (data.dekking === "wa") {
          return "U heeft gekozen voor WA-dekking. Deze dekt schade die u met uw klassieke auto aan anderen toebrengt. Schade aan uw eigen auto is niet gedekt. Dit is de meest basis dekking."
        } else if (data.dekking === "waplus") {
          return "U heeft gekozen voor WA+ dekking. Naast schade aan anderen, dekt deze ook schade aan uw eigen auto door brand, diefstal, storm en aanrijding met een dier."
        } else {
          return "U heeft gekozen voor All-Risk dekking. Dit is de meest uitgebreide dekking die ook schade aan uw eigen auto dekt, ongeacht de oorzaak (met uitzondering van normale slijtage en opzet)."
        }
      },
      type: "text" as MessageType,
    },
    {
      id: "eigenRisico",
      message: "Welk eigen risico wilt u?",
      type: "radio" as MessageType,
      field: "eigenRisico",
      options: [
        { value: "0", label: "€0 (+€3,50/maand)" },
        { value: "150", label: "€150 (+€1,75/maand)" },
        { value: "300", label: "€300 (standaard)" },
        { value: "500", label: "€500 (-€1,50/maand)" },
      ],
    },
    {
      id: "aanvullendeDekkingen",
      message: "Wilt u aanvullende dekkingen toevoegen aan uw verzekering?",
      type: "checkbox" as MessageType,
      field: "aanvullendeDekkingen",
      options: [
        { value: "rechtsbijstand", label: "Rechtsbijstandverzekering (+€3,75/maand)" },
        { value: "ongevallen", label: "Ongevallenverzekering inzittenden (+€2,95/maand)" },
        { value: "pechhulp", label: "Pechhulp voor klassieke auto's (+€3,50/maand)" },
        { value: "taxatiewaarde", label: "Taxatiewaarde garantie (+€2,25/maand)" },
      ],
    },
    {
      id: "recommendation",
      message:
        "Op basis van uw klassieke auto en gebruikspatroon heb ik nog enkele aanbevelingen die goed bij uw situatie passen:",
      type: "recommendation" as MessageType,
      recommendations: [
        {
          title: "Clublidmaatschap korting",
          description: "Korting bij lidmaatschap van een erkende oldtimerclub",
          price: "-10% op uw premie",
        },
        {
          title: "Winterstop regeling",
          description: "Lagere premie als u uw auto in de wintermaanden niet gebruikt",
          price: "-15% op uw jaarpremie",
        },
      ],
    },
    {
      id: "ingangsdatum",
      message: "Wat is de gewenste ingangsdatum van uw verzekering?",
      type: "date" as MessageType,
      field: "ingangsdatum",
    },
    {
      id: "ai_analysis",
      message: (data: FormData) => {
        const autoWaarde = Number.parseInt(data.autoWaarde || "0")
        const autoLeeftijd = new Date().getFullYear() - Number.parseInt(data.autoBouwjaar || "0")

        let risicoProfiel = ""
        if (data.autoGebruik === "shows" && data.autoStalling === "afgesloten_garage") {
          risicoProfiel = "laag"
        } else if (data.autoGebruik === "dagelijks" || data.autoStalling === "straat") {
          risicoProfiel = "verhoogd"
        } else {
          risicoProfiel = "gemiddeld"
        }

        let advies = ""
        if (risicoProfiel === "laag") {
          advies = "Uw risicoprofiel is laag. U heeft een goede dekking gekozen die past bij uw situatie."
        } else if (risicoProfiel === "verhoogd") {
          advies =
            "Uw risicoprofiel is verhoogd vanwege het gebruikspatroon of de stallingslocatie van uw klassieke auto. Ik adviseer u om te overwegen uw eigen risico te verlagen en aanvullende dekkingen toe te voegen voor optimale bescherming."
        } else {
          advies =
            "Uw risicoprofiel is gemiddeld. Uw gekozen dekking biedt een goede balans tussen premie en bescherming."
        }

        return `Ik heb een analyse gemaakt van uw klassieke auto en verzekeringsbehoeften. ${advies} Onze geavanceerde algoritmes hebben uw gegevens vergeleken met vergelijkbare klassieke auto's en gebruikspatronen in onze database om deze aanbeveling te doen.`
      },
      type: "text" as MessageType,
    },
    {
      id: "summary_intro",
      message: "Bedankt voor alle informatie! Hier is een samenvatting van uw aanvraag:",
      type: "text" as MessageType,
    },
    {
      id: "summary",
      message: "Controleer of alle gegevens correct zijn:",
      type: "summary" as MessageType,
    },
    {
      id: "confirmation",
      message: "Wilt u deze aanvraag indienen?",
      type: "options" as MessageType,
      options: [
        { value: "ja", label: "Ja, dien aanvraag in" },
        { value: "nee", label: "Nee, ik wil wijzigingen maken" },
      ],
    },
    {
      id: "final_message",
      message: (data: FormData) =>
        `Geweldig, ${data.voornaam}! Uw aanvraag is succesvol ingediend. Een van onze specialisten zal uw aanvraag binnen 24 uur beoordelen en contact met u opnemen voor eventuele aanvullende informatie. U ontvangt ook een bevestigingsmail op ${data.email} met een overzicht van uw aanvraag. Heeft u in de tussentijd nog vragen, dan kunt u altijd contact opnemen met onze klantenservice op 020-1234567. Bedankt voor uw vertrouwen in Kuiper Verzekeringen!`,
      type: "text" as MessageType,
    },
  ]

  // Kies de juiste conversatiestappen op basis van het verzekeringtype
  const conversationSteps = verzekeringType === "auto" ? autoConversationSteps : bootConversationSteps

  // Initialize the chat with the first message
  useEffect(() => {
    // Voorkom dubbele initialisatie door te controleren of er al berichten zijn
    if (messages.length === 0) {
      const timer = setTimeout(() => {
        addBotMessage({
          id: "ai_welcome",
          message:
            verzekeringType === "auto"
              ? "Welkom bij Kuiper Verzekeringen! Ik ben Lisa, uw virtuele verzekeringsadviseur. Ik help u graag bij het aanvragen van een verzekering voor uw klassieke auto. Hoe kan ik u vandaag helpen?"
              : "Welkom bij Kuiper Verzekeringen! Ik ben Lisa, uw virtuele verzekeringsadviseur. Ik help u graag bij het aanvragen van een verzekering voor uw pleziervaartuig. Hoe kan ik u vandaag helpen?",
          type: "text" as MessageType,
        })
        setProgress(5)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [messages.length, verzekeringType])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Function to add a bot message
  const addBotMessage = (step: any) => {
    setIsTyping(true)

    setTimeout(() => {
      let content = step.content
      if (typeof step.message === "function") {
        content = step.message(formData)
      } else {
        content = step.message
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          type: step.type,
          content: content,
          options: step.options,
          field: step.field,
          placeholder: step.placeholder,
          required: step.required !== false,
          summary: step.type === "summary" ? formData : undefined,
          recommendations: step.recommendations,
        },
      ])

      // Voeg bericht toe aan chatgeschiedenis voor Deepseek
      if (step.type === "text") {
        setChatHistory((prev) => [...prev, { role: "assistant", content }])
      }

      setIsTyping(false)
    }, 1000)
  }

  // Function to add a user message
  const addUserMessage = (content: string, field?: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: "user",
        type: "text",
        content: content,
        field: field,
      },
    ])

    // Voeg bericht toe aan chatgeschiedenis voor Deepseek
    setChatHistory((prev) => [...prev, { role: "user", content }])

    // Update form data if field is provided
    if (field) {
      setFormData((prev) => ({
        ...prev,
        [field]: content,
      }))
    }
  }

  // Functie om een bericht naar de Deepseek API te sturen
  const sendToDeepseek = async (message: string) => {
    setIsTyping(true)

    try {
      console.log("Sending message to API:", message)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          chatHistory,
        }),
      })

      console.log("API response status:", response.status)

      const data = await response.json()

      if (!response.ok) {
        console.error("API error response:", data)
        throw new Error(data.error || data.details || "Er is een fout opgetreden")
      }

      // Voeg het antwoord toe als bot bericht
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          type: "text",
          content: formatText(data.response),
        },
      ])

      // Update chatgeschiedenis
      setChatHistory((prev) => [...prev, { role: "assistant", content: data.response }])

      // Extraheer eventuele formuliergegevens uit het antwoord
      extractFormData(data.response)
    } catch (error) {
      console.error("Error sending message to Deepseek:", error)

      // Toon een gebruiksvriendelijke foutmelding aan de gebruiker
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          type: "text",
          content:
            "Er is een probleem met onze AI-service. Probeer het later opnieuw of neem contact op met onze klantenservice op 020-1234567.",
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  // Functie om formuliergegevens te extraheren uit AI-antwoorden
  const extractFormData = (response: string) => {
    // Eenvoudige regex-gebaseerde extractie
    // In een productieomgeving zou je een meer geavanceerde methode willen gebruiken

    // Voorbeeld: Naam extractie
    const naamMatch = response.match(/(?:u heet|uw naam is|naam:)\s*([A-Za-z\s]+)/i)
    if (naamMatch && naamMatch[1]) {
      const naamDelen = naamMatch[1].trim().split(/\s+/)
      if (naamDelen.length > 0) {
        setFormData((prev) => ({
          ...prev,
          voornaam: prev.voornaam || naamDelen[0],
          achternaam: prev.achternaam || naamDelen.slice(1).join(" "),
        }))
      }
    }

    // Voorbeeld: Email extractie
    const emailMatch = response.match(
      /(?:e-mail|email|e-mailadres):\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i,
    )
    if (emailMatch && emailMatch[1]) {
      setFormData((prev) => ({
        ...prev,
        email: prev.email || emailMatch[1].trim(),
      }))
    }

    // Voeg hier meer extractieregels toe voor andere velden
    // Dit is een eenvoudig voorbeeld - in productie zou je een meer robuuste oplossing willen
  }

  // Functie om de tekst te formatteren voordat deze wordt weergegeven
  const formatText = (text: string) => {
    // Vervang asterisks door streepjes
    let formattedText = text.replace(/\*/g, "-")

    // Zorg ervoor dat bulletpoints correct zijn geformatteerd
    formattedText = formattedText.replace(/^\s*\*\s+/gm, "- ")

    return formattedText
  }

  // Function to handle user input submission
  const handleInputSubmit = () => {
    if (!inputValue.trim()) return

    // AI-gestuurde flow met Deepseek
    addUserMessage(inputValue)
    const message = inputValue
    setInputValue("")

    // Stuur bericht naar Deepseek API
    sendToDeepseek(message)
  }

  // Function to handle option selection
  const handleOptionSelect = (value: string, label: string, field?: string) => {
    addUserMessage(label, field)

    // Handle confirmation step
    if (field === undefined && currentStep === conversationSteps.length - 2) {
      if (value === "ja") {
        // Submit the form and show final message
        goToNextStep()
        setTimeout(() => {
          router.push("/aanvraag/bevestiging")
        }, 8000)
      } else {
        // Go back to the beginning
        setCurrentStep(0)
        setMessages([])
        setFormData({})
        setProgress(0)
        setTimeout(() => {
          addBotMessage(conversationSteps[0])
        }, 500)
      }
    }

    if (messages.content === "Er is een probleem met onze AI-service") {
      // Blijf in AI-gestuurde chat maar reset de foutmelding
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          type: "text",
          content:
            "Begrepen. U kunt het later opnieuw proberen. Als u vragen heeft, kunt u ook contact opnemen met onze klantenservice op 020-1234567.",
        },
      ])
      return
    } else {
      // Move to next step
      goToNextStep()
    }
  }

  // Function to handle checkbox selection
  const handleCheckboxSelect = (values: string[], labels: string[], field: string) => {
    addUserMessage(labels.join(", "), field)

    // Move to next step
    goToNextStep()
  }

  // Function to handle recommendation selection
  const handleRecommendationSelect = (title: string) => {
    addUserMessage(`Ik wil graag de ${title} toevoegen aan mijn verzekering.`)

    // Move to next step
    goToNextStep()
  }

  // Function to go to the next step
  const goToNextStep = () => {
    const nextStep = currentStep + 1
    setCurrentStep(nextStep)

    // Calculate progress
    const newProgress = Math.min(100, Math.round((nextStep / conversationSteps.length) * 100))
    setProgress(newProgress)

    // Add the next bot message if there are more steps
    if (nextStep < conversationSteps.length) {
      addBotMessage(conversationSteps[nextStep])
    }
  }

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Calculate premium based on selections
  const calculatePremium = () => {
    let basePremium = 0

    if (verzekeringType === "boot") {
      // Base premium based on coverage for boats
      if (formData.dekking === "wa") basePremium = 8.75
      else if (formData.dekking === "waplus") basePremium = 15.5
      else if (formData.dekking === "allrisk") basePremium = 22.95

      // Adjust for boat value
      const bootWaarde = Number.parseInt(formData.bootWaarde || "0")
      if (bootWaarde > 50000 && bootWaarde <= 100000) {
        basePremium *= 1.2
      } else if (bootWaarde > 100000) {
        basePremium *= 1.5
      }

      // Adjust for deductible
      if (formData.eigenRisico === "0") basePremium += 4.5
      else if (formData.eigenRisico === "250") basePremium += 2.0
      else if (formData.eigenRisico === "1000") basePremium -= 2.25

      // Add additional coverages
      if (formData.aanvullendeDekkingen) {
        const dekkingen = Array.isArray(formData.aanvullendeDekkingen)
          ? formData.aanvullendeDekkingen
          : [formData.aanvullendeDekkingen]

        if (dekkingen.includes("rechtsbijstand")) basePremium += 4.25
        if (dekkingen.includes("ongevallen")) basePremium += 3.75
        if (dekkingen.includes("pechhulp")) basePremium += 2.95
        if (dekkingen.includes("inboedel")) basePremium += 3.5
      }
    } else {
      // Base premium based on coverage for classic cars
      if (formData.dekking === "wa") basePremium = 7.5
      else if (formData.dekking === "waplus") basePremium = 12.75
      else if (formData.dekking === "allrisk") basePremium = 18.95

      // Adjust for car value
      const autoWaarde = Number.parseInt(formData.autoWaarde || "0")
      if (autoWaarde > 50000 && autoWaarde <= 100000) {
        basePremium *= 1.15
      } else if (autoWaarde > 100000) {
        basePremium *= 1.4
      }

      // Adjust for deductible
      if (formData.eigenRisico === "0") basePremium += 3.5
      else if (formData.eigenRisico === "150") basePremium += 1.75
      else if (formData.eigenRisico === "500") basePremium -= 1.5

      // Adjust for storage
      if (formData.autoStalling === "afgesloten_garage") basePremium *= 0.9
      else if (formData.autoStalling === "straat") basePremium *= 1.2

      // Add additional coverages
      if (formData.aanvullendeDekkingen) {
        const dekkingen = Array.isArray(formData.aanvullendeDekkingen)
          ? formData.aanvullendeDekkingen
          : [formData.aanvullendeDekkingen]

        if (dekkingen.includes("rechtsbijstand")) basePremium += 3.75
        if (dekkingen.includes("ongevallen")) basePremium += 2.95
        if (dekkingen.includes("pechhulp")) basePremium += 3.5
        if (dekkingen.includes("taxatiewaarde")) basePremium += 2.25
      }
    }

    return basePremium.toFixed(2)
  }

  // Render the chat messages
  const renderMessages = () => {
    return messages.map((message) => {
      if (message.sender === "bot") {
        return (
          <div key={message.id} className="flex items-start mb-4">
            <Avatar className="mr-2 h-8 w-8 bg-blue-600">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
              <AvatarFallback className="bg-blue-600 text-white">AI</AvatarFallback>
            </Avatar>
            <div className="flex flex-col max-w-[80%]">
              {message.type === "text" && (
                <div className="bg-blue-50 rounded-lg p-3 text-gray-800">{formatText(message.content)}</div>
              )}

              {message.type === "options" && (
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-gray-800">{message.content}</div>
                  <div className="flex flex-wrap gap-2">
                    {message.options?.map((option) => (
                      <Button
                        key={option.value}
                        variant="outline"
                        className="border-blue-200 hover:bg-blue-100"
                        onClick={() => handleOptionSelect(option.value, option.label, message.field)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {message.type === "input" && (
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-gray-800">{message.content}</div>
                </div>
              )}

              {message.type === "date" && (
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-gray-800">{message.content}</div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !formData[message.field as keyof FormData] && "text-muted-foreground",
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {formData[message.field as keyof FormData] ? (
                          format(new Date(formData[message.field as keyof FormData] as string), "PPP", { locale: nl })
                        ) : (
                          <span>Kies een datum</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={
                          formData[message.field as keyof FormData]
                            ? new Date(formData[message.field as keyof FormData] as string)
                            : undefined
                        }
                        onSelect={(date) => {
                          if (date) {
                            const dateStr = date.toISOString().split("T")[0]
                            setFormData((prev) => ({
                              ...prev,
                              [message.field as string]: dateStr,
                            }))
                            addUserMessage(format(date, "PPP", { locale: nl }), message.field)
                            goToNextStep()
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              {message.type === "select" && (
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-gray-800">{message.content}</div>
                  <Select
                    onValueChange={(value) => {
                      const selectedOption = message.options?.find((opt) => opt.value === value)
                      if (selectedOption) {
                        handleOptionSelect(value, selectedOption.label, message.field)
                      }
                    }}
                  >
                    <SelectTrigger className="w-[240px]">
                      <SelectValue placeholder="Maak een keuze" />
                    </SelectTrigger>
                    <SelectContent>
                      {message.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {message.type === "radio" && (
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-gray-800">{message.content}</div>
                  <RadioGroup
                    onValueChange={(value) => {
                      const selectedOption = message.options?.find((opt) => opt.value === value)
                      if (selectedOption) {
                        handleOptionSelect(value, selectedOption.label, message.field)
                      }
                    }}
                  >
                    <div className="space-y-2">
                      {message.options?.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2 rounded-md border p-2">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="flex-grow cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {message.type === "checkbox" && (
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-gray-800">{message.content}</div>
                  <div className="space-y-2">
                    {message.options?.map((option) => (
                      <div key={option.value} className="flex items-start space-x-2 rounded-md border p-2">
                        <Checkbox
                          id={option.value}
                          value={option.value}
                          onCheckedChange={(checked) => {
                            const currentValues = Array.isArray(formData[message.field as keyof FormData])
                              ? [...(formData[message.field as keyof FormData] as string[])]
                              : []

                            let newValues: string[]
                            if (checked) {
                              newValues = [...currentValues, option.value]
                            } else {
                              newValues = currentValues.filter((v) => v !== option.value)
                            }

                            setFormData((prev) => ({
                              ...prev,
                              [message.field as string]: newValues,
                            }))
                          }}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor={option.value} className="cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      </div>
                    ))}
                    <Button
                      className="mt-2"
                      onClick={() => {
                        const selectedValues = Array.isArray(formData[message.field as keyof FormData])
                          ? [...(formData[message.field as keyof FormData] as string[])]
                          : []

                        const selectedLabels =
                          message.options
                            ?.filter((opt) => selectedValues.includes(opt.value))
                            .map((opt) => opt.label) || []

                        if (selectedValues.length === 0) {
                          handleCheckboxSelect(["geen"], ["Geen aanvullende dekkingen"], message.field as string)
                        } else {
                          handleCheckboxSelect(selectedValues, selectedLabels, message.field as string)
                        }
                      }}
                    >
                      Bevestig selectie
                    </Button>
                  </div>
                </div>
              )}

              {message.type === "summary" && (
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-gray-800">{message.content}</div>
                  <Card>
                    <CardContent className="grid gap-4">
                      <div className="space-y-1">
                        <h2 className="text-sm font-semibold">Persoonlijke gegevens</h2>
                        <p className="text-sm">
                          {formData.voornaam} {formData.achternaam}
                          <br />
                          {formData.geboortedatum &&
                            `Geboren op ${format(new Date(formData.geboortedatum), "PPP", { locale: nl })}`}
                          <br />
                          {formData.email}
                          <br />
                          {formData.telefoon}
                          <br />
                          {formData.adres}, {formData.postcode} {formData.plaats}
                        </p>
                      </div>

                      {verzekeringType === "boot" && (
                        <div className="space-y-1">
                          <h2 className="text-sm font-semibold">Boot gegevens</h2>
                          <p className="text-sm">
                            Type: {formData.bootType}
                            <br />
                            Merk: {formData.bootMerk}
                            <br />
                            Model: {formData.bootModel}
                            <br />
                            Bouwjaar: {formData.bootBouwjaar}
                            <br />
                            Waarde: €{formData.bootWaarde}
                            <br />
                            Lengte: {formData.bootLengte} meter
                            <br />
                            Motor: {formData.bootMotor}
                            <br />
                            Ligplaats: {formData.bootLigplaats}
                            <br />
                            Vaargebied: {formData.vaargebied}
                          </p>
                        </div>
                      )}

                      {verzekeringType === "auto" && (
                        <div className="space-y-1">
                          <h2 className="text-sm font-semibold">Auto gegevens</h2>
                          <p className="text-sm">
                            Merk: {formData.autoMerk}
                            <br />
                            Model: {formData.autoModel}
                            <br />
                            Bouwjaar: {formData.autoBouwjaar}
                            <br />
                            Waarde: €{formData.autoWaarde}
                            <br />
                            Kilometerstand: {formData.autoKilometerstand} km
                            <br />
                            Gebruik: {formData.autoGebruik}
                            <br />
                            Stalling: {formData.autoStalling}
                            <br />
                            Restauratie: {formData.autoRestauratie}
                          </p>
                        </div>
                      )}

                      <div className="space-y-1">
                        <h2 className="text-sm font-semibold">Verzekering</h2>
                        <p className="text-sm">
                          Dekking: {formData.dekking}
                          <br />
                          Eigen risico: €{formData.eigenRisico}
                          <br />
                          Aanvullende dekkingen:{" "}
                          {Array.isArray(formData.aanvullendeDekkingen)
                            ? formData.aanvullendeDekkingen.join(", ")
                            : formData.aanvullendeDekkingen}
                          <br />
                          Ingangsdatum:{" "}
                          {formData.ingangsdatum && format(new Date(formData.ingangsdatum), "PPP", { locale: nl })}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <h2 className="text-sm font-semibold">Premie</h2>
                        <p className="text-sm">Geschatte maandelijkse premie: €{calculatePremium()}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {message.type === "recommendation" && (
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-gray-800">{message.content}</div>
                  <div className="flex flex-col gap-2">
                    {message.recommendations?.map((recommendation) => (
                      <Card key={recommendation.title}>
                        <CardContent className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-semibold">{recommendation.title}</h3>
                            <p className="text-xs text-gray-500">{recommendation.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{recommendation.price}</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRecommendationSelect(recommendation.title)}
                            >
                              Toevoegen
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      } else {
        return (
          <div key={message.id} className="flex items-start justify-end mb-4">
            <div className="flex flex-col items-end max-w-[80%]">
              <div className="bg-gray-200 rounded-lg p-3 text-gray-800">{message.content}</div>
            </div>
            <Avatar className="ml-2 h-8 w-8">
              <AvatarFallback className="bg-gray-600 text-white">
                {formData.voornaam?.charAt(0)}
                {formData.achternaam?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        )
      }
    })
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-blue-500" />
          <span className="text-lg font-semibold">Kuiper Verzekeringen</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="gap-2">
            <Info className="h-4 w-4" />
            Over ons
          </Button>
          <Button variant="ghost" className="gap-2">
            <FileText className="h-4 w-4" />
            Blog
          </Button>
          <Button variant="ghost" className="gap-2">
            <Home className="h-4 w-4" />
            Klantportaal
          </Button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4">
        <div className="w-full max-w-2xl mx-auto">
          <Card className="shadow-md">
            <CardContent className="flex flex-col space-y-4">
              <h2 className="text-2xl font-bold">AI Aanvraagstraat</h2>
              <p className="text-gray-600">
                Welkom! Ik ben Lisa, uw virtuele assistent. Ik help u graag bij het aanvragen van een verzekering.
              </p>

              <Progress value={progress} />

              {renderMessages()}

              <div ref={messagesEndRef} />
            </CardContent>
          </Card>
        </div>
      </div>

      {isTyping && (
        <div className="flex items-center justify-start mb-4 p-4 bg-blue-50 border-t">
          <Avatar className="mr-2 h-8 w-8 bg-blue-600">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
            <AvatarFallback className="bg-blue-600 text-white">AI</AvatarFallback>
          </Avatar>
          <div className="text-gray-600">Lisa is aan het typen...</div>
        </div>
      )}

      <div className="p-4 bg-white border-t">
        <div className="w-full max-w-2xl mx-auto flex items-center space-x-3">
          <Input
            type="text"
            placeholder="Type uw bericht..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleInputSubmit()
              }
            }}
          />
          <Button onClick={handleInputSubmit}>
            <Send className="h-4 w-4 mr-2" />
            Verstuur
          </Button>
        </div>
      </div>
    </div>
  )
}
