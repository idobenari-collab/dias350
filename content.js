/**
 * content.js — 350DIAS
 * Central content source. Edit text here to update the website.
 * Images: replace paths in the arrays below.
 * Apartments: add objects to the `apartments` array.
 */

const CONTENT = {

  /* ─── BRAND ─────────────────────────────────────────────────── */
  brand: {
    name: "350DIAS",
    tagline: "A new residential vision in Porto",
    location: "Porto, Portugal",
  },

  /* ─── META ──────────────────────────────────────────────────── */
  meta: {
    title: "350DIAS — A New Residential Vision in Porto",
    description:
      "350DIAS is an exclusive residential development in Porto. " +
      "Premium apartments designed for those who seek comfort, elegance, and the soul of the city.",
    keywords: "350DIAS, Porto real estate, luxury apartments, residential Porto",
    ogImage: "images/og-image.jpg",
  },

  /* ─── NAVIGATION ────────────────────────────────────────────── */
  nav: {
    links: [
      { label: { en: "About", pt: "Sobre" },      href: "#about" },
      { label: { en: "Apartments", pt: "Frações" }, href: "#apartments" },
      { label: { en: "Gallery", pt: "Galeria" },   href: "#gallery" },
      { label: { en: "Location", pt: "Localização" }, href: "#location" },
      { label: { en: "Contact", pt: "Contacto" },  href: "#contact" },
    ],
  },

  /* ─── HERO ──────────────────────────────────────────────────── */
  hero: {
    image: "images/hero.jpg",          // Replace with your hero image
    heading: {
      en: "A new residential\nvision in Porto",
      pt: "Uma nova visão\nresidencial no Porto",
    },
    subheading: {
      en: "Where architecture meets the rhythm of the city.",
      pt: "Onde a arquitetura encontra o ritmo da cidade.",
    },
    cta: {
      primary: { en: "Request Details", pt: "Solicitar Informações", href: "#contact" },
      secondary: { en: "View Location", pt: "Ver Localização",      href: "#location" },
    },
  },

  /* ─── STATS (numbers section) ──────────────────────────────── */
  stats: [
    { value: "4",       label: { en: "Floors",       pt: "Pisos" } },
    { value: "14",      label: { en: "Apartments",   pt: "Apartamentos" } },
    { value: "T2–T4",   label: { en: "Typologies",   pt: "Tipologias" } },
    { value: "03.2027",    label: { en: "Completion",   pt: "Conclusão" } },
  ],

  /* ─── ABOUT ─────────────────────────────────────────────────── */
  about: {
    image: "images/about.jpg",         // Replace with your about image
    heading: {
      en: "Living in harmony with the beauty of details",
      pt: "Viver em harmonia com a beleza dos detalhes",
    },
    body: {
      en: "350DIAS is the new residential landmark at Rua de Dias 350, Porto. " +
          "A project where contemporary architecture reflects the essence of city life, " +
          "offering residences designed for those who value sophistication, comfort, and a " +
          "privileged connection to Porto's cultural heart.\n\n" +
          "Every detail has been conceived with exclusivity in mind — " +
          "elegant spaces, noble materials, and natural light that transforms each home " +
          "into a timeless living experience.",
      pt: "O 350DIAS é o novo marco residencial na Rua de Dias 350, Porto. " +
          "Um projeto onde a arquitetura contemporânea reflete a essência da vida urbana, " +
          "oferecendo residências projetadas para quem valoriza sofisticação, conforto e uma " +
          "ligação privilegiada ao coração cultural do Porto.",
    },
  },

  /* ─── APARTMENTS (tabs section) ────────────────────────────── */
  /* To add an apartment: copy one object and paste below the last one. */
  apartments: [
    {
      id: "apt-1",
      label: { en: "Type T2", pt: "Fração T2" },
      floorPlan: "images/floorplan-t2.jpg",   // Replace with real floor plan image
      details: {
        en: {
          name: "T2 Apartment",
          area: "95 m²",
          bedrooms: "2 bedrooms",
          bathrooms: "2 bathrooms",
          balcony: "22 m²",
          garage: "1 parking space",
          price: "From €420,000",
        },
        pt: {
          name: "Apartamento T2",
          area: "95 m²",
          bedrooms: "2 quartos",
          bathrooms: "2 casas de banho",
          balcony: "22 m²",
          garage: "1 lugar de garagem",
          price: "A partir de €420 000",
        },
      },
    },
    {
      id: "apt-2",
      label: { en: "Type T3", pt: "Fração T3" },
      floorPlan: "images/floorplan-t3.jpg",
      details: {
        en: {
          name: "T3 Apartment",
          area: "130 m²",
          bedrooms: "3 bedrooms",
          bathrooms: "2 bathrooms",
          balcony: "38 m²",
          garage: "2 parking spaces",
          price: "From €620,000",
        },
        pt: {
          name: "Apartamento T3",
          area: "130 m²",
          bedrooms: "3 quartos",
          bathrooms: "2 casas de banho",
          balcony: "38 m²",
          garage: "2 lugares de garagem",
          price: "A partir de €620 000",
        },
      },
    },
    {
      id: "apt-3",
      label: { en: "Type T4", pt: "Fração T4" },
      floorPlan: "images/floorplan-t4.jpg",
      details: {
        en: {
          name: "T4 Penthouse",
          area: "185 m²",
          bedrooms: "4 bedrooms",
          bathrooms: "3 bathrooms",
          balcony: "75 m²",
          garage: "2 parking spaces",
          price: "From €950,000",
        },
        pt: {
          name: "Penthouse T4",
          area: "185 m²",
          bedrooms: "4 quartos",
          bathrooms: "3 casas de banho",
          balcony: "75 m²",
          garage: "2 lugares de garagem",
          price: "A partir de €950 000",
        },
      },
    },
  ],

  /* ─── GALLERY ───────────────────────────────────────────────── */
  /* Add/remove image paths here. Alt text is for accessibility. */
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

  /* ─── LOCATION ──────────────────────────────────────────────── */
  location: {
    address: {
      en: "Rua de Dias 350, Porto, Portugal",
      pt: "Rua de Dias 350, Porto, Portugal",
    },
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.0!2d-8.6291!3d41.1579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA5JzI4LjQiTiA4wrAzNyc0NC44Ilc!5e0!3m2!1sen!2spt!4v1",
    highlights: [
      { icon: "building-2",   label: { en: "City centre 5 min",   pt: "Centro 5 min" } },
      { icon: "tree-pine",    label: { en: "Parks nearby",         pt: "Parques próximos" } },
      { icon: "train-front",  label: { en: "Metro access",         pt: "Acesso ao Metro" } },
      { icon: "utensils",     label: { en: "Restaurants & culture", pt: "Restaurantes & cultura" } },
    ],
  },

  /* ─── CONTACT ───────────────────────────────────────────────── */
  contact: {
    heading: {
      en: "Request more information",
      pt: "Solicitar mais informações",
    },
    subheading: {
      en: "Our team will get back to you shortly.",
      pt: "A nossa equipa entrará em contacto brevemente.",
    },
    email: "info@350dias.pt",
    phone: "+351 22 000 0000",
    whatsapp: "+351 91 000 0000",
  },

  /* ─── FOOTER ─────────────────────────────────────────────────── */
  footer: {
    copy: "© 2025 350DIAS. All rights reserved.",
    privacy: { en: "Privacy Policy", pt: "Política de Privacidade" },
  },
};
