# Nomad Studio - The Resonant Sphere

An interactive 3D multimedia experience created for Nomad Studio Publishing.

## Quick Start

### Local Development
```bash
npm install
npm run dev
```
L'app sarà disponibile su `http://localhost:3000`

### Build for Production
```bash
npm run build
npm run preview
```

## Deployment su Vercel

### Opzione 1: Deploy Automatico via GitHub (Consigliato)

1. **Push su GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/nomad-studio-resonant-sphere.git
   git push -u origin main
   ```

2. **Collegare Vercel a GitHub**
   - Vai su [vercel.com](https://vercel.com)
   - Clicca "New Project"
   - Importa il repository da GitHub
   - Vercel rileverà automaticamente Vite
   - Clicca "Deploy"

### Opzione 2: Deploy Manuale via Vercel CLI

1. **Installa Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   Segui i prompt interattivi

3. **Deploy di produzione**
   ```bash
   vercel --prod
   ```

## Configurazione Vercel

Il file `vercel.json` è già configurato con:
- **buildCommand**: `npm run build`
- **outputDirectory**: `dist`
- **framework**: `vite`

Nessuna configurazione aggiuntiva è necessaria!

## Environment Variables

Se in futuro aggiungerai environment variables (API keys, etc.):

1. Vai nel dashboard Vercel → Settings → Environment Variables
2. Aggiungi le variabili necessarie
3. Vercel le inietterà automaticamente durante il build

Attualmente il progetto non richiede env variables.

## Performance Tips

- La build produce file già ottimizzati da Vite
- Gli asset statici (audio, immagini) sono cachati al CDN di Vercel
- Le immagini da URL esterni vengono ottimizzate automaticamente

## Support

Per aiuto su Vercel: [vercel.com/docs](https://vercel.com/docs)

# NOMADSTUDIOSPHERE
