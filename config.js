// Configuración empresarial
window.SOLARTWIN_CONFIG = {
  // Nombre del negocio (siempre 2 partes, ej: SolarTwin)
  businessName: ['Solar', 'Twin'],

  // Eslogan que aparece debajo del nombre del sitio
  slogan: 'Inviertes una vez, el sol paga el resto.',

  // Colores de identidad
  colors: {
    primary: '#FF5F1F',
    accent: '#FF00FF'
  },

  // Años de experiencia
  experienceYears: 5,

  // Cantidad de especialistas
  specialistsCount: 10,
  
  // Número de teléfono
  phoneNumber: {
    code: '53',
    number: '50781823'
  },

  // Correo de contacto
  email: 'twin.technology.startup@gmail.com',
  
  // Nombres de usuario
  usernames: {
    whatsapp: 'TwinTechnologyStartup',
    telegram: 'TwinTechnologyStartup'
  },
  
  // Enlaces a canales y redes sociales
  // Si un enlace está vacío, ese canal no se muestra en la página.
  channelLinkWhatsApp: 'https://whatsapp.com/channel/0029VbEJEn0DeON1xsuwb83M',
  channelLinkTelegram: 'https://t.me/SolarTwin',
  channelLinkFacebook: '',
  channelLinkInstagram: '',
  channelLinkTikTok: '',
  
  // Monedas de pago
  paymentCurrencies: [
    {
      name: 'Dólar',
      code: 'USD'
    },
    {
      name: 'Euro',
      code: 'EUR'
    },
    {
      name: 'Moneda nacional',
      code: 'CUP'
    }
  ],

  // Precio base por panel para la calculadora de costo (USD)
  panelPriceUsd: 90,

  // Calculadora Solar (#calculadora)
  solar: {
    // Valores con los que abre el formulario
    defaults: {
      dailyKwh: 3,
      autonomyDays: 0.5,
      cellTech: 'topcon',
      panelWatts: 500,
      construction: 'monofacial',
      batteryTech: 'lfp',
      hsp: 8
    },

    // Constantes del sistema: se muestran en los resultados y no se editan
    system: {
      derate: 0.85,
      inverterEfficiency: 0.975,
      bifacial: {
        albedo: 0.2,
        bifaciality: 0.75,
        installFactor: 0.5
      }
    }
  },

  // Sección Proceso (#proceso). Los textos se cargan desde aquí.
  process: {
    promisesTitle: 'Cuatro compromisos que respaldan cada paso',
    promise1Title: 'Garantía',
    promise1Text: 'Cada montaje queda respaldado por escrito. Si algo no funciona como debe, volvemos y lo resolvemos.',
    promise2Title: 'Calidad',
    promise2Text: 'Materiales resistentes y acabados cuidados, pensados para durar años bajo el sol y la lluvia.',
    promise3Title: 'Seguridad',
    promise3Text: 'Instalamos siguiendo normas eléctricas y de altura, para proteger a tu familia, tus equipos y tu techo.',
    promise4Title: 'Optimización',
    promise4Text: 'Ajustamos la cantidad de paneles y su ubicación a tu consumo real, para que no pagues de más ni te quedes corto.',
    eyebrow: 'Proceso',
    title: 'Del primer contacto a tu <span class="grad-text">panel conectado</span>',
    subtitle: 'Un proceso claro, sin sorpresas y con una sola pregunta: ¿cómo te contactamos?',
    s1Title: 'Nos contactas',
    s1Text: 'Escríbenos por WhatsApp, Telegram o llámanos. Cuéntanos qué necesitas.',
    s2Title: 'Visitamos tu espacio',
    s2Text: 'Vamos al lugar, medimos y revisamos dónde irán los paneles y la instalación.',
    s3Title: 'Adquirimos los recursos y fijamos el precio',
    s3Text: 'Compramos solo los recursos necesarios, con los mejores materiales, y te damos un precio cerrado con los mejores precios del mercado.',
    s4Title: 'Concretamos la fecha y montamos',
    s4Text: 'Elegimos el día, hacemos el trabajo y te explicamos cómo usar el sistema.',
    caption: 'Montaje en Palma Soriano y toda la provincia',
    alt: 'Panel solar instalado en el patio de una casa de campo cubana, con techo de zinc y montañas al fondo',
    splitYouKicker: 'Tú aportas',
    splitYouTitle: 'Los paneles y los cables solares',
    splitYouText: 'El cliente (tú) provee los paneles y los cables solares que se van a instalar.',
    splitWeKicker: 'Nosotros aportamos',
    splitWeTitle: 'La mano de obra del montaje',
    splitWeText: 'SolarTwin pone la mano de obra para el montaje de las bases.'
  },

  // Preguntas frecuentes. Se muestran en la sección #faq y además generan los
  // datos estructurados (FAQPage) que leen los buscadores.
  // El texto de la respuesta puede llevar enlaces HTML.
  faq: [
    {
      q: '¿Qué incluye el precio del montaje?',
      a: 'Incluye la mano de obra del montaje y los recursos que ponemos nosotros: bases, soportes y el resto de los materiales de la instalación. Los paneles y los cables solares los aporta el cliente.'
    },
    {
      q: '¿Quién compra los paneles y los cables solares?',
      a: 'Los aporta el cliente. Nosotros compramos solo los recursos necesarios para el montaje y te damos un precio cerrado antes de empezar.'
    },
    {
      q: '¿Cuánto tarda el montaje?',
      a: 'Depende del tamaño del sistema y de las condiciones del techo. Después de la visita te damos una fecha y un plazo concreto.'
    },
    {
      q: '¿Qué cubre la garantía?',
      a: 'Cada montaje queda respaldado por escrito. Si algo no funciona como debe, volvemos y lo resolvemos.'
    },
    {
      q: '¿Cómo y cuándo se paga?',
      a: 'En efectivo y al terminar el trabajo, sin pago por adelantado. Aceptamos USD, EUR y CUP; para el CUP la tasa de referencia es la de <a href="https://eltoque.com/" target="_blank" rel="noopener">elToque</a>.'
    },
    {
      q: '¿Llegan a mi municipio?',
      a: 'Trabajamos en toda la provincia de Santiago de Cuba, con base en Palma Soriano. Escríbenos y te confirmamos la fecha más cercana.'
    }
  ],

  // Opiniones de clientes. Si la lista está vacía, la sección no se muestra.
  // Ejemplo: { name: 'Ana', place: 'Palma Soriano', text: '...' }
  testimonials: [],

  // URL pública del sitio cuando tenga dominio propio (sin barra final).
  // Se usa para completar los enlaces al compartir la página.
  siteUrl: ''
}
