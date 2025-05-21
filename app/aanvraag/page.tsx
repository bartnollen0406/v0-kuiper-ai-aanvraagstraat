"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, MessageSquare, ArrowRight, Anchor, Car, User } from "lucide-react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Calendar, FileText } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { nl } from "date-fns/locale"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

// Types for our chat messages
type MessageType = "text" | "options" | "input" | "date" | "select" | "radio" | "checkbox" | "summary"

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
  kenteken?: string
  merk?: string
  model?: string
  bouwjaar?: string
  brandstof?: string
  gebruik?: string
  hoofdbestuurder?: string
  dekking?: string
  eigenRisico?: string
  aanvullendeDekkingen?: string[]
  ingangsdatum?: string
}

export default function AanvraagPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({})
  const [progress, setProgress] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Define the conversation flow
  const conversationSteps = [
    {
      id: "welcome",
      message:
        "Welkom bij de Kuiper AI Aanvraagstraat! Ik ben uw virtuele assistent en zal u helpen bij het aanvragen van een autoverzekering. Laten we beginnen met uw persoonlijke gegevens.",
      type: "text" as MessageType,
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
      message: "En wat is uw telefoonnummer?",
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
      id: "land",
      message: "In welk land woont u?",
      type: "select" as MessageType,
      field: "land",
      options: [
        { value: "nederland", label: "Nederland" },
        { value: "belgie", label: "België" },
        { value: "duitsland", label: "Duitsland" },
      ],
    },
    {
      id: "voertuig_intro",
      message: "Bedankt voor uw persoonlijke gegevens! Laten we nu verdergaan met de informatie over uw voertuig.",
      type: "text" as MessageType,
    },
    {
      id: "kenteken",
      message: "Wat is het kenteken van uw voertuig?",
      type: "input" as MessageType,
      field: "kenteken",
      placeholder: "bijv. AB-123-C",
    },
    {
      id: "merk",
      message: "Wat is het merk van uw auto?",
      type: "input" as MessageType,
      field: "merk",
      placeholder: "bijv. Volkswagen",
    },
    {
      id: "model",
      message: "En welk model is het?",
      type: "input" as MessageType,
      field: "model",
      placeholder: "bijv. Golf",
    },
    {
      id: "bouwjaar",
      message: "Wat is het bouwjaar van uw auto?",
      type: "input" as MessageType,
      field: "bouwjaar",
      placeholder: "bijv. 2019",
    },
    {
      id: "brandstof",
      message: "Welke brandstof gebruikt uw auto?",
      type: "select" as MessageType,
      field: "brandstof",
      options: [
        { value: "benzine", label: "Benzine" },
        { value: "diesel", label: "Diesel" },
        { value: "elektrisch", label: "Elektrisch" },
        { value: "hybride", label: "Hybride" },
      ],
    },
    {
      id: "gebruik",
      message: "Hoe gebruikt u uw auto voornamelijk?",
      type: "radio" as MessageType,
      field: "gebruik",
      options: [
        { value: "particulier", label: "Particulier gebruik" },
        { value: "zakelijk", label: "Zakelijk gebruik" },
        { value: "beide", label: "Beide" },
      ],
    },
    {
      id: "hoofdbestuurder",
      message: "Wie is de hoofdbestuurder van de auto?",
      type: "radio" as MessageType,
      field: "hoofdbestuurder",
      options: [
        { value: "aanvrager", label: "Ikzelf (aanvrager)" },
        { value: "partner", label: "Mijn partner" },
        { value: "kind", label: "Mijn kind" },
      ],
    },
    {
      id: "dekking_intro",
      message: "Nu gaan we kijken welke dekking het beste bij u past.",
      type: "text" as MessageType,
    },
    {
      id: "dekking",
      message: "Welke dekking wilt u voor uw autoverzekering?",
      type: "radio" as MessageType,
      field: "dekking",
      options: [
        { value: "wa", label: "WA (Wettelijke Aansprakelijkheid) - €9,50/maand" },
        { value: "waplus", label: "WA+ (WA + Beperkt Casco) - €16,75/maand" },
        { value: "allrisk", label: "All-Risk (Volledig Casco) - €24,95/maand" },
      ],
    },
    {
      id: "eigenRisico",
      message: "Welk eigen risico wilt u?",
      type: "radio" as MessageType,
      field: "eigenRisico",
      options: [
        { value: "0", label: "€0 (+€5,00/maand)" },
        { value: "150", label: "€150 (+€2,50/maand)" },
        { value: "350", label: "€350 (standaard)" },
        { value: "500", label: "€500 (-€1,75/maand)" },
      ],
    },
    {
      id: "aanvullendeDekkingen",
      message: "Wilt u aanvullende dekkingen toevoegen aan uw verzekering?",
      type: "checkbox" as MessageType,
      field: "aanvullendeDekkingen",
      options: [
        { value: "rechtsbijstand", label: "Rechtsbijstandverzekering (+€4,95/maand)" },
        { value: "inzittenden", label: "Schadeverzekering Inzittenden (+€3,50/maand)" },
        { value: "pechhulp", label: "Pechhulp (+€2,75/maand)" },
        { value: "noreduction", label: "No-claim beschermer (+€3,25/maand)" },
      ],
    },
    {
      id: "ingangsdatum",
      message: "Wat is de gewenste ingangsdatum van uw verzekering?",
      type: "date" as MessageType,
      field: "ingangsdatum",
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
  ]

  // Initialize the chat with the first message
  useEffect(() => {
    const timer = setTimeout(() => {
      addBotMessage(conversationSteps[0])
      setProgress(5)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Function to add a bot message
  const addBotMessage = (step: any) => {
    setIsTyping(true)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          type: step.type,
          content: step.message,
          options: step.options,
          field: step.field,
          placeholder: step.placeholder,
          required: step.required !== false,
          summary: step.type === "summary" ? formData : undefined,
        },
      ])
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

    // Update form data if field is provided
    if (field) {
      setFormData((prev) => ({
        ...prev,
        [field]: content,
      }))
    }
  }

  // Function to handle user input submission
  const handleInputSubmit = () => {
    if (!inputValue.trim()) return

    const currentConversationStep = conversationSteps[currentStep]
    addUserMessage(inputValue, currentConversationStep.field)
    setInputValue("")

    // Move to next step
    goToNextStep()
  }

  // Function to handle option selection
  const handleOptionSelect = (value: string, label: string, field?: string) => {
    addUserMessage(label, field)

    // Handle confirmation step
    if (field === undefined && currentStep === conversationSteps.length - 1) {
      if (value === "ja") {
        // Submit the form
        setTimeout(() => {
          router.push("/aanvraag/bevestiging")
        }, 1500)
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

    // Base premium based on coverage
    if (formData.dekking === "wa") basePremium = 9.5
    else if (formData.dekking === "waplus") basePremium = 16.75
    else if (formData.dekking === "allrisk") basePremium = 24.95

    // Adjust for deductible
    if (formData.eigenRisico === "0") basePremium += 5.0
    else if (formData.eigenRisico === "150") basePremium += 2.5
    else if (formData.eigenRisico === "500") basePremium -= 1.75

    // Add additional coverages
    if (formData.aanvullendeDekkingen) {
      const dekkingen = Array.isArray(formData.aanvullendeDekkingen)
        ? formData.aanvullendeDekkingen
        : [formData.aanvullendeDekkingen]

      if (dekkingen.includes("rechtsbijstand")) basePremium += 4.95
      if (dekkingen.includes("inzittenden")) basePremium += 3.5
      if (dekkingen.includes("pechhulp")) basePremium += 2.75
      if (dekkingen.includes("noreduction")) basePremium += 3.25
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
                <div className="bg-blue-50 rounded-lg p-3 text-gray-800">{message.content}</div>
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
                      Bevestigen
                    </Button>
                  </div>
                </div>
              )}

              {message.type === "summary" && (
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-gray-800">{message.content}</div>
                  <Card className="w-full">
                    <CardContent className="p-4 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm flex items-center">
                          <User className="h-4 w-4 mr-2 text-blue-600" />
                          Persoonlijke gegevens
                        </h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">Naam:</span> {formData.voornaam} {formData.achternaam}
                          </div>
                          <div>
                            <span className="text-gray-500">Geboortedatum:</span>{" "}
                            {formData.geboortedatum
                              ? format(new Date(formData.geboortedatum), "PPP", { locale: nl })
                              : ""}
                          </div>
                          <div>
                            <span className="text-gray-500">E-mail:</span> {formData.email}
                          </div>
                          <div>
                            <span className="text-gray-500">Telefoon:</span> {formData.telefoon}
                          </div>
                          <div>
                            <span className="text-gray-500">Adres:</span> {formData.adres}
                          </div>
                          <div>
                            <span className="text-gray-500">Postcode en plaats:</span> {formData.postcode}{" "}
                            {formData.plaats}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium text-sm flex items-center">
                          <Car className="h-4 w-4 mr-2 text-blue-600" />
                          Voertuiggegevens
                        </h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">Kenteken:</span> {formData.kenteken}
                          </div>
                          <div>
                            <span className="text-gray-500">Merk en model:</span> {formData.merk} {formData.model}
                          </div>
                          <div>
                            <span className="text-gray-500">Bouwjaar:</span> {formData.bouwjaar}
                          </div>
                          <div>
                            <span className="text-gray-500">Brandstof:</span> {formData.brandstof}
                          </div>
                          <div>
                            <span className="text-gray-500">Gebruik:</span> {formData.gebruik}
                          </div>
                          <div>
                            <span className="text-gray-500">Hoofdbestuurder:</span> {formData.hoofdbestuurder}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium text-sm flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-blue-600" />
                          Verzekeringsdekking
                        </h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">Dekking:</span>{" "}
                            {formData.dekking === "wa"
                              ? "WA (Wettelijke Aansprakelijkheid)"
                              : formData.dekking === "waplus"
                                ? "WA+ (WA + Beperkt Casco)"
                                : formData.dekking === "allrisk"
                                  ? "All-Risk (Volledig Casco)"
                                  : ""}
                          </div>
                          <div>
                            <span className="text-gray-500">Eigen risico:</span> €{formData.eigenRisico}
                          </div>
                          <div>
                            <span className="text-gray-500">Aanvullende dekkingen:</span>{" "}
                            {Array.isArray(formData.aanvullendeDekkingen) && formData.aanvullendeDekkingen.length > 0
                              ? formData.aanvullendeDekkingen.join(", ")
                              : "Geen"}
                          </div>
                          <div>
                            <span className="text-gray-500">Ingangsdatum:</span>{" "}
                            {formData.ingangsdatum
                              ? format(new Date(formData.ingangsdatum), "PPP", { locale: nl })
                              : ""}
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Totale premie</h3>
                            <p className="text-xs text-gray-500">Maandelijks bedrag inclusief assurantiebelasting</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-blue-700">€{calculatePremium()}</p>
                            <p className="text-xs text-gray-500">per maand</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        )
      } else {
        return (
          <div key={message.id} className="flex items-start justify-end mb-4">
            <div className="flex flex-col items-end max-w-[80%]">
              <div className="bg-blue-600 rounded-lg p-3 text-white">{message.content}</div>
            </div>
            <Avatar className="ml-2 h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        )
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">Kuiper Verzekeringen</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-blue-900 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link href="#producten" className="text-blue-900 hover:text-blue-600 font-medium">
              Producten
            </Link>
            <Link href="/over-ons" className="text-blue-900 hover:text-blue-600 font-medium">
              Over Ons
            </Link>
            <Link href="#contact" className="text-blue-900 hover:text-blue-600 font-medium">
              Contact
            </Link>
          </nav>
          <Button className="bg-blue-600 hover:bg-blue-700">Inloggen</Button>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Kies Uw Verzekering</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Selecteer het type verzekering dat u wilt aanvragen via onze AI Aanvraagstraat.
          </p>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-blue-100 relative flex items-center justify-center">
              <Anchor className="h-24 w-24 text-blue-600" />
            </div>
            <CardHeader>
              <CardTitle>Pleziervaartuigverzekering</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Bescherm uw boot met onze op maat gemaakte pleziervaartuigverzekering. Al meer dan 50 jaar zijn wij
                specialist op dit gebied.
              </p>
              <Link href="/aanvraag/dialoog">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Aanvraag <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-blue-100 relative flex items-center justify-center">
              <Car className="h-24 w-24 text-blue-600" />
            </div>
            <CardHeader>
              <CardTitle>Klassieke Autoverzekering</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Speciale verzekering voor uw klassieke auto of youngtimer. Met taxatiewaarde-dekking en flexibele
                voorwaarden.
              </p>
              <Link href="/aanvraag/dialoog?type=auto">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Aanvraag <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-blue-100 relative flex items-center justify-center">
              <MessageSquare className="h-24 w-24 text-blue-600" />
            </div>
            <CardHeader>
              <CardTitle>Persoonlijk Adviesgesprek</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Liever persoonlijk advies? Plan een gesprek met één van onze verzekeringsadviseurs voor maatwerk.
              </p>
              <Link href="/adviesgesprek">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Afspraak Maken <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Waarom Kiezen voor Kuiper Verzekeringen?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Al meer dan 75 jaar bieden wij specialistische verzekeringen met persoonlijke service en expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-blue-800 mb-2">Specialistische Kennis</h3>
              <p className="text-gray-600">
                Onze adviseurs zijn experts op het gebied van pleziervaartuigen en klassieke auto's.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-blue-800 mb-2">Persoonlijke Service</h3>
              <p className="text-gray-600">
                Wij combineren moderne technologie met persoonlijk advies voor de beste klantervaring.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-blue-800 mb-2">Snelle Afhandeling</h3>
              <p className="text-gray-600">
                Dankzij onze zelfstandigheid kunnen we snel schakelen bij polisafgifte en schadeafhandeling.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Kuiper Verzekeringen</h3>
              <p className="text-blue-200">
                Innovatieve verzekeringsoplossingen met een persoonlijke aanpak sinds 1946.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Producten</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Pleziervaartuigen
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Klassieke Auto's
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Overige Verzekeringen
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-blue-200">info@kuiperverzekeringen.nl</li>
                <li className="text-blue-200">+31 (0)20 123 4567</li>
                <li className="text-blue-200">Verzekeringsweg 1, Amsterdam</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Volg Ons</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-200 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-blue-200 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-blue-200 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427a4.902 4.902 0 011.772 1.153A4.902 4.902 0 0122 12c0 2.43-4.477 2.784-10 2.784S2 14.523 2 12c0-2.43 4.477-2.784 10-2.784zm-3.42 8.568a5.144 5.144 0 00-3.42 8.568 5.144 5.144 0 008.568 3.42 5.144 5.144 0 003.42-8.568 5.144 5.144 0 00-8.568-3.42zm0-12.736a5.144 5.144 0 00-3.42-8.568A5.144 5.144 0 008.341 6.187a5.144 5.144 0 003.42 8.568z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
