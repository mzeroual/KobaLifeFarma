import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import { ContactForm } from "@/components/contact-form"
import MapWrapper from "@/components/map-wrapper"

export const metadata: Metadata = {
  title: "Contact | KOBALIFE",
  description: "Contactez-nous pour toute question concernant nos produits ou pour obtenir des conseils personnalisés.",
}

export default async function ContactPage({ params }: { params: { lang: string } }) {
  // Await params to properly access its properties
  const resolvedParams = await params
  const lang = resolvedParams.lang || "fr"

  // Load the dictionary for the current language
  const dict = await getDictionary(lang)

  // Business location coordinates (Casablanca, Morocco as an example)
  const businessLocation: [number, number] = [33.5731, -7.5898]
  const businessName = "KOBALIFE"

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {/* En-tête */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{dict.contact?.title || "Contactez-nous"}</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          {dict.contact?.subtitle ||
            "Vous avez des questions sur nos produits ou souhaitez en savoir plus sur KOBALIFE ? N'hésitez pas à nous contacter."}
        </p>
        <div className="flex justify-center">
          <div className="w-20 h-1 bg-emerald-600 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Informations de contact */}
        <div>
          <h2 className="text-3xl font-bold mb-8">{dict.contact?.info?.title || "Nos coordonnées"}</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{dict.contact?.info?.email || "Email"}</h3>
                <p className="text-gray-600">contact@kobalife.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{dict.contact?.info?.phone || "Téléphone"}</h3>
                <p className="text-gray-600">+212 6 00 00 00 00</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{dict.contact?.info?.address || "Adresse"}</h3>
                <p className="text-gray-600">123 Avenue Mohammed V, Casablanca, Maroc</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Horaires d'ouverture</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Lundi - Vendredi</p>
                  <p className="text-gray-600">9h00 - 18h00</p>
                </div>
                <div>
                  <p className="font-medium">Samedi</p>
                  <p className="text-gray-600">10h00 - 16h00</p>
                </div>
                <div>
                  <p className="font-medium">Dimanche</p>
                  <p className="text-gray-600">Fermé</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Suivez-nous</h2>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-100 hover:bg-emerald-100 p-3 rounded-full text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-gray-100 hover:bg-emerald-100 p-3 rounded-full text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-gray-100 hover:bg-emerald-100 p-3 rounded-full text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Formulaire de contact */}
        <ContactForm dict={dict} />
      </div>

      {/* FAQ */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold mb-8 text-center">{dict.contact?.faq?.title || "Questions fréquentes"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-3">Comment choisir les produits adaptés à ma peau ?</h3>
            <p className="text-gray-600">
              Nous vous recommandons de déterminer votre type de peau (normale, sèche, grasse, mixte ou sensible) et vos
              préoccupations principales (hydratation, anti-âge, éclat, etc.). Vous pouvez ensuite consulter les
              descriptions de nos gammes pour trouver celle qui correspond le mieux à vos besoins.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-3">Vos produits sont-ils testés sur les animaux ?</h3>
            <p className="text-gray-600">
              Non, aucun de nos produits n'est testé sur les animaux. KOBALIFE s'engage pour une cosmétique éthique et
              responsable.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-3">Comment passer une commande ?</h3>
            <p className="text-gray-600">
              Vous pouvez passer commande directement sur notre site web, par téléphone ou en visitant l'un de nos
              points de vente. Pour toute assistance, n'hésitez pas à contacter notre service client.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-3">Quels sont les délais de livraison ?</h3>
            <p className="text-gray-600">
              Les délais de livraison varient selon votre localisation. En général, comptez 2 à 5 jours ouvrables pour
              une livraison au Maroc et 5 à 10 jours pour l'international.
            </p>
          </div>
        </div>
      </div>

      {/* Carte */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">{dict.contact?.findUs || "Nous trouver"}</h2>
        <MapWrapper center={businessLocation} markerPosition={businessLocation} popupText={businessName} dict={dict} />
      </div>
    </div>
  )
}
