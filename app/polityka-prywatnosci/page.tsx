import React from "react";
import Footer from "../components/Footer";

const Cookies_info = () => <div className="contener"> <div className="cookies">
    <h1 className="header" style={{backgroundColor:'lightblue', textAlign:'center', padding:'15px', borderRadius:'2em'}}>Informacja o plikach cookies</h1><br />
    <h3>Czym są pliki cookies?</h3>
    <p>Pliki cookies (tzw. „ciasteczka”) to niewielkie pliki tekstowe zapisywane i przechowywane na urządzeniu końcowym użytkownika (np. komputerze, smartfonie czy tablecie) podczas przeglądania stron internetowych. Pliki te są powszechnie stosowane w celu poprawy funkcjonalności stron internetowych, dostarczania spersonalizowanych treści oraz analizowania ruchu na stronie.</p><br />

    <h3>Dlaczego stosujemy pliki cookies?</h3>
    <p>Nasza strona internetowa wykorzystuje pliki cookies w celu:</p>
    <p><b>1. Zapewnienia prawidłowego funkcjonowania serwisu</b> – umożliwienia korzystania z podstawowych funkcji strony, takich jak nawigacja czy dostęp do bezpiecznych obszarów witryny. Bez tych plików strona może nie działać prawidłowo.</p>
    <p><b>2. Usprawnienia działania strony</b> – pliki cookies pomagają nam zrozumieć, w jaki sposób użytkownicy korzystają z naszej strony, co pozwala nam na bieżąco ją ulepszać.</p>
    <p><b>3. Personalizacji treści</b> – dostosowywania wyświetlanych treści i reklam do preferencji użytkownika.</p>
    <p><b>4. Analizy i statystyk</b> – zbierania anonimowych danych statystycznych, które pomagają nam lepiej zrozumieć potrzeby użytkowników i dostosowywać stronę do ich oczekiwań.</p>
    <br />
    <h3>Rodzaje plików cookies, które wykorzystujemy</h3>
    <p><b>1. Pliki cookies niezbędne</b> – są niezbędne do prawidłowego działania naszej strony internetowej. Bez nich niektóre funkcjonalności mogą być niedostępne.</p>
    <p><b>2. Pliki cookies analityczne</b> – umożliwiają zbieranie danych na temat sposobu, w jaki użytkownicy korzystają z naszej strony, co pozwala nam na optymalizację treści i funkcjonalności.</p>
    <p><b>3. Pliki cookies funkcjonalne</b> – pozwalają zapamiętywać wybory użytkownika, takie jak preferencje językowe czy ustawienia personalizacyjne.</p>
    <p><b>4. Pliki cookies reklamowe i marketingowe</b> – wykorzystywane do dostarczania spersonalizowanych reklam i treści zgodnych z zainteresowaniami użytkownika.</p>
    <br />
    <h3>Zarządzanie plikami cookies</h3>
    <h4>Każdy użytkownik ma możliwość zarządzania ustawieniami plików cookies:</h4>
    <p><b>1. Zmiana ustawień przeglądarki</b> – Większość przeglądarek internetowych pozwala na kontrolowanie plików cookies, w tym ich blokowanie lub usuwanie. W ustawieniach przeglądarki można wybrać opcję odrzucania wszystkich plików cookies lub tylko tych pochodzących od zewnętrznych dostawców.</p>
    <p><b>2.  Wycofanie zgody</b> – W dowolnym momencie możesz wycofać zgodę na wykorzystywanie plików cookies, usuwając je z przeglądarki i zmieniając ustawienia.</p><br />
    <h3>Jak zmienić ustawienia przeglądarki?</h3>
    <p>
        Aby zmienić ustawienia dotyczące plików cookies, zapoznaj się z instrukcjami dostarczonymi przez producenta przeglądarki, której używasz:<br /><br />
        Google Chrome: <a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=pl" target="blank">Instrukcja</a><br />
        Mozilla Firefox: <a href="https://support.mozilla.org/pl/kb/ciasteczka" target="blank">Instrukcja</a><br />
        Microsoft Edge: <a href="https://support.microsoft.com/pl-pl/microsoft-edge/usuwanie-plik%C3%B3w-cookie-w-przegl%C4%85darce-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="blank">Instrukcja</a><br />
        Safari: <a href="https://support.apple.com/pl-pl/guide/safari/sfri11471/mac" target="blank">Instrukcja</a><br />
    </p><br />
    <h3>Czy pliki cookies przechowują dane osobowe?</h3>
    <p>Pliki cookies, które wykorzystujemy, nie przechowują danych osobowych użytkowników, takich jak imię, nazwisko czy adres e-mail. W niektórych przypadkach dane mogą być zbierane anonimowo w celu analizy statystycznej.
    </p><br />
    <h3>Narzędzia zewnętrzne korzystające z cookies</h3>
    <p>Na naszej stronie mogą być używane narzędzia zewnętrzne, takie jak Google Analytics czy inne systemy analityczne. Narzędzia te wykorzystują własne pliki cookies do zbierania danych o aktywności użytkowników na stronie.
    </p><br />
    <h3>Zmiany w polityce cookies</h3>
    <p>Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej polityce plików cookies w dowolnym momencie. Wszelkie zmiany będą publikowane na tej stronie.
    </p>
</div>
    <Footer /><br />
</div>
export default Cookies_info;