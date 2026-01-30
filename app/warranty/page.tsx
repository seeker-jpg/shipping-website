import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Check } from "lucide-react"

export const metadata = {
  title: "Informations Garantie | Corely.fr",
  description: "Details des garanties et protection produits",
}

export default function WarrantyPage() {
  return (
    <div className="min-h-screen circuit-bg">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-background to-cyan-900/30" />
        <div className="absolute inset-0 grid-bg" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex items-center gap-4 justify-center mb-4">
            <Shield className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Informations Garantie</h1>
          </div>
          <p className="text-center text-xl text-muted-foreground">Protegez votre investissement</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="card-geek border-purple-500/20 mb-8">
          <CardContent className="p-8 text-center">
            <Badge className="text-lg px-6 py-2 mb-4 bg-gradient-to-r from-purple-600 to-cyan-600">GARANTIE 1 AN</Badge>
            <h2 className="text-3xl font-black mb-2 text-foreground">Tous nos accessoires sont garantis</h2>
            <p className="text-muted-foreground text-lg">
              Qualite premium avec garantie constructeur sur tous nos produits
            </p>
          </CardContent>
        </Card>

        <Card className="card-geek border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Que Couvre la Garantie ?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="space-y-3">
              <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                <Check className="w-5 h-5 text-cyan-400" />
                Couvert par la garantie :
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Defauts de fabrication materiels</li>
                <li>Dysfonctionnements sans cause externe</li>
                <li>Problemes de connexion ou chargement</li>
                <li>Defaillance prematuree des composants</li>
              </ul>
            </div>

            <div className="space-y-3 mt-6">
              <h3 className="font-bold text-foreground text-lg text-pink-400">Non couvert par la garantie :</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Dommages physiques (chute, ecrasement)</li>
                <li>Exposition a des temperatures extremes</li>
                <li>Mauvaise utilisation ou negligence</li>
                <li>Dommages causes par l'eau</li>
                <li>Alteration ou modification du produit</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="card-geek border-purple-500/20 mt-6">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Comment Faire une Reclamation ?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                <strong className="text-foreground">Contactez-nous :</strong> Envoyez un email a <span className="text-cyan-400">support@corely.fr</span> avec votre numero de commande
              </li>
              <li>
                <strong className="text-foreground">Description du probleme :</strong> Decrivez precisement le dysfonctionnement rencontre
              </li>
              <li>
                <strong className="text-foreground">Photos :</strong> Joignez des photos du produit et de l'emballage si possible
              </li>
              <li>
                <strong className="text-foreground">Retour :</strong> Nous vous fournirons une etiquette de retour gratuite
              </li>
              <li>
                <strong className="text-foreground">Traitement :</strong> Echange ou remboursement sous 7 a 14 jours
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card className="card-geek border-cyan-500/20 mt-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2 text-foreground">100% Produits de Qualite</h3>
                <p className="text-muted-foreground">
                  Tous nos accessoires mobiles sont selectionnes pour leur qualite premium. Nous garantissons des produits durables et performants pour votre telephone.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
