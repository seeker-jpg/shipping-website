"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Send, Instagram } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen circuit-bg">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-background to-cyan-900/30" />
        <div className="absolute inset-0 grid-bg" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex items-center gap-4 justify-center mb-4">
            <Mail className="w-12 h-12 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Nous Contacter</h1>
          </div>
          <p className="text-center text-xl text-muted-foreground">
            Une question ? Notre equipe vous repond rapidement
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="card-geek border-purple-500/20 text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">Email</h3>
              <p className="text-muted-foreground text-sm">contact@corely.fr</p>
              <p className="text-xs text-muted-foreground mt-2">Reponse sous 24h</p>
            </CardContent>
          </Card>

          <Card className="card-geek border-purple-500/20 text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center mx-auto mb-4">
                <Instagram className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">Instagram</h3>
              <p className="text-muted-foreground text-sm">@corely.fr</p>
              <p className="text-xs text-muted-foreground mt-2">DM ouvert</p>
            </CardContent>
          </Card>

          <Card className="card-geek border-purple-500/20 text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">Localisation</h3>
              <p className="text-muted-foreground text-sm">France</p>
              <p className="text-xs text-muted-foreground mt-2">Expedition mondiale</p>
            </CardContent>
          </Card>
        </div>

        <Card className="card-geek border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Envoyez-nous un Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-foreground">Nom Complet *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jean Dupont"
                    className="bg-background/50 border-purple-500/30 focus:border-purple-400"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jean@exemple.com"
                    className="bg-background/50 border-purple-500/30 focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject" className="text-foreground">Sujet *</Label>
                <Input
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Question sur ma commande"
                  className="bg-background/50 border-purple-500/30 focus:border-purple-400"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-foreground">Message *</Label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Decrivez votre demande en detail..."
                  rows={6}
                  className="bg-background/50 border-purple-500/30 focus:border-purple-400"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full md:w-auto btn-cyber bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 font-bold" 
                disabled={submitted}
              >
                {submitted ? (
                  <>Message Envoye</>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer le Message
                  </>
                )}
              </Button>

              {submitted && (
                <p className="text-sm text-green-400 mt-2">Merci ! Nous vous repondrons dans les plus brefs delais.</p>
              )}
            </form>
          </CardContent>
        </Card>

        <Card className="card-geek border-purple-500/20 mt-8">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 text-foreground">Questions Frequentes</h3>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong className="text-purple-400">Q: Quels sont les delais de livraison ?</strong>
                <br />
                R: 5 a 15 jours ouvres selon votre localisation.
              </p>
              <p>
                <strong className="text-purple-400">Q: Puis-je suivre ma commande ?</strong>
                <br />
                R: Oui, consultez la page{" "}
                <a href="/orders" className="text-cyan-400 hover:underline">
                  Suivi Commande
                </a>
                .
              </p>
              <p>
                <strong className="text-purple-400">Q: Les produits sont-ils de qualite ?</strong>
                <br />
                R: Oui, tous nos accessoires sont de qualite premium avec garantie 1 an.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
