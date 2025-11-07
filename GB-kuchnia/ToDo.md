# 📋 Instrukcja dla Programisty

Witaj,

Twoim zadaniem jest przekształcenie tego statycznego szablonu HTML/CSS/JS w pełni funkcjonalny, dynamiczny landing page kampanii fundraisingowej. Poniżej znajdują się kluczowe zadania i miejsca w kodzie (``), które wymagają Twojej interwencji.

## Zadania Krytyczne (Backend i Integracje)

1.  **Integracja Bramki Płatności (Sekcja 1 i 5):**
    * Obecny formularz (`<form id="payment-form">`) jest tylko atrapą.
    * Musisz zintegrować go z wybraną bramką płatności (np. PayU, Tpay, Przelewy24). Będzie to wymagało wygenerowania odpowiedniego formularza po stronie serwera lub użycia ich API/widgetu JS.
    * Przycisk `[ WPŁACAM TERAZ ]` musi inicjować rzeczywistą transakcję.
    * Skrypt JS (`handleAmountClick`) do wyboru kwot jest tylko front-endowy. Logika przekazania *finalnej* kwoty do bramki płatności musi zostać zaimplementowana zgodnie z dokumentacją operatora.

2.  **Dynamiczny Pasek Postępu (Sekcja 1):**
    * Elementy `progress-bar-fill` i `progress-stats` są statyczne.
    * Musisz pobierać z bazy danych aktualną zebraną kwotę (`currentAmount`) i cel (`goalAmount`).
    * Wartość `style="width: 15%"` w `.progress-bar-fill` oraz tekst "Zebrano: 22 500 zł" muszą być aktualizowane dynamicznie na podstawie tych danych.

3.  **Dynamiczny Licznik Dni (Sekcja 5):**
    * Dołączyłem podstawowy skrypt JS (`main.js`) do odliczania czasu do Wigilii 2025. Działa on po stronie klienta. Zweryfikuj jego poprawność i upewnij się, że data docelowa jest poprawna.

## Zadania Front-endowe i Optymalizacyjne

1.  **Obrazy (Key Visuale):**
    * W kodzie HTML użyłem placeholderów (`hero-image.png`, `narrative-image-1x1.png`).
    * Podmień je na rzeczywiste, zoptymalizowane obrazy, które dostarczył Ci użytkownik (formaty 4:5, 9:16, 1:1). Użyj `<img>` z atrybutem `srcset` lub tagu `<picture>` dla pełnej responsywności i optymalizacji (np. ładowanie `9-16.png` tylko na mobile w sekcji Hero).
    * Załączone pliki to: `Kuchnia Wspólnoty 1-1.png`, `Kuchnia Wspólnoty 9-16.png`, `Kuchnia Wspólnoty 4-5.png`.

2.  **Walidacja Formularza:**
    * Dodaj walidację dla pola "Inna kwota" (`#other-amount`), aby upewnić się, że wprowadzane są tylko liczby dodatnie.

3.  **Analityka:**
    * Zaimplementuj kody śledzące Google Analytics (GA4) oraz Piksel Meta (Facebook).
    * Skonfiguruj zdarzenia (events) dla:
        * Kliknięcia w sugerowaną kwotę.
        * Kliknięcia w główny przycisk "WPŁACAM TERAZ".
        * Pomyślnego zakończenia płatności (na stronie "Dziękuję", na którą musi przekierować bramka płatności).

4.  **Meta Tagi (SEO i Social Media):**
    * Uzupełnij sekcję `<head>` o odpowiednie meta tagi: `title`, `description` oraz tagi Open Graph (`og:title`, `og:description`, `og:image`). `og:image` jest krytyczny – użyj tu Key Visuala 1:1, aby linki do strony dobrze wyglądały na Facebooku.

Powodzenia!
*Fundraiser GB*