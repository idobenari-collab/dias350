/**
 * content.js — 350DIAS
 * Central content source. Edit text here to update the website.
 */

const CONTENT = {

  brand: {
    name: "350DIAS",
    tagline: "A new residential vision in Porto",
    location: "Porto, Portugal",
  },

  meta: {
    title: "350DIAS — A New Residential Vision in Porto",
    description: "350DIAS is an exclusive residential development in Porto.",
    keywords: "350DIAS, Porto real estate, luxury apartments, residential Porto",
    ogImage: "images/og-image.jpg",
  },

  nav: {
    links: [
      { label: { en: "About",      pt: "Sobre" },       href: "#about" },
      { label: { en: "Apartments", pt: "Frações" },     href: "#apartments" },
      { label: { en: "Gallery",    pt: "Galeria" },     href: "#gallery" },
      { label: { en: "Location",   pt: "Localização" }, href: "#location" },
      { label: { en: "Contact",    pt: "Contacto" },    href: "#contact" },
    ],
  },

  hero: {
    image: "images/hero.jpg",
    heading: {
      en: "A new residential\nvision in Porto",
      pt: "Uma nova visão\nresidencial no Porto",
    },
    subheading: {
      en: "Where architecture meets the rhythm of the city.",
      pt: "Onde a arquitetura encontra o ritmo da cidade.",
    },
    cta: {
      primary:   { en: "Request Details", pt: "Solicitar Informações", href: "#contact" },
      secondary: { en: "View Location",   pt: "Ver Localização",       href: "#location" },
    },
  },

  /* ── STATS BAND ─────────────────────────────────────────────── */
  stats: [
    { value: "3",     label: { en: "Floors",      pt: "Pisos" } },
    { value: "6",     label: { en: "Apartments",  pt: "Apartamentos" } },
    { value: "T1–T3", label: { en: "Typologies",  pt: "Tipologias" } },
    { value: "03.2027", label: { en: "Completion",  pt: "Conclusão" } },
  ],

  /* ── ABOUT ──────────────────────────────────────────────────── */
  about: {
    image: "images/about.jpg",
    heading: {
      en: "Living in harmony with the beauty of details",
      pt: "Viver em harmonia com a beleza dos detalhes",
    },
    body: {
      en: "350DIAS is the new residential landmark at R. Carlos Malheiro Dias 350, Porto. " +
          "A project where contemporary architecture reflects the essence of city life, " +
          "offering residences designed for those who value sophistication, comfort, and a " +
          "privileged connection to Porto's cultural heart.\n\n" +
          "Every detail has been conceived with exclusivity in mind — " +
          "elegant spaces, noble materials, and natural light that transforms each home " +
          "into a timeless living experience.",
      pt: "O 350DIAS é o novo marco residencial na R. Carlos Malheiro Dias 350, Porto. " +
          "Um projeto onde a arquitetura contemporânea reflete a essência da vida urbana.",
    },
  },

  /* ── APARTMENTS (6 units) ───────────────────────────────────── */
  /*
   * HOW TO ADD A FLOOR PLAN IMAGE FOR A UNIT:
   *   1. Name the file:  floorplan-unit-a.jpg  (or .png)
   *   2. Place it in:    /images/
   *   3. The floorPlan path below must match exactly.
   *
   * FIELDS YOU CAN EDIT:
   *   area / balcony / terrace / storage / garden
   *   Use "—" for fields that don't apply to that unit.
   */
  apartments: [
    {
      id: "unit-a",
      label: { en: "Unit A", pt: "Unidade A" },
      floorPlan: "images/floorplan-unit-a.jpg",
      details: {
        en: { name: "Unit A", typology: "T1", area: "50.0 m²", balcony: "—", terrace: "—", storage: "—", garden: "—" },
        pt: { name: "Unidade A", typology: "T1", area: "50.0 m²", balcony: "—", terrace: "—", storage: "—", garden: "—" },
      },
    },
    {
      id: "unit-b",
      label: { en: "Unit B", pt: "Unidade B" },
      floorPlan: "images/floorplan-unit-b.jpg",
      details: {
        en: { name: "Unit B", typology: "T2", area: "105.0 m²", balcony: "13.8 m²", terrace: "—", storage: "76.0 m²", garden: "—" },
        pt: { name: "Unidade B", typology: "T2", area: "105.0 m²", balcony: "13.8 m²", terrace: "—", storage: "76.0 m²", garden: "—" },
      },
    },
    {
      id: "unit-c",
      label: { en: "Unit C", pt: "Unidade C" },
      floorPlan: "images/floorplan-unit-c.jpg",
      details: {
        en: { name: "Unit C", typology: "T1", area: "43.0 m²", balcony: "—", terrace: "—", storage: "1.3 m²", garden: "—" },
        pt: { name: "Unidade C", typology: "T1", area: "43.0 m²", balcony: "—", terrace: "—", storage: "1.3 m²", garden: "—" },
      },
    },
    {
      id: "unit-d",
      label: { en: "Unit D", pt: "Unidade D" },
      floorPlan: "images/floorplan-unit-d.jpg",
      details: {
        en: { name: "Unit D", typology: "T2", area: "60.0 m²", balcony: "—", terrace: "—", storage: "3.0 m²", garden: "—" },
        pt: { name: "Unidade D", typology: "T2", area: "60.0 m²", balcony: "—", terrace: "—", storage: "3.0 m²", garden: "—" },
      },
    },
    {
      id: "unit-e",
      label: { en: "Unit E", pt: "Unidade E" },
      floorPlan: "images/floorplan-unit-e.jpg",
      details: {
        en: { name: "Unit E", typology: "T2 Duplex", area: "96.0 m²", balcony: "9.6 m²", terrace: "—", storage: "—", garden: "—" },
        pt: { name: "Unidade E", typology: "T2 Duplex", area: "96.0 m²", balcony: "9.6 m²", terrace: "—", storage: "—", garden: "—" },
      },
    },
    {
      id: "unit-f",
      label: { en: "Unit F", pt: "Unidade F" },
      floorPlan: "images/floorplan-unit-f.jpg",
      details: {
        en: { name: "Unit F", typology: "T3", area: "121.5 m²", balcony: "77.5 m²", terrace: "10.0 m²", storage: "7.4 m²", garden: "—" },
        pt: { name: "Unidade F", typology: "T3", area: "121.5 m²", balcony: "77.5 m²", terrace: "10.0 m²", storage: "7.4 m²", garden: "—" },
      },
    },
  ],

  /* ── GALLERY ────────────────────────────────────────────────── */
  gallery: {
    heading: {
      en: "The perfect balance between comfort and privacy",
      pt: "O equilíbrio perfeito entre conforto e privacidade",
    },
    images: [
      { src: "images/gallery-1.jpg", alt: "Living area" },
      { src: "images/gallery-2.jpg", alt: "Kitchen" },
      { src: "images/gallery-3.jpg", alt: "Master bedroom" },
      { src: "images/gallery-4.jpg", alt: "Bathroom" },
      { src: "images/gallery-5.jpg", alt: "Balcony view" },
      { src: "images/gallery-6.jpg", alt: "Building facade" },
      { src: "images/gallery-7.jpg", alt: "Common area" },
      { src: "images/gallery-8.jpg", alt: "Rooftop terrace" },
    ],
  },

  /* ── LOCATION ───────────────────────────────────────────────── */
  location: {
    address: {
      en: "R. Carlos Malheiro Dias 350, 4200-154 Porto, Portugal",
      pt: "R. Carlos Malheiro Dias 350, 4200-154 Porto, Portugal",
    },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.5!2d-8.6163!3d41.1621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2464a09f6c40f1%3A0x1!2sR.+Carlos+Malheiro+Dias+350%2C+4200-154+Porto!5e0!3m2!1spt!2spt!4v1",
    highlights: [
      { icon: "building-2",  label: { en: "City centre 5 min",    pt: "Centro 5 min" } },
      { icon: "tree-pine",   label: { en: "Parks nearby",          pt: "Parques próximos" } },
      { icon: "train-front", label: { en: "Metro access",          pt: "Acesso ao Metro" } },
      { icon: "utensils",    label: { en: "Restaurants & culture", pt: "Restaurantes & cultura" } },
    ],
  },

  /* ── CONTACT ────────────────────────────────────────────────── */
  contact: {
    heading:    { en: "Request more information", pt: "Solicitar mais informações" },
    subheading: { en: "Our team will get back to you shortly.", pt: "A nossa equipa entrará em contacto brevemente." },
    email:    "info@350dias.pt",
    phone:    "+351 22 000 0000",
    whatsapp: "+351 91 000 0000",
  },

  /* ── FOOTER ─────────────────────────────────────────────────── */
  footer: {
    copy:    "© 2025 350DIAS. All rights reserved.",
    privacy: { en: "Privacy Policy", pt: "Política de Privacidade" },
  },

};
