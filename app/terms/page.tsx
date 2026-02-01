import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export const metadata = {
  title: "Conditions Generales de Vente | Corely.fr",
  description: "Nos conditions generales de vente et d'utilisation",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen circuit-bg">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-background to-cyan-900/30" />
        <div className="absolute inset-0 grid-bg" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex items-center gap-4 justify-center mb-4">
            <FileText className="w-12 h-12 text-pink-400" />
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Conditions Generales de Vente</h1>
          </div>
          <p className="text-center text-xl text-muted-foreground">Lisez nos conditions avant de commander</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="card-geek border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">1. Objet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Les presentes Conditions Generales de Vente (CGV) regissent les ventes d'accessoires mobiles effectuees sur
              le site Corely.fr. Toute commande implique l'acceptation pleine et entiere des presentes CGV.
            </p>
          </CardContent>
        </Card>

        <Card className="card-geek border-purple-500/20 mt-6">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">2. Prix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Tous nos prix sont affiches en euros et incluent la TVA applicable. Le prix affiche comprend la
              livraison gratuite en France metropolitaine et en Europe.
            </p>
            
          </CardContent>
        </Card>

        <Card className="card-geek border-purple-500/20 mt-6">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">3. Commande</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Pour passer commande, vous devez ajouter les produits a votre panier et suivre le processus de paiement.
              Une confirmation vous sera envoyee par email apres validation de votre paiement.
            </p>
            <p>Nous nous reservons le droit d'annuler toute commande en cas de probleme de stock ou de paiement.</p>
          </CardContent>
        </Card>

        <Card className="card-geek border-purple-500/20 mt-6">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">4. Paiement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Le paiement s'effectue via PayPal, garantissant une securite maximale de vos donnees
              bancaires. Aucune information de carte bancaire n'est stockee sur nos serveurs.
            </p>
          </CardContent>
        </Card>

        <Card className="card-geek border-purple-500/20 mt-6">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">5. Livraison</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              La livraison est gratuite et incluse dans le prix. Les delais de livraison sont de 5 a 15 jours ouvres
              selon votre localisation. Un numero de suivi vous sera communique des l'expedition de votre colis.
            </p>
          </CardContent>
        </Card>

        <Card className="card-geek border-purple-500/20 mt-6">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">6. Droit de Retractation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Conformement a la legislation europeenne, vous disposez d'un delai de 14 jours a compter de la reception
              de votre commande pour exercer votre droit de retractation sans avoir a justifier de motifs.
            </p>
          </CardContent>
        </Card>

        <Card className="card-geek border-purple-500/20 mt-6">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">7. Garanties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Tous nos produits beneficient d'une garantie de 1 an. Nous garantissons la qualite de tous nos accessoires mobiles.
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-muted-foreground mt-12 text-sm">Derniere mise a jour : 30 janvier 2026</p>
      </div>
    </div>
  )
}
