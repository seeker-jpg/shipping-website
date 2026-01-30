import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Check, X } from "lucide-react"

export const metadata = {
  title: "Retours et Remboursements | Corely.fr",
  description: "Politique de retours et procedure de remboursement",
}

export default function ReturnsPage() {
  return (
    <div className="min-h-screen circuit-bg">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-background to-pink-900/30" />
        <div className="absolute inset-0 grid-bg" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex items-center gap-4 justify-center mb-4">
            <RotateCcw className="w-12 h-12 text-pink-400" />
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Retours & Remboursements</h1>
          </div>
          <p className="text-center text-xl text-muted-foreground">Politique de retour simple et transparente</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="card-geek border-purple-500/20 mb-8">
          <CardContent className="p-8 text-center">
            <Badge className="text-lg px-6 py-2 mb-4 bg-gradient-to-r from-purple-600 to-pink-600">14 JOURS</Badge>
            <h2 className="text-3xl font-black mb-2 text-foreground">Droit de Retractation</h2>
            <p className="text-muted-foreground text-lg">
              Vous disposez de 14 jours pour retourner votre produit sans justification
            </p>
          </CardContent>
        </Card>

        <Card className="card-geek border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Conditions de Retour</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                <Check className="w-5 h-5 text-cyan-400" />
                Produits Eligibles au Retour
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-8 text-muted-foreground">
                <li>Produit non ouvert dans son emballage d'origine</li>
                <li>Film plastique de protection intact</li>
                <li>Tous les accessoires inclus</li>
                <li>Produit non utilise ni endommage</li>
                <li>Retour initie dans les 14 jours suivant la reception</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                <X className="w-5 h-5 text-pink-400" />
                Produits Non Eligibles
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-8 text-muted-foreground">
                <li>Emballage ouvert ou endommage</li>
                <li>Film de protection retire</li>
                <li>Produit utilise ou modifie</li>
                <li>Retour apres 14 jours</li>
                <li>Produit sans preuve d'achat</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="card-geek border-purple-500/20 mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Procedure de Retour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-foreground">Contactez-nous</h4>
                  <p className="text-muted-foreground text-sm">
                    Envoyez un email a <strong className="text-purple-400">returns@corely.fr</strong> avec votre numero de commande et le motif du retour.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-foreground">Autorisation de Retour</h4>
                  <p className="text-muted-foreground text-sm">
                    Nous vous enverrons une etiquette de retour gratuite et les instructions detaillees.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-foreground">Emballez le Produit</h4>
                  <p className="text-muted-foreground text-sm">
                    Remettez le produit dans son emballage d'origine avec tous les accessoires.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-foreground">Expediez le Retour</h4>
                  <p className="text-muted-foreground text-sm">
                    Deposez le colis au point de collecte indique avec l'etiquette fournie.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold">
                  5
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-foreground">Remboursement</h4>
                  <p className="text-muted-foreground text-sm">
                    Remboursement complet sous 5 a 7 jours apres reception du retour.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-geek border-cyan-500/20 mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Remboursements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Une fois votre retour recu et inspecte, nous vous enverrons un email pour vous notifier que nous avons
              bien recu le produit. Si le retour est approuve, votre remboursement sera traite.
            </p>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <h4 className="font-bold text-foreground mb-2">Delais de Remboursement :</h4>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>PayPal : 2 a 3 jours ouvres</li>
                <li>Carte bancaire : 5 a 10 jours ouvres</li>
                <li>Le remboursement inclut le montant total paye (produit + livraison)</li>
              </ul>
            </div>
            <p className="text-sm">
              <strong>Important :</strong> Si vous ne recevez pas votre remboursement apres 14 jours, verifiez votre
              compte bancaire, puis contactez votre banque. Si le probleme persiste, contactez-nous a{" "}
              <span className="text-cyan-400">support@corely.fr</span>.
            </p>
          </CardContent>
        </Card>

        <Card className="card-geek border-purple-500/20 mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Echanges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Nous n'effectuons pas d'echanges directs. Si vous souhaitez un produit different, nous vous recommandons
              de :
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Retourner le produit actuel selon la procedure ci-dessus</li>
              <li>Passer une nouvelle commande pour le produit souhaite</li>
            </ol>
            <p>
              Cette methode garantit que vous recevez rapidement le produit de votre choix sans attendre le traitement
              du retour.
            </p>
          </CardContent>
        </Card>

        <Card className="card-geek border-cyan-500/20 mt-8 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <RotateCcw className="w-8 h-8 text-pink-400 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Questions sur les Retours ?</h3>
                <p className="text-muted-foreground mb-3">
                  Notre equipe est la pour vous aider avec votre retour ou remboursement.
                </p>
                <p className="text-foreground font-semibold">
                  Email : <span className="text-purple-400">returns@corely.fr</span>
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
