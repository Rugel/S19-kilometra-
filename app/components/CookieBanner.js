'use client'

import CookieConsent from 'react-cookie-consent'

export const CookieBanner = () => (
  <CookieConsent
    location="bottom"
    buttonText="Akceptuję"
    declineButtonText="Odrzuć"
    cookieName="cookieConsent"
    style={{ background: '#1f2937'}}
    buttonStyle={{ background: '#3b82f6', color: 'white', borderRadius: '4px' }}
    declineButtonStyle={{ background: '#ef4444', color: 'white', borderRadius: '4px' }}
    expires={365}
    enableDeclineButton
    overlay
    onAccept={() => {
      // Inicjalizacja Google Analytics
      window.gtag('config', 'G-V5XJZG59LS')
    }}
  >
    Strona używa plików cookies. Więcej w{' '}
    <a href="/polityka-prywatnosci" className="text-blue-300 underline">
      polityce prywatności
    </a>.
  </CookieConsent>
)