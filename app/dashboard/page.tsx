"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ArrowUpRight,
  Users,
  FileText,
  TrendingUp,
  Bell,
  Search,
  User,
  Settings,
  Home,
  BarChart3,
  MessageSquare,
  FileCheck,
  LogOut,
  Shield,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Sample data for recent applications
const recentApplications = [
  {
    id: "A-2023-001",
    name: "Jan de Vries",
    type: "Autoverzekering",
    date: "2023-07-15",
    status: "In behandeling",
    crossSell: "Reisverzekering",
  },
  {
    id: "A-2023-002",
    name: "Maria Jansen",
    type: "Woonverzekering",
    date: "2023-07-14",
    status: "Goedgekeurd",
    crossSell: "Rechtsbijstand",
  },
  {
    id: "A-2023-003",
    name: "Pieter Bakker",
    type: "Reisverzekering",
    date: "2023-07-13",
    status: "Wacht op informatie",
    crossSell: "Annuleringsverzekering",
  },
  {
    id: "A-2023-004",
    name: "Sophie de Groot",
    type: "Aansprakelijkheidsverzekering",
    date: "2023-07-12",
    status: "Goedgekeurd",
    crossSell: "Rechtsbijstand",
  },
  {
    id: "A-2023-005",
    name: "Thomas Visser",
    type: "Rechtsbijstandverzekering",
    date: "2023-07-11",
    status: "In behandeling",
    crossSell: "Woonverzekering",
  },
]

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 px-4 py-6 border-b">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-blue-600 p-1">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-bold">Kuiper AI</span>
          </div>
        </div>

        <div className="flex-1 overflow-auto py-4">
          <div className="px-4 mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Navigatie</h3>
            <ul className="space-y-1">
              <li>
                <Button variant="ghost" className="w-full justify-start bg-blue-50 text-blue-700">
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Aanvragen
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Klanten
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Rapportages
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chatbot Beheer
                </Button>
              </li>
            </ul>
          </div>

          <div className="px-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Beheer</h3>
            <ul className="space-y-1">
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Instellingen
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Compliance
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 p-4">
          <ul className="space-y-1">
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Profiel
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <LogOut className="h-4 w-4 mr-2" />
                Uitloggen
              </Button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500">Welkom terug, Adviseur</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Zoeken..." className="w-64 pl-8 rounded-lg border-gray-300" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                3
              </span>
            </Button>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Totaal Aanvragen</CardTitle>
                <FileText className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">192</div>
                <p className="text-xs text-gray-500">
                  <span className="text-green-500 flex items-center">
                    +12% <ArrowUpRight className="h-3 w-3 ml-1" />
                  </span>{" "}
                  t.o.v. vorige maand
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Conversiepercentage</CardTitle>
                <TrendingUp className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">64%</div>
                <p className="text-xs text-gray-500">
                  <span className="text-green-500 flex items-center">
                    +5% <ArrowUpRight className="h-3 w-3 ml-1" />
                  </span>{" "}
                  t.o.v. vorige maand
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Cross-Selling Kansen</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87</div>
                <p className="text-xs text-gray-500">
                  <span className="text-green-500 flex items-center">
                    +18% <ArrowUpRight className="h-3 w-3 ml-1" />
                  </span>{" "}
                  t.o.v. vorige maand
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Gemiddelde Verwerkingstijd</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-gray-500"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4 dagen</div>
                <p className="text-xs text-gray-500">
                  <span className="text-green-500 flex items-center">
                    -18% <ArrowUpRight className="h-3 w-3 ml-1" />
                  </span>{" "}
                  t.o.v. vorige maand
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Aanvragen & Conversies</CardTitle>
                <CardDescription>Overzicht van aanvragen en conversies per maand</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center p-6">
                    <BarChart3 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-500">Grafiek data is momenteel niet beschikbaar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Verdeling Verzekeringstypen</CardTitle>
                <CardDescription>Verdeling van aanvragen per verzekeringstype</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center p-6">
                    <div className="flex justify-center mb-4">
                      <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <p className="text-gray-500">Grafiek data is momenteel niet beschikbaar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Recente Aanvragen</CardTitle>
                <CardDescription>Overzicht van de meest recente verzekeringsaanvragen</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aanvraag ID</TableHead>
                      <TableHead>Klant</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Datum</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Cross-Sell Kans</TableHead>
                      <TableHead>Actie</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.id}</TableCell>
                        <TableCell>{app.name}</TableCell>
                        <TableCell>{app.type}</TableCell>
                        <TableCell>{new Date(app.date).toLocaleDateString("nl-NL")}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              app.status === "Goedgekeurd"
                                ? "success"
                                : app.status === "In behandeling"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {app.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                            {app.crossSell}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>AI Prestatie-indicatoren</CardTitle>
                <CardDescription>Effectiviteit van AI-componenten in het aanvraagproces</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Chatbot Nauwkeurigheid</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Cross-Sell Conversie</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Formulier Voltooiingspercentage</span>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Automatische Goedkeuringen</span>
                      <span className="text-sm font-medium">74%</span>
                    </div>
                    <Progress value={74} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Compliance & Ethiek</CardTitle>
                <CardDescription>Monitoring van compliance en ethische aspecten van AI-besluitvorming</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">AVG Compliance</span>
                      <span className="text-sm font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Bias Detectie & Correctie</span>
                      <span className="text-sm font-medium">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Transparantie Score</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Menselijke Supervisie Ratio</span>
                      <span className="text-sm font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
