import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Shield,
  Anchor,
  Car,
  Heart,
  CheckCircle,
  Zap,
  MessageSquare,
  ArrowRight,
  Award,
  Building,
  User,
} from "lucide-react"

export default function OverOnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">Kuiper Verzekeringen</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="/" className="text-blue-900 hover:text-blue-600 font-medium">
              Home
            </a>
            <a href="#" className="text-blue-900 hover:text-blue-600 font-medium">
              Producten
            </a>
            <a href="/over-ons" className="text-blue-900 hover:text-blue-600 font-medium border-b-2 border-blue-600">
              Over Ons
            </a>
            <a href="#" className="text-blue-900 hover:text-blue-600 font-medium">
              Contact
            </a>
          </nav>
          <Button className="bg-blue-600 hover:bg-blue-700">Inloggen</Button>
        </div>
      </header>

      <main className="container mx-auto py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Over Kuiper Verzekeringen</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Al meer dan 75 jaar uw betrouwbare partner in verzekeringen.
            <span className="font-semibold text-blue-700"> Voelt als familie.</span>
          </p>
        </section>

        {/* Company Profile & Core Values */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-blue-50 rounded-xl p-6 shadow-inner flex items-center justify-center">
              <div className="text-center">
                <Building className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                <p className="text-blue-800 font-medium">Kuiper Verzekeringen kantoor</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Bedrijfsprofiel & Kernwaarden</h2>
              <p className="text-gray-600 mb-6">
                Kuiper Verzekeringen is een derde generatie familiebedrijf, opgericht in 1946, dat opereert met een
                sterk familiegevoel. Al meer dan 75 jaar staan wij voor persoonlijke service en betrouwbaar advies op
                maat.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-blue-100 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800">Persoonlijke aanpak</h3>
                    <p className="text-gray-600">
                      Wij geloven in het opbouwen van langdurige relaties met onze klanten, gebaseerd op vertrouwen en
                      persoonlijk contact.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-blue-100 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800">Betrouwbaar advies</h3>
                    <p className="text-gray-600">
                      Onze adviseurs bieden eerlijk en transparant advies, afgestemd op uw specifieke situatie en
                      behoeften.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-blue-100 p-2 rounded-full">
                    <Zap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800">Innovatie & Traditie</h3>
                    <p className="text-gray-600">
                      Wij investeren in moderne automatisering en ICT-oplossingen, zonder het persoonlijke contact uit
                      het oog te verliezen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Onze Geschiedenis</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>

            {/* 1946 */}
            <div className="relative mb-12">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3">
                <div className="bg-blue-600 rounded-full h-6 w-6 border-4 border-white"></div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-right pr-8">
                  <h3 className="font-bold text-blue-800 text-xl">1946</h3>
                  <p className="text-gray-600">Oprichting van Kuiper Verzekeringen als familiebedrijf</p>
                </div>
                <div className="pl-8">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-center text-blue-800">Oprichting Kuiper Verzekeringen</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 1970s */}
            <div className="relative mb-12">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3">
                <div className="bg-blue-600 rounded-full h-6 w-6 border-4 border-white"></div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-right pr-8">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Anchor className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-center text-blue-800">Specialisatie in nicheverzekeringen</p>
                  </div>
                </div>
                <div className="pl-8">
                  <h3 className="font-bold text-blue-800 text-xl">Jaren '70</h3>
                  <p className="text-gray-600">
                    Ontwikkeling van specialisatie in nicheverzekeringen voor pleziervaartuigen en klassieke auto's
                  </p>
                </div>
              </div>
            </div>

            {/* 2000s */}
            <div className="relative mb-12">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3">
                <div className="bg-blue-600 rounded-full h-6 w-6 border-4 border-white"></div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-right pr-8">
                  <h3 className="font-bold text-blue-800 text-xl">Begin 21e eeuw</h3>
                  <p className="text-gray-600">Investering in digitale innovatie met behoud van persoonlijke service</p>
                </div>
                <div className="pl-8">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-center text-blue-800">Digitale innovatie</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Today */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3">
                <div className="bg-blue-600 rounded-full h-6 w-6 border-4 border-white"></div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-right pr-8">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-center text-blue-800">Kuiper Verzekeringen vandaag</p>
                  </div>
                </div>
                <div className="pl-8">
                  <h3 className="font-bold text-blue-800 text-xl">Vandaag</h3>
                  <p className="text-gray-600">
                    Derde generatie familiebedrijf dat traditie combineert met moderne technologie zoals onze AI
                    Aanvraagstraat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise & Niche Markets */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Expertise & Nichemarkten</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="h-48 bg-blue-100 relative flex items-center justify-center">
                <Anchor className="h-24 w-24 text-blue-600" />
                <div className="absolute top-4 left-4 bg-blue-600 text-white p-2 rounded-full">
                  <Anchor className="h-6 w-6" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">Pleziervaartuigen</h3>
                <p className="text-gray-600 mb-4">
                  Sinds de jaren '70 zijn wij gespecialiseerd in verzekeringen voor pleziervaartuigen. Onze expertise op
                  dit gebied heeft ons (inter)nationale bekendheid opgeleverd als specialist.
                </p>
                <p className="text-gray-600">
                  Of het nu gaat om een sloep, zeilboot of motorjacht, wij bieden op maat gemaakte verzekeringen die
                  aansluiten bij uw specifieke vaartuig en gebruik.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-blue-100 relative flex items-center justify-center">
                <Car className="h-24 w-24 text-blue-600" />
                <div className="absolute top-4 left-4 bg-blue-600 text-white p-2 rounded-full">
                  <Car className="h-6 w-6" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">Klassieke Auto's</h3>
                <p className="text-gray-600 mb-4">
                  Als liefhebbers van klassieke auto's begrijpen wij de unieke waarde van uw oldtimer of youngtimer.
                  Onze specialistische verzekeringen zijn ontwikkeld met oog voor detail.
                </p>
                <p className="text-gray-600">
                  Wij bieden taxatiewaarde-verzekeringen, flexibele kilometrages en specifieke voorwaarden die passen
                  bij het gebruik van uw klassieke auto.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Service & Independence */}
        <section className="mb-16 bg-blue-50 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Service & Onafhankelijkheid</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Volledig Zelfstandig</h3>
              <p className="text-gray-600">
                Wij opereren volledig zelfstandig, zonder invloed van externe financiële instellingen. Dit geeft ons de
                vrijheid om altijd in uw belang te handelen en de beste oplossingen te bieden.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Efficiënte Service</h3>
              <p className="text-gray-600">
                Onze onafhankelijkheid zorgt voor snelle polisafgifte, efficiënte schadeafhandeling en de mogelijkheid
                om unieke verzekeringsoplossingen samen te stellen die perfect aansluiten bij uw behoeften.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Persoonlijk Advies</h3>
              <p className="text-gray-600">
                Hoewel u veel zaken zelf online kunt regelen via onze moderne ICT-oplossingen, staat persoonlijk advies
                bij ons altijd centraal. Onze adviseurs staan voor u klaar met deskundig advies.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Ons Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-32 h-32 mx-auto mb-4 overflow-hidden relative flex items-center justify-center">
                <User className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="font-bold text-blue-800">Jan Kuiper</h3>
              <p className="text-gray-600 text-sm">Directeur</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-32 h-32 mx-auto mb-4 overflow-hidden relative flex items-center justify-center">
                <User className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="font-bold text-blue-800">Marieke de Vries</h3>
              <p className="text-gray-600 text-sm">Hoofd Verzekeringen</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-32 h-32 mx-auto mb-4 overflow-hidden relative flex items-center justify-center">
                <User className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="font-bold text-blue-800">Peter Jansen</h3>
              <p className="text-gray-600 text-sm">Specialist Klassieke Auto's</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-32 h-32 mx-auto mb-4 overflow-hidden relative flex items-center justify-center">
                <User className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="font-bold text-blue-800">Sophie Bakker</h3>
              <p className="text-gray-600 text-sm">Specialist Pleziervaartuigen</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Wat Klanten Zeggen</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 mr-4 overflow-hidden relative flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-800">Thomas van Dijk</h3>
                  <p className="text-gray-500 text-sm">Klant sinds 2005</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Bij Kuiper Verzekeringen voel ik me echt gehoord. Ze nemen de tijd om mijn situatie te begrijpen en
                komen met oplossingen die perfect bij mij passen. Het voelt inderdaad als familie!"
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 mr-4 overflow-hidden relative flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-800">Laura Smit</h3>
                  <p className="text-gray-500 text-sm">Klant sinds 2010</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Mijn klassieke Porsche is bij Kuiper in goede handen. Hun kennis van klassieke auto's is indrukwekkend
                en de service is altijd persoonlijk. Ik raad ze aan bij alle mede-liefhebbers!"
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 mr-4 overflow-hidden relative flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-800">Erik Visser</h3>
                  <p className="text-gray-500 text-sm">Klant sinds 2015</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Toen ik schade had aan mijn boot, was Kuiper er direct voor me. De afhandeling verliep snel en zonder
                gedoe. Dat is precies wat je wilt van een verzekeraar!"
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white rounded-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Ervaar onze AI Aanvraagstraat</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Ontdek hoe wij moderne technologie combineren met onze persoonlijke service. Probeer onze interactieve AI
              Aanvraagstraat en ervaar het verschil.
            </p>
          </div>
          <div className="flex justify-center">
            <Link href="/aanvraag">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-6 py-6">
                Start de Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Erkenningen & Certificeringen</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mb-2">
                  <Award className="h-12 w-12 text-blue-600" />
                </div>
                <p className="text-gray-600 text-sm max-w-[120px] mx-auto">Certificering {i}</p>
              </div>
            ))}
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
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-blue-200 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
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
