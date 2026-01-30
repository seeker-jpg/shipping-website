import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

export const metadata = {
  title: "Politique de Confidentialite | Corely.fr",
  description: "Notre politique de confidentialite et protection des donnees personnelles",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen circuit-bg">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-background to-cyan-900/30" />
        <div className="absolute inset-0 grid-bg" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex items-center gap-4 justify-center mb-4">
            <Shield className="w-12 h-12 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Politique de Confidentialite</h1>
          </div>
          <p className="text-center text-xl text-muted-foreground">Vos donnees personnelles sont protegees</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="card-geek border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">1. Collecte des Donnees</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Nous collectons uniquement les informations necessaires pour traiter votre commande :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Nom et prenom</li>
              <li>Adresse email</li>
              <li>Numero de telephone</li>
              <li>Adresse de livraison</li>
              <li>Informations de paiement (traitees de maniere securisee par PayPal)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="card-geek border-purple-500/20 mt-6">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">2. Utilisation des Donnees</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Vos donnees personnelles sont utilisees pour :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Traiter et expedier vos commandes</li>
              <li>Vous tenir informe de l'etat de votre commande</li>
              <li>Ameliorer notre service client</li>
              <li>Respecter nos obligations legales</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="card-geek border-purple-500/20 mt-6">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">3. Protection des Donnees</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Nous utilisons des mesures de securite de pointe pour proteger vos donnees personnelles. Toutes les
              transactions sont cryptees via SSL et les paiements sont traites de maniere securisee par PayPal.
            </p>
          </CardContent>
        </Card>

        <Card className="card-geek border-purple-500/20 mt-6">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">4. Vos Droits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Conformement au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Droit d'acces a vos donnees personnelles</li>
              <li>Droit de rectification de vos donnees</li>
              <li>Droit a l'effacement de vos donnees</li>
              <li>Droit d'opposition au traitement</li>
              <li>Droit a la portabilite des donnees</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous a : <strong className="text-purple-400">corely.shop@outlook.com</strong>
            </p>
          </CardContent>
        </Card>

        <Card className="card-geek border-purple-500/20 mt-6">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">5. Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Notre site utilise des cookies essentiels pour le fonctionnement du panier d'achat et la navigation. Aucun
              cookie de tracking tiers n'est utilise.
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-muted-foreground mt-12 text-sm">Derniere mise a jour : 30 janvier 2026</p>
      </div>
    </div>
  )
}
