'use client';
import CookieConsent from 'react-cookie-consent'

export const CookieBanner = () => (
  <CookieConsent
    location="bottom"
    buttonText="Akceptuję"
    declineButtonText="Odrzuć"
    cookieName="cookieConsent"
    style={{ background: '#07080B'}}
    buttonStyle={{ background: 'blue', color: 'white', borderRadius: '4px', fontWeight:600 }}
    declineButtonStyle={{ background: 'red', color: 'white', borderRadius: '4px',fontWeight:600 }}
    expires={365}
    enableDeclineButton
    overlay
    onAccept={() => {
      // Inicjalizacja Google Analytics
      window.gtag('config', 'G-V5XJZG59LS')
    }}
  >
    Strona używa plików cookies. Więcej w{' '}
    <a href="/polityka-prywatnosci" className="cookieLink">
      polityce prywatności
    </a>.
  </CookieConsent>
)