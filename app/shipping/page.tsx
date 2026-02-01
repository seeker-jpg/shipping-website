import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Package, MapPin, Clock } from "lucide-react"

export const metadata = {
  title: "Informations de Livraison | Corely.fr",
  description: "Tout savoir sur nos delais et modes de livraison",
}

export default function ShippingPage() {
  return (
    <div className="min-h-screen circuit-bg">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-background to-purple-900/30" />
        <div className="absolute inset-0 grid-bg" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex items-center gap-4 justify-center mb-4">
            <Truck className="w-12 h-12 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Informations de Livraison</h1>
          </div>
          <p className="text-center text-xl text-muted-foreground">Livraison gratuite incluse partout en Europe</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="card-geek border-cyan-500/20 mb-8">
          <CardContent className="p-8 text-center">
            <Badge className="text-lg px-6 py-2 mb-4 bg-gradient-to-r from-cyan-600 to-purple-600">LIVRAISON GRATUITE</Badge>
            <h2 className="text-3xl font-black mb-2 text-foreground">Incluse dans le prix !</h2>
            <p className="text-muted-foreground text-lg">
              Tous nos produits sont vendus avec la livraison gratuite, aucun frais supplementaire.
            </p>
          </CardContent>
        </Card>

        <Card className="card-geek border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
              <Clock className="w-6 h-6 text-purple-400" />
              Delais de Livraison
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
                <MapPin className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="font-bold text-lg mb-2 text-foreground">France Metropolitaine</h3>
                <p className="text-muted-foreground mb-2">5 a 10 jours ouvres</p>
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">Standard</Badge>
              </div>

              <div className="p-4 rounded-lg border border-purple-500/20 bg-purple-500/5">
                <MapPin className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-bold text-lg mb-2 text-foreground">Europe (UE)</h3>
                <p className="text-muted-foreground mb-2">7 a 15 jours ouvres</p>
                <Badge variant="outline" className="border-purple-500/30 text-purple-400">Standard</Badge>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Note :</strong> Les delais peuvent varier selon la destination et les conditions locales. Les
                jours feries et weekends ne sont pas comptes dans les delais de livraison.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-geek border-cyan-500/20 mt-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
              <Package className="w-6 h-6 text-cyan-400" />
              Suivi de Colis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Des l'expedition de votre commande, vous recevrez un email avec un numero de suivi. Vous pourrez suivre
              votre colis en temps reel sur notre page de suivi.
            </p>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <h4 className="font-bold text-foreground mb-2">Comment suivre ma commande ?</h4>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>
                  Rendez-vous sur la page{" "}
                  <a href="/orders" className="text-cyan-400 hover:underline">
                    Suivi Commande
                  </a>
                </li>
                <li>Entrez votre numero de commande</li>
                <li>Consultez l'etat de votre livraison en temps reel</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card className="card-geek border-purple-500/20 mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Processus d'Expedition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-foreground">Confirmation de Commande</h4>
                  <p className="text-muted-foreground text-sm">
                    Vous recevez un email de confirmation immediatement apres le paiement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-foreground">Preparation</h4>
                  <p className="text-muted-foreground text-sm">
                    Votre commande est preparee et emballee avec soin sous 24-48h.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-foreground">Expedition</h4>
                  <p className="text-muted-foreground text-sm">
                    Votre colis est expedie et vous recevez le numero de suivi.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-foreground">Livraison</h4>
                  <p className="text-muted-foreground text-sm">Reception de votre colis a l'adresse indiquee.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-geek border-cyan-500/20 mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Conditions de Livraison</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Signature requise a la reception du colis</li>
              <li>Verifiez l'etat du colis avant de signer</li>
              <li>En cas d'absence, un avis de passage sera laisse</li>
              <li>Le colis sera conserve 14 jours en point relais</li>
              <li>Adresse de livraison modifiable avant expedition</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="card-geek border-purple-500/20 mt-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Truck className="w-8 h-8 text-cyan-400 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Probleme de Livraison ?</h3>
                <p className="text-muted-foreground mb-3">
                  Si vous rencontrez un probleme avec votre livraison, contactez-nous immediatement :
                </p>
                <p className="text-foreground font-semibold">
                  Email : <span className="text-cyan-400">corely.shop@outlook.com</span>
                  <br />Instagram : <span className="text-pink-400">@corely.fr</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
