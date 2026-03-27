const CONTENT = {
  brand: { name: "350DIAS", location: "Porto, Portugal" },
  stats: [
    { value: "3",       label: { en: "Floors",     pt: "Pisos" } },
    { value: "6",       label: { en: "Apartments", pt: "Apartamentos" } },
    { value: "T1-T3",   label: { en: "Typologies", pt: "Tipologias" } },
    { value: "03.2027", label: { en: "Completion", pt: "Conclusao" } }
  ],
  units: [
    { id: "unit-a", label: { en: "Unit A", pt: "Unidade A" }, image: "images/unit-a.jpg", status: "available",
      details: { en: { name: "Unit A", typology: "T1", area: "50.0 m2", balcony: "-", terrace: "-", storage: "-", garden: "-" },
                 pt: { name: "Unidade A", typology: "T1", area: "50.0 m2", balcony: "-", terrace: "-", storage: "-", garden: "-" } } },
    { id: "unit-b", label: { en: "Unit B", pt: "Unidade B" }, image: "images/unit-b.jpg", status: "available",
      details: { en: { name: "Unit B", typology: "T2", area: "105.0 m2", balcony: "13.8 m2", terrace: "-", storage: "76.0 m2", garden: "-" },
                 pt: { name: "Unidade B", typology: "T2", area: "105.0 m2", balcony: "13.8 m2", terrace: "-", storage: "76.0 m2", garden: "-" } } },
    { id: "unit-c", label: { en: "Unit C", pt: "Unidade C" }, image: "images/unit-c.jpg", status: "available",
      details: { en: { name: "Unit C", typology: "T1", area: "43.0 m2", balcony: "-", terrace: "-", storage: "1.3 m2", garden: "-" },
                 pt: { name: "Unidade C", typology: "T1", area: "43.0 m2", balcony: "-", terrace: "-", storage: "1.3 m2", garden: "-" } } },
    { id: "unit-d", label: { en: "Unit D", pt: "Unidade D" }, image: "images/unit-d.jpg", status: "available",
      details: { en: { name: "Unit D", typology: "T2", area: "60.0 m2", balcony: "-", terrace: "-", storage: "3.0 m2", garden: "-" },
                 pt: { name: "Unidade D", typology: "T2", area: "60.0 m2", balcony: "-", terrace: "-", storage: "3.0 m2", garden: "-" } } },
    { id: "unit-e", label: { en: "Unit E", pt: "Unidade E" }, image: "images/unit-e.jpg", status: "available",
      details: { en: { name: "Unit E", typology: "T2 Duplex", area: "96.0 m2", balcony: "9.6 m2", terrace: "-", storage: "-", garden: "-" },
                 pt: { name: "Unidade E", typology: "T2 Duplex", area: "96.0 m2", balcony: "9.6 m2", terrace: "-", storage: "-", garden: "-" } } },
    { id: "unit-f", label: { en: "Unit F", pt: "Unidade F" }, image: "images/unit-f.jpg", status: "available",
      details: { en: { name: "Unit F", typology: "T3", area: "121.5 m2", balcony: "77.5 m2", terrace: "10.0 m2", storage: "7.4 m2", garden: "-" },
                 pt: { name: "Unidade F", typology: "T3", area: "121.5 m2", balcony: "77.5 m2", terrace: "10.0 m2", storage: "7.4 m2", garden: "-" } } }
  ],
  gallery: {
    images: [
      { src: "images/gallery-1.jpg", alt: "Facade" },
      { src: "images/gallery-2.jpg", alt: "Entrance" },
      { src: "images/gallery-3.jpg", alt: "Building" },
      { src: "images/gallery-4.jpg", alt: "Building 2" },
      { src: "images/gallery-5.jpg", alt: "Neighborhood" }
    ]
  }
};
