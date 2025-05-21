import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, CheckCircle2, ArrowRight, FileText, Download, Calendar } from "lucide-react"

export default function BevestigingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-900">Kuiper Verzekeringen</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Help
            </Button>
            <Button variant="ghost" size="sm">
              Contact
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Aanvraag succesvol ingediend!</h1>
            <p className="text-lg text-gray-600">
              Uw aanvraag voor een autoverzekering is ontvangen en wordt verwerkt.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Aanvraaggegevens</CardTitle>
              <CardDescription>Overzicht van uw ingediende aanvraag</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Aanvraagnummer</p>
                  <p className="font-medium">A-2023-006</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Datum</p>
                  <p className="font-medium">{new Date().toLocaleDateString("nl-NL")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-blue-600">In behandeling</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-blue-600" />
                    Verzekeringsinformatie
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Product:</span>
                      <span>Autoverzekering WA</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Kenteken:</span>
                      <span>AB-123-C</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Voertuig:</span>
                      <span>Volkswagen Golf (2019)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Premie:</span>
                      <span className="font-medium">€9,50 per maand</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                    Tijdlijn
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <div className="mr-2 h-4 w-4 rounded-full bg-green-500 mt-0.5"></div>
                      <div>
                        <p className="font-medium">Aanvraag ingediend</p>
                        <p className="text-gray-500">{new Date().toLocaleString("nl-NL")}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 h-4 w-4 rounded-full bg-gray-300 mt-0.5"></div>
                      <div>
                        <p className="font-medium">Beoordeling</p>
                        <p className="text-gray-500">Verwacht binnen 24 uur</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 h-4 w-4 rounded-full bg-gray-300 mt-0.5"></div>
                      <div>
                        <p className="font-medium">Polis activatie</p>
                        <p className="text-gray-500">Na goedkeuring</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex flex-col sm:flex-row gap-3 sm:justify-between">
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download aanvraagbevestiging
                </Button>
                <Button variant="outline" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Bekijk voorwaarden
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">Wat gebeurt er nu?</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-200 text-blue-800 font-medium mr-3 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Beoordeling van uw aanvraag</p>
                    <p className="text-blue-700">
                      Onze AI-systemen en verzekeringsexperts beoordelen uw aanvraag. Dit duurt meestal niet langer dan
                      24 uur.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-200 text-blue-800 font-medium mr-3 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Bevestigingsmail</p>
                    <p className="text-blue-700">
                      U ontvangt een e-mail met de bevestiging van uw verzekering en uw polisdocumenten.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-200 text-blue-800 font-medium mr-3 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Start van de dekking</p>
                    <p className="text-blue-700">
                      Uw verzekering gaat in op de door u gekozen ingangsdatum (01-08-2023).
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Ontdek meer van Kuiper Verzekeringen</h2>
            <p className="text-gray-600">Bekijk onze andere verzekeringen die passen bij uw situatie</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Woonverzekering</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-500">Bescherm uw woning en inboedel tegen schade en diefstal.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Meer informatie
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Reisverzekering</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-500">Zorgeloos op reis met onze uitgebreide reisverzekering.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Meer informatie
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Aansprakelijkheid</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-500">Bescherming tegen schade die u aan anderen veroorzaakt.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Meer informatie
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/dashboard" passHref>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Ga naar uw dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Kuiper Verzekeringen. Alle rechten voorbehouden.</p>
            <p className="mt-2">
              <a href="#" className="text-blue-600 hover:underline">
                Privacybeleid
              </a>{" "}
              •
              <a href="#" className="text-blue-600 hover:underline ml-2">
                Algemene voorwaarden
              </a>{" "}
              •
              <a href="#" className="text-blue-600 hover:underline ml-2">
                Contact
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
