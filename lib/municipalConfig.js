// Configuración del Municipio de Baviácora, Sonora. Administración 2024-2027.
// Construido sobre plantilla-municipal. Solo se llenan datos CONFIRMADOS; lo no
// confirmado se queda en null/'' (NO se inventa). Ver respaldo-base-arivechi.
export const municipalConfig = {
  identidad: {
    nombreCorto: 'Baviácora',
    nombreOficial: 'Municipio de Baviácora',
    nombreCompleto: 'H. Ayuntamiento de Baviácora, Sonora',
    estado: 'Sonora',
    pais: 'México',
    administracion: '2024-2027',
    // <<PENDIENTE: lema oficial del municipio>>
    lema: '',
    fundacion: {
      anio: 1639, // pueblo (misión); municipio libre: 13 de mayo de 1931
      texto:
        'Misión “Nuestra Señora de la (Purísima) Concepción”, fundada en 1639 por el jesuita Fray Bartolomé Castaño. El pueblo se llamó originalmente “La Purísima Concepción de Baviácora”.',
    },
    municipioLibre: '1931', // rehabilitado el 13 de mayo de 1931 (tras depender de Arizpe)
    identidadEconomica: '', // <<PENDIENTE: no especificado en la fuente>>
    sitiosHistoricos: ['Templo de San Francisco Javier', 'Misión de Nuestra Señora de la Concepción'],
    ubicacionGeografica: 'Región del Río Sonora',
  },

  datos: {
    superficieKm2: 841.95, // 0.46% del estado de Sonora
    poblacion2020: 3191, // confirmado (Censo INEGI 2020); cabecera: 1761
    comunidades: 16, // localidades del municipio (16 en total)
    altitudMin: 500,
    altitudMax: 1800,
    altitudMedia: 553, // cabecera municipal
    densidad: 3.8, // aprox. hab/km²
    idh: 0.8278,
    coordenadas: {
      latStr: '29°42′ N',
      lonStr: '110°09′ O',
      lat: 29.7,
      lon: -110.15,
    },
    lada: '623', // confirmado
    cp: '84941', // confirmado
    // Colindancias: norte Aconchi, noreste Cumpas, suroeste Ures.
    colindancias: { norte: 'Aconchi', noreste: 'Cumpas', suroeste: 'Ures' },
    // Principal fuente de agua del municipio.
    hidrografia: 'Río Sonora',
  },

  clima: {
    tipo: 'Seco y cálido (semidesértico)',
    temperaturaMediaAnualC: null,
    precipitacionMediaAnualMm: null,
  },

  actividadesEconomicas: {
    principales: ['Agricultura'], // ligada al Río Sonora
    minerales: [],
  },

  // 16 localidades en total; se listan la cabecera + las principales.
  localidades: [
    { nombre: 'Baviácora', tipo: 'cabecera', habitantes: 1761 },
    { nombre: 'Mazocahui', tipo: 'localidad', habitantes: null },
    { nombre: 'San José', tipo: 'localidad', habitantes: null },
    { nombre: 'La Aurora', tipo: 'localidad', habitantes: null },
    { nombre: 'La Labor', tipo: 'localidad', habitantes: null },
    { nombre: 'La Capilla', tipo: 'localidad', habitantes: null },
  ],

  contacto: {
    direccion: 'Avenida Eduardo W. Villa No. 10, Centro',
    cp: '84941',
    ciudad: 'Baviácora, Sonora',
    direccionCompleta:
      'Avenida Eduardo W. Villa No. 10, Centro, C.P. 84941, Baviácora, Sonora, México',
    telefonos: ['(623) 233-5131'], // confirmado
    email: 'ayuntamientobaviacora2024.2027@gmail.com', // confirmado
    horarios: '', // <<PENDIENTE: horario de atención>>
  },

  redes: {
    facebook:
      'https://www.facebook.com/people/Municipio-de-Baviácora-Sonora-2024-2027/61565830012679/',
    instagram: null,
    twitter: null,
    youtube: null,
  },

  enlacesExternos: {
    transparenciaAyuntamiento: 'https://baviacora.gob.mx/transparencia/',
    transparenciaAyuntamientoSevac: null, // <<PENDIENTE>>
    transparenciaAyuntamientoLeyes: null, // <<PENDIENTE>>
    transparenciaSonora:
      'https://transparencia.sonora.gob.mx/informacion-publica/organismos/9/municipios/1107/baviacora',
    plataformaNacionalTransparencia: 'https://www.plataformadetransparencia.org.mx',
    avisoPrivacidadPdf: null, // <<PENDIENTE: aviso de privacidad de Baviácora en PDF>>
  },

  // Paleta de marca carbón/cobre de Baviácora. Los nombres de variables se
  // conservan de la plantilla ('guinda' = carbón, 'dorado' = cobre); solo cambian
  // los valores. Sincronizada con app/globals.css (@theme).
  paleta: {
    guinda: '#23292E',
    guindaProfundo: '#15191D',
    guindaSuave: '#3A434B',
    dorado: '#B5732E',
    doradoSuave: '#C98A4E',
    crema: '#F4EFE7',
    texto: '#1A1A1A',
    textoSecundario: '#4A4A4A',
    fondo: '#FFFFFF',
    borde: '#E5E5E5',
  },

  servicios: {
    // La access key de Web3Forms la leen directamente los formularios desde
    // NEXT_PUBLIC_WEB3FORMS_KEY (es pública/cliente); no se centraliza aquí.
    cloudinaryCloud: '', // <<PENDIENTE: se define al conectar el CMS>>
    // TODO: revertir a 'https://baviacora.gob.mx' cuando se migre el DNS del dominio oficial al portal.
    // Hoy el .gob.mx no resuelve al portal; usamos la URL de Vercel para que canonical/og/robots/sitemap/JSON-LD apunten al sitio real.
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://baviacora.vercel.app',
  },

  developer: {
    nombre: 'Northa Digital',
    anioActual: 2026,
  },
};

export default municipalConfig;
