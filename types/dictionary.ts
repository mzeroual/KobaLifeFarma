export interface Dictionary {
  common: {
    navigation: {
      home: string
      products: string
      about: string
      news: string
      contact: string
    }
    buttons: {
      discover: string
      learnMore: string
      readMore: string
      seeAll: string
      send: string
    }
  }
  home: {
    hero: {
      slide1: {
        title: string
        subtitle: string
        cta: string
      }
      slide2: {
        title: string
        subtitle: string
        cta: string
      }
      slide3: {
        title: string
        subtitle: string
        cta: string
      }
    }
    products: {
      title: string
      subtitle: string
      cta: string
    }
    brands: {
      title: string
      subtitle: string
    }
    about: {
      title: string
      paragraph1: string
      paragraph2: string
      cta: string
    }
    news: {
      title: string
      subtitle: string
      cta: string
    }
  }
  products: {
    notFound: string
    brandNotFoundDesc: string
    productNotFound: string
    productNotFoundDesc: string
    about: string
    discover: string
    innovativeSelection: string
    benefits: string
    usage: string
    ingredients: string
    askAdvice: string
    relatedProducts: string
    backTo: string
    image: string
    categories: {
      face: string
      body: string
      antiAge: string
      specific: string
    }
  }
  contact: {
    title: string
    subtitle: string
    info: {
      title: string
      email: string
      phone: string
      address: string
    }
    form: {
      title: string
      name: string
      email: string
      subject: string
      message: string
      consent: string
      submit: string
    }
    faq: {
      title: string
    }
    findUs: string
    mapError: string
  }
  footer: {
    about: string
    links: string
    newsletter: {
      title: string
      text: string
      placeholder: string
      button: string
    }
    copyright: string
    terms: string
    privacy: string
    cookies: string
  }
}
