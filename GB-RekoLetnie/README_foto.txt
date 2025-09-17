# Zdjęcia do TOP 5 – jak dodać

Ten pakiet nie ma dostępu do internetu, dlatego zdjęcia pobierzesz **u siebie** jednym poleceniem.

## Krok 1 – przygotuj środowisko
- Wymagany: **python 3.9+** oraz pakiety z `scripts/requirements.txt`:
  ```bash
  pip install -r scripts/requirements.txt
  ```

## Krok 2 – uruchom pobieranie
W katalogu projektu (`site_gwiazda_betlejemska/`) wykonaj:
```bash
python scripts/fetch_photos.py
```
Skrypt pobierze do 3 zdjęć dla każdej lokalizacji z oficjalnych stron / galerii i zapisze do:
- assets/images/bialogora/
- assets/images/debki/
- assets/images/rybaki/
- assets/images/warzenko/
- assets/images/dworek-olenka/

Jeśli jakaś strona zmieni układ lub blokuje boty, skrypt zostawi placeholdery – wtedy wgraj zdjęcia ręcznie do powyższych folderów (nazwy plików mogą być dowolne).

## Źródła (startowe adresy)
- Białogóra: https://www.dombialogora.pl/galeria.html
- Dębki (CR): https://debki-cr.pl/galeria/
- Rybaki (Caritas): https://rybaki.org.pl/
- Warzenko (Caritas): https://www.osrodekwarzenko.pl/galerie/
- Dworek Oleńka: https://www.weselezklasa.pl/ogloszenia-weselne/dworek-olenka,38341/

## Uwaga prawna
- Zdjęcia pozostają własnością swoich autorów/właścicieli. Używaj ich **wyłącznie** zgodnie z prawem i regulaminami serwisów (w szczególności FB/IG/Google mają osobne zasady).
- Do publicznej publikacji na stronie rekomenduję: uzyskać zgodę ośrodków **albo** użyć zdjęć własnych. W razie potrzeby dodaj krótkie podpisy/atrybucje w kodzie HTML.

Generacja: 2025-09-16T23:37:55.853193 UTC


---
Aktualizacja: skrypt pobiera teraz konkretnie 5 ujęć: room, hall, chapel, dining, exterior (jeśli się uda znaleźć). Pliki zapisuje jako nazwy odpowiadające tym typom.
