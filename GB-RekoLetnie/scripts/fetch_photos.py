#!/usr/bin/env python3
"""
fetch_photos.py — pobiera zdjęcia typów (room/hall/chapel/dining/exterior)
dla TOP 5 lokalizacji i zapisuje je do assets/images/<slug>/<type>.<ext>.

Uruchom lokalnie w katalogu projektu:
    pip install -r scripts/requirements.txt
    python scripts/fetch_photos.py
"""
import os, re, sys, json, pathlib
from urllib.parse import urljoin
import mimetypes
import requests
from bs4 import BeautifulSoup

ROOT = pathlib.Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
OUT = ASSETS / "images"
SOURCES = json.load(open(ROOT/"scripts"/"photo_sources.json", encoding="utf-8"))
SESSION = requests.Session()
HEADERS = {"User-Agent":"Mozilla/5.0 (+OnePagerGB/1.0; contact: wspolnota@example.org)"}

KEYS = {
  "room": ["pokoj","pokoje","room"],
  "hall": ["sala","konferencyjna","conference"],
  "chapel": ["kaplica","oratorium","chapel","kosciol","kościół"],
  "dining": ["jadalnia","restauracja","dining","stołówka","stolowka"],
  "exterior": ["budynek","zewn","fasada","front","building","ogród","ogrod"]
}

def ensure_dir(p: pathlib.Path):
  p.mkdir(parents=True, exist_ok=True)

def pick_ext(content_type:str, url:str)->str:
  if "jpeg" in content_type: return ".jpg"
  if "jpg" in content_type: return ".jpg"
  if "png" in content_type: return ".png"
  if "webp" in content_type: return ".webp"
  guess = mimetypes.guess_extension(mimetypes.guess_type(url)[0] or "")
  return guess or ".jpg"

def try_download(url:str, dest: pathlib.Path)->bool:
  try:
    r = SESSION.get(url, headers=HEADERS, timeout=40)
    r.raise_for_status()
    ext = pick_ext(r.headers.get("Content-Type","").lower(), url)
    if not dest.suffix:
      dest = dest.with_suffix(ext)
    with open(dest, "wb") as f:
      f.write(r.content)
    print("zapisałem", dest)
    return True
  except Exception as e:
    print("błąd pobierania", url, "->", e)
    return False

def find_imgs_in_html(base_url:str, html:str):
  soup = BeautifulSoup(html, "html.parser")
  urls = set()
  # <img src> i linki do obrazów
  for tag in soup.find_all(["img","a"]):
    src = tag.get("src") or tag.get("href") or ""
    if not src: 
      continue
    u = urljoin(base_url, src)
    if any(ext in u.lower() for ext in [".jpg",".jpeg",".png",".webp"]):
      urls.add(u)
  # css background-image: url(...)
  for el in soup.find_all(style=True):
    st = el.get("style","")
    m = re.search(r"url\\(([^)]+)\\)", st)
    if m:
      u = m.group(1).strip("'\"")
      u = urljoin(base_url, u)
      if any(ext in u.lower() for ext in [".jpg",".jpeg",".png",".webp"]):
        urls.add(u)
  return list(urls)

def score_for_type(url:str, type_key:str)->int:
  s = 0
  u = url.lower()
  for kw in KEYS[type_key]:
    if kw in u: s += 5
  # prefer bigger files by common hints
  if any(x in u for x in ["large","full","1200","1600","1920","scaled"]):
    s += 2
  # de-prioritize thumbnails
  if any(x in u for x in ["thumb","mini","-150x","-300x","-1024x"]):
    s -= 1
  return s

def fetch_for_slug(slug:str, cfg:dict):
  out_dir = OUT / slug
  ensure_dir(out_dir)
  pages = cfg.get("pages", [])
  # pre-fetch pages HTML once
  page_html = {}
  for p in pages:
    try:
      r = SESSION.get(p, headers=HEADERS, timeout=30)
      r.raise_for_status()
      page_html[p] = r.text
    except Exception as e:
      print(slug, "błąd strony", p, e)
  # for each type, first try explicit URLs, then scan pages
  for type_key in ["room","hall","chapel","dining","exterior"]:
    dest = out_dir / f"{type_key}"
    # explicit list
    for url in cfg.get("targets", {}).get(type_key, []):
      if try_download(url, dest):
        break
    else:
      # fallback: find in pages
      candidates = []
      for p, html in page_html.items():
        for u in find_imgs_in_html(p, html):
          candidates.append((score_for_type(u, type_key), u))
      candidates.sort(reverse=True)
      for _, u in candidates[:10]:
        if try_download(u, dest):
          break

def main():
  total = 0
  for slug, cfg in SOURCES.items():
    print("==", slug, "==", cfg.get("name",""))
    fetch_for_slug(slug, cfg)
  print("Gotowe. Sprawdź assets/images/<slug>/")
if __name__ == "__main__":
  main()
