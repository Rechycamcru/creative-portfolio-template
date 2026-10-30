// ✏️ EDITA AQUÍ TODO EL CONTENIDO DE LA PÁGINA.
// Para usar una imagen: pon su enlace (https://...) o súbela a /public y usa "/mi-imagen.png".
// Si "image" queda vacío ("") se muestra un recuadro "PNG personalizable".

export const site = {
  // Fondo de los lados (deja "" para usar el fondo de colores por defecto)
  sideBackground: "",

  hero: {
    logo: "", // PNG pequeño arriba
    banner: "", // PNG grande (título / logo principal)
    texts: [
      "PCL es un mundo lleno de personajes interesantes, historias y aventuras fantásticas.",
      "¡Descubre nuestro mundo a través de juegos, videos y cómics!",
    ],
    buttons: [
      { image: "", label: "¡JUGAR!", target: "seccion-1" },
      { image: "", label: "¡LEER!", target: "seccion-2" },
      { image: "", label: "¡MIRAR!", target: "seccion-3" },
    ],
  },

  about: {
    title: "¿Qué es Pachadigalandia?",
    texts: [
      "Es una franquicia con grandes personajes, historias y lugares llenos de secretos por descubrir...",
      "¡Nuestras aventuras van desde lo cotidiano hasta lo divertido de las aventuras fantasiosas!",
    ],
  },

  // (1)
  section1: {
    header: "",
    cards: [
      { image: "", label: "¡LEER AHORA!", link: "#" },
      { image: "", label: "¡LEER AHORA!", link: "#" },
      { image: "", label: "¡LEER AHORA!", link: "#" },
    ],
  },

  // (2) videos
  section2: {
    header: "",
    videos: [
      { image: "", link: "#" },
      { image: "", link: "#" },
    ],
  },

  // (3)
  section3: {
    header: "",
    items: [{ image: "", link: "#" }],
  },

  subscribe: {
    text: "Recibe noticias de nuevos eventos, cómics, videos y más suscribiéndote con tu correo",
    placeholder: "Insertar gmail...",
    button: "SUSCRIBIRSE",
    success: "¡Listo! Te avisaremos de las novedades ✨",
    sideImage: "", // Fondo PNG personalizable
  },

  footer: "© Pachadigalandia",
};
