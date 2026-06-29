// Configuración del Municipio de Rayón, Sonora. Administración 2024-2027.
// Construido sobre plantilla-municipal. Solo se llenan datos CONFIRMADOS; lo no
// confirmado se queda en null/'' (NO se inventa). Ver respaldo-base-arivechi.
export const municipalConfig = {
  municipioId: '11688fc2-e082-494e-9948-e7cb93aa7bec',
  identidad: {
    nombreCorto: 'Rayón',
    nombreOficial: 'Municipio de Rayón',
    nombreCompleto: 'H. Ayuntamiento de Rayón',
    slug: 'rayon',
    estado: 'Sonora',
    pais: 'México',
    administracion: '2024-2027',
    // <<PENDIENTE: lema oficial del municipio>>
    lema: '',
    fundacion: {
      anio: null,
      texto: '',
    },
    municipioLibre: '', // <<PENDIENTE>>
    identidadEconomica: '', // <<PENDIENTE>>
    sitiosHistoricos: [],
    ubicacionGeografica: '',
  },

  datos: {
    superficieKm2: null,
    poblacion2020: null,
    comunidades: null,
    altitudMin: null,
    altitudMax: null,
    altitudMedia: null,
    densidad: null,
    idh: null,
    coordenadas: {
      latStr: '',
      lonStr: '',
      lat: 29.7,
      lon: -110.5,
    },
    lada: '',
    cp: '',
    colindancias: { norte: '', noreste: '', suroeste: '' },
    hidrografia: '',
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

  localidades: [],

  contacto: {
    direccion: '',
    cp: '',
    ciudad: 'Rayón, Sonora',
    direccionCompleta: '',
    telefonos: [],
    email: '',
    horarios: '', // <<PENDIENTE: horario de atención>>
  },

  redes: {
    facebook: '',
    instagram: null,
    twitter: null,
    youtube: null,
  },

  enlacesExternos: {
    transparenciaAyuntamiento: '',
    transparenciaAyuntamientoSevac: null, // <<PENDIENTE>>
    transparenciaAyuntamientoLeyes: null, // <<PENDIENTE>>
    transparenciaSonora:
      'https://transparencia.sonora.gob.mx/informacion-publica/organismos/9/municipios/1145/rayon',
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
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://rayon.vercel.app',
  },

  developer: {
    nombre: 'Northa Digital',
    anioActual: 2026,
  },
};

export default municipalConfig;
