import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Clock, BarChart3, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function Home() {
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
        <section className="text-center mb-16 relative py-16 bg-blue-50 rounded-xl">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Kuiper AI Aanvraagstraat</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Een intelligente oplossing die het aanvraagproces van verzekeringen stroomlijnt en personaliseert met
              behulp van AI-technologie.
            </p>
            <div className="mt-8">
              <Link href="/aanvraag">
                <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-6 py-6">
                  Start Uw Aanvraag <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Intelligente Begeleiding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Onze AI-assistent begeleidt u stap voor stap door het aanvraagproces, gepersonaliseerd op basis van uw
                behoeften.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Predictieve Analyses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Wij analyseren uw gegevens om relevante aanvullende verzekeringen voor te stellen die passen bij uw
                situatie.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>AI-Chatbots</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Onze chatbots staan 24/7 klaar om uw vragen te beantwoorden en u te helpen bij het afhandelen van
                schades.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Snelle Verwerking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Dankzij geautomatiseerde workflows worden uw aanvragen en schademeldingen snel en efficiënt verwerkt.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Intelligente Aanvraagbegeleiding</h2>
              <p className="text-gray-600 mb-4">
                Onze AI-assistent analyseert uw klantprofiel en past het aanvraagformulier automatisch aan op basis van
                uw specifieke situatie en voorkeuren.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span>Gepersonaliseerde formulieren op basis van klantgeschiedenis</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span>Stap-voor-stap begeleiding met contextgevoelige hulp</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span>Automatische validatie van ingevoerde gegevens</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span>Slimme suggesties voor optimale dekking</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 shadow-inner flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                <p className="text-blue-800 font-medium">AI-gestuurde aanvraagbegeleiding</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-blue-50 rounded-xl p-6 shadow-inner flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                <p className="text-blue-800 font-medium">Dashboard voor adviseurs</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Centraal Dashboard</h2>
              <p className="text-gray-600 mb-4">
                Ons realtime dashboard biedt zowel adviseurs als management inzicht in lopende aanvragen, klantgedrag en
                cross-selling resultaten.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span>Realtime inzicht in de status van aanvragen</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span>Gedetailleerde klantprofielen met gedragsanalyse</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span>Prestatie-indicatoren voor cross-selling campagnes</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span>Aanpasbare rapportages en visualisaties</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Technische Basis</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Onze oplossing is gebouwd op geavanceerde technologieën die naadloos integreren met uw bestaande systemen.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Machine Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Geavanceerde algoritmes die leren van klantinteracties en continu verbeteren voor nauwkeurigere
                  voorspellingen en aanbevelingen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Natural Language Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Technologie die natuurlijke taal begrijpt voor effectieve communicatie via chatbots en het analyseren
                  van klantfeedback.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cloud-Architectuur</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Schaalbare en veilige cloud-infrastructuur die zorgt voor hoge beschikbaarheid, snelle prestaties en
                  eenvoudige integratie.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-blue-50 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">Ethische en Juridische Overwegingen</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Transparantie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Wij zorgen voor volledige transparantie over hoe AI-beslissingen worden genomen, zodat klanten
                  begrijpen waarom bepaalde aanbevelingen worden gedaan.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy (AVG)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Onze oplossing voldoet volledig aan de AVG-wetgeving, met strikte controles op gegevensverwerking en
                  -opslag om de privacy van klanten te waarborgen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bias Controle</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We monitoren en corrigeren actief mogelijke vooroordelen in onze AI-algoritmes om eerlijke en
                  rechtvaardige besluitvorming te garanderen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Menselijke Supervisie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Kritieke beslissingen worden altijd gecontroleerd door menselijke experts, die de uiteindelijke
                  verantwoordelijkheid dragen voor belangrijke adviezen.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Klaar om te beginnen?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Ontdek hoe de Kuiper AI Aanvraagstraat uw verzekeringsprocessen kan transformeren.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/aanvraag">
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-6 py-6">Demo Aanvragen</Button>
            </Link>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-6 py-6">
              Meer Informatie
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white py-12 mt-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Kuiper Verzekeringen</h3>
              <p className="text-blue-200">Innovatieve verzekeringsoplossingen met de kracht van AI.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Producten</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Particuliere Verzekeringen
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Zakelijke Verzekeringen
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Pensioen
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Over Ons</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Ons Verhaal
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Carrière
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
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>© {new Date().getFullYear()} Kuiper Verzekeringen. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
