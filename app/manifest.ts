import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    theme_color: "#007642",
    background_color: "#F7FEEF",
    icons: [
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "icon512_maskable.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "icon512_rounded.png",
        type: "image/png",
      },
    ],
    orientation: "portrait",
    display: "standalone",
    dir: "auto",
    lang: "de-DE",
    name: "Bierliste - SV Amendingen",
    short_name: "SVABierliste",
    description: "Damit wir alle wissen, was wir getrunken haben",
    start_url: "/",
    scope: "/",
  };
}
