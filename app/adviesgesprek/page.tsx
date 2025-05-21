import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export default function AdviesgesprekPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">Kuiper Verzekeringen</span>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Inloggen</Button>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Persoonlijk Adviesgesprek</h1>
            <p className="text-gray-600 mb-6">
              Plan een gesprek met één van onze verzekeringsadviseurs voor persoonlijk advies op maat.
            </p>
            <div className="bg-blue-50 p-8 rounded-lg shadow-md mb-8 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                <p className="text-blue-800 font-medium">Onze adviseurs staan voor u klaar</p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Maak een afspraak</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Vul het onderstaande formulier in om een afspraak te maken met één van onze verzekeringsadviseurs. We
                nemen binnen 24 uur contact met u op om een geschikt moment te plannen.
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="voornaam" className="text-sm font-medium">
                      Voornaam
                    </label>
                    <input
                      id="voornaam"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Uw voornaam"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="achternaam" className="text-sm font-medium">
                      Achternaam
                    </label>
                    <input
                      id="achternaam"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Uw achternaam"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    E-mailadres
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="uw.email@voorbeeld.nl"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="telefoon" className="text-sm font-medium">
                    Telefoonnummer
                  </label>
                  <input
                    id="telefoon"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="06 12345678"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="onderwerp" className="text-sm font-medium">
                    Onderwerp
                  </label>
                  <select id="onderwerp" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="">Selecteer een onderwerp</option>
                    <option value="boot">Pleziervaartuigverzekering</option>
                    <option value="auto">Klassieke autoverzekering</option>
                    <option value="anders">Anders</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="bericht" className="text-sm font-medium">
                    Uw vraag of opmerking
                  </label>
                  <textarea
                    id="bericht"
                    className="w-full p-2 border border-gray-300 rounded-md h-32"
                    placeholder="Beschrijf hier kort waar u advies over wilt"
                  ></textarea>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">Verstuur aanvraag</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
