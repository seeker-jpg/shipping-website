# MEGA STORAGE - Dropshipping E-Commerce Platform

Un site e-commerce moderne et performant pour la vente de cartes SD 2TB avec design néon accrocheur, optimisé pour le trafic depuis TikTok et Instagram.

## 🚀 Fonctionnalités

- **Design Néon Moderne**: Interface cyberpunk avec effets de lueur néon (cyan, magenta, violet)
- **Logo Personnalisé**: Logo vectoriel "MEGA STORAGE" avec effets néon animés
- **Catalogue Produits**: 3 cartes SD 2TB (Sony x2, Lenovo x1) à 4.99€ avec livraison gratuite
- **Panier d'Achat**: Gestion complète avec persistance locale
- **Paiement PayPal**: Intégration sécurisée pour les transactions
- **Notifications Telegram**: Envoi automatique des commandes vers un groupe Telegram
- **Multi-Pages**: Pages légales complètes (CGV, Confidentialité, Garantie, Contact, etc.)
- **Responsive**: Design adaptatif pour mobile, tablette et desktop
- **Optimisé Social Media**: Design accrocheur pour conversions depuis TikTok/Instagram

## 📦 Stack Technique

- **Framework**: Next.js 16 avec App Router
- **UI**: React 19.2, Tailwind CSS v4, shadcn/ui
- **State Management**: Zustand pour le panier et les commandes
- **Paiement**: PayPal
- **Notifications**: Telegram Bot API
- **Déploiement**: Vercel

## 🔧 Configuration

### Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes:

```bash
# Telegram Bot Configuration (Server-side only - SECURE)
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
TELEGRAM_THREAD_ID=your_thread_id_here  # Optionnel

# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
```

**Important**: Les variables Telegram n'ont PAS le préfixe `NEXT_PUBLIC_` car elles sont utilisées uniquement côté serveur pour des raisons de sécurité. Elles ne seront jamais exposées au navigateur.

### Configuration Telegram

1. **Créer un Bot Telegram**:
   - Ouvrez Telegram et recherchez [@BotFather](https://t.me/botfather)
   - Envoyez `/newbot` et suivez les instructions
   - Récupérez votre `BOT_TOKEN`

2. **Obtenir le Chat ID**:
   - Ajoutez votre bot à un groupe Telegram
   - Envoyez un message dans le groupe
   - Visitez: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Trouvez le `chat_id` dans la réponse JSON

3. **Thread ID (Optionnel)**:
   - Si vous utilisez des topics/threads dans votre groupe
   - Le `message_thread_id` se trouve aussi dans `getUpdates`

### Configuration PayPal

1. Créez un compte [PayPal Developer](https://developer.paypal.com/)
2. Créez une application dans le Dashboard
3. Récupérez votre Client ID (mode Sandbox pour les tests)
4. En production, utilisez les credentials Live

## 🏃 Installation et Démarrage

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build

# Lancer en production
npm start
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
├── app/
│   ├── page.tsx              # Page d'accueil avec hero et produits
│   ├── products/             # Catalogue et pages produits
│   ├── cart/                 # Panier d'achat
│   ├── checkout/             # Processus de paiement
│   ├── orders/               # Suivi des commandes
│   ├── contact/              # Page contact
│   ├── privacy/              # Politique de confidentialité
│   ├── terms/                # Conditions générales
│   ├── warranty/             # Garantie
│   ├── shipping/             # Livraison
│   └── returns/              # Retours
├── components/
│   ├── logo.tsx              # Logo SVG néon personnalisé
│   ├── header.tsx            # En-tête avec navigation
│   ├── footer.tsx            # Pied de page
│   ├── product-card.tsx      # Carte produit
│   └── paypal-buttons.tsx    # Boutons PayPal
├── lib/
│   ├── db.ts                 # Données produits et types
│   ├── cart-store.ts         # Store Zustand panier
│   ├── order-store.ts        # Store Zustand commandes
│   └── telegram.ts           # Intégration Telegram
└── public/
    ├── sd-sony.png           # Image carte Sony 1
    ├── sd-sony2.png          # Image carte Sony 2
    └── sd-lenovo.png         # Image carte Lenovo
```

## 🎨 Design System

### Palette de Couleurs Néon

- **Cyan**: `#06b6d4` - Accent principal
- **Violet**: `#8b5cf6` - Accent secondaire
- **Magenta**: `#ec4899` - Accent tertiaire
- **Background**: Dégradés sombres avec effets de lueur

### Typographie

- **Display/Logo**: Orbitron (Google Font) - Effet cyberpunk
- **Body**: Geist Sans - Lisibilité optimale
- **Code**: Geist Mono - Éléments techniques

### Effets Néon

Classes CSS personnalisées:
- `.text-neon` - Texte avec lueur
- `.shadow-neon` - Ombre portée lumineuse
- `.glow-pulse` - Animation de pulsation

## 📱 Optimisation Social Media

Le design est optimisé pour maximiser les conversions depuis:
- **TikTok**: Design accrocheur, prix visible, CTA clairs
- **Instagram**: Visuels attrayants, badges promo, urgence
- **Mobile-First**: Interface tactile intuitive

## 🔒 Sécurité

- Validation des formulaires côté client et serveur
- Paiements sécurisés via PayPal
- **Variables Telegram sécurisées côté serveur uniquement**
- API Route protégée pour l'envoi des notifications
- Pas de stockage de données sensibles côté client
- Variables d'environnement pour tous les secrets

## 📊 Gestion des Commandes

Les commandes sont envoyées automatiquement sur Telegram via une **API route sécurisée** avec:
- Numéro de commande unique
- Informations client complètes
- Détails produits et quantités
- Total et statut de paiement
- Format Markdown pour lisibilité

**Architecture sécurisée**: 
- Client → API Route (`/api/send-order`) → Telegram Bot API
- Les tokens ne sont jamais exposés au navigateur

## 🚀 Déploiement

### Vercel (Recommandé)

1. Connectez votre repo GitHub à Vercel
2. Ajoutez les variables d'environnement dans Vercel Dashboard
3. Déployez automatiquement à chaque push

### Autres Plateformes

Compatible avec toute plateforme supportant Next.js:
- Netlify
- Railway
- AWS Amplify
- Digital Ocean

## 📞 Support

Pour toute question ou problème:
- Consultez la documentation Next.js
- Vérifiez les variables d'environnement
- Testez la connexion Telegram avec `getUpdates`
- Utilisez le mode Sandbox PayPal pour les tests

## 📝 License

Projet commercial - Tous droits réservés

## 🎯 Prochaines Étapes

- [ ] Ajouter plus de produits
- [ ] Intégrer un vrai système de gestion de stock
- [ ] Ajouter des avis clients
- [ ] Intégrer Google Analytics
- [ ] Ajouter le pixel Facebook/TikTok
- [ ] Système de codes promo
- [ ] Programme d'affiliation
