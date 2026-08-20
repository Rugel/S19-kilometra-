This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Narzędzie OSM (mapa budowy)

Aplikacja zawiera narzędzie pod adresem **`/builder`** (link „Narzędzie OSM” w menu), które pozwala:

- **pobierać linie dróg z OpenStreetMap** — wysyła zapytania do Overpass API dla wybranego prostokąta (bbox) i wybranych typów dróg (`highway=motorway|trunk|primary|…`), a następnie rysuje je na mapie jako polilinie (listę punktów [lat, lng]),
- **dodawać własne drogi (linie)** — tryb „Rysowanie linii”, kliknij w mapę by rysować punkt po punkcie, potem „Zapisz linię”,
- **dodawać własne obiekty (markery)** — tryb „Dodaj obiekt”, klik w mapę i edycja nazwy,
- **eksportować wynik do JSON** (przycisk „Generuj export” / „Kopiuj”), który można wkleić do pliku w `app/utils/…` i użyć w `MapCom` (komponenty `Polyline` / `Marker`).

Wszystkie komponenty narzędzia znajdują się w `app/components/OsmBuilder.jsx`, a strona w `app/builder/page.jsx`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
