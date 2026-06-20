#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Авто-QA прототипа ВНИИКП. Запуск:  python3 qa.py  [--all]
Проверяет (без браузера): битые внутренние ссылки и #якоря, обязательные SEO-теги,
alt у <img>, контраст WCAG по токенам, вес картинок, остатки эмодзи/плейсхолдеров,
согласие на ПДн в формах, единственный <h1>. Код возврата 1 при ошибках.
"""
import os, re, sys, json, glob

BASE = os.path.dirname(os.path.abspath(__file__))
SCAN_ALL = '--all' in sys.argv
SKIP_SEO = {'ct-analyzer.html'}            # движок — со своей структурой
errors, warns = [], []
def err(p, m): errors.append(f"  ✗ [{p}] {m}")
def warn(p, m): warns.append(f"  ! [{p}] {m}")

def html_files():
    files = sorted(glob.glob(os.path.join(BASE, '*.html')))
    if SCAN_ALL:
        files += sorted(glob.glob(os.path.join(BASE, 'versions', '**', '*.html'), recursive=True))
    return files

# ---------- собрать карту id по страницам ----------
pages = {}
for f in html_files():
    s = open(f, encoding='utf-8').read()
    rel = os.path.relpath(f, BASE)
    pages[rel] = {
        'dir': os.path.dirname(rel),
        'ids': set(re.findall(r'id="([^"]+)"', s)),
        'src': s,
    }

# ---------- WCAG контраст ----------
def lin(v):
    v /= 255
    return v/12.92 if v <= 0.03928 else ((v+0.055)/1.055)**2.4
def L(hexc):
    h = hexc.lstrip('#')
    if len(h) == 3: h = ''.join(c*2 for c in h)
    r,g,b = int(h[0:2],16), int(h[2:4],16), int(h[4:6],16)
    return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b)
def CR(a, b):
    la, lb = L(a), L(b); hi, lo = max(la,lb), min(la,lb)
    return (hi+0.05)/(lo+0.05)

def tokens():
    css = open(os.path.join(BASE,'styles.css'), encoding='utf-8').read()
    root = re.search(r':root\{(.*?)\}', css, re.S).group(1)
    t = dict(re.findall(r'--([\w-]+):\s*(#[0-9a-fA-F]{3,6})', root))
    return t, css

def check_contrast():
    t, _ = tokens()
    white = '#ffffff'
    pairs = [
        ('CTA-кнопка (текст на янтаре)', '#1b2733', t['amber']),
        ('Kicker / теги', t['amber-dark'], t['bg']),
        ('Бейдж: красный на тинте', t['blue'], t['blue-soft']),
        ('Ghost-кнопка / .more / цифры', t['blue'], white),
        ('Основной текст', t['ink'], t['bg']),
        ('Приглушённый текст', t['muted'], white),
        ('Зелёный статус', t['good'], t['good-soft']),
    ]
    print("\n— Контраст WCAG (норма AA ≥ 4.5):")
    for name, fg, bg in pairs:
        r = CR(fg, bg)
        mark = '✓' if r >= 4.5 else ('~' if r >= 3 else '✗')
        line = f"  {mark} {name}: {r:.2f}:1  ({fg} / {bg})"
        print(line)
        if r < 4.5:
            (err if r < 3 else warn)('контраст', f"{name} = {r:.2f}:1 (нужно ≥4.5)")

# ---------- проверки по страницам ----------
EMOJI = re.compile('[\U0001F000-\U0001FAFF☀-➿⬀-⯿⚗⚠✅❌]')
KEEP = {'✓','✕','→','›','—','–','…','·','★'}

for rel, p in sorted(pages.items()):
    s = p['src']; base = os.path.basename(rel)
    # --- SEO / структура ---
    if base not in SKIP_SEO:
        if not re.search(r'<html[^>]*\blang=', s): warn(rel, 'нет lang у <html>')
        if not re.search(r'<meta name="viewport"', s): err(rel, 'нет viewport')
        if not re.search(r'<title>.+?</title>', s, re.S): err(rel, 'нет <title>')
        if not re.search(r'<meta name="description" content=".+?"', s): warn(rel, 'нет meta description')
        for prop in ('og:title','og:description','og:image','og:url'):
            if f'property="{prop}"' not in s: warn(rel, f'нет {prop}')
        if 'rel="canonical"' not in s: warn(rel, 'нет canonical')
        if 'rel="icon"' not in s: warn(rel, 'нет favicon')
        ld = re.search(r'<script type="application/ld\+json">(.*?)</script>', s, re.S)
        if not ld: warn(rel, 'нет JSON-LD')
        else:
            try: json.loads(ld.group(1))
            except Exception as e: err(rel, f'JSON-LD не парсится: {e}')
        h1 = len(re.findall(r'<h1[ >]', s))
        if h1 != 1: warn(rel, f'<h1> на странице: {h1} (ожидается 1)')
    # --- img alt ---
    for tag in re.findall(r'<img\b[^>]*>', s):
        if 'src="data:' in tag: continue
        if not re.search(r'\balt="[^"]', tag): err(rel, f'<img> без alt: {tag[:60]}…')
    # --- внутренние ссылки и якоря ---
    for m in re.finditer(r'<a\b[^>]*\bhref="([^"]+)"', s):
        href = m.group(1)
        if href.startswith(('http://','https://','mailto:','tel:')): continue
        if href.startswith('#'):
            if href[1:] and href[1:] not in p['ids']: err(rel, f'битый якорь {href}')
            continue
        path, _, anchor = href.partition('#')
        if not path: continue
        target = os.path.normpath(os.path.join(p['dir'], path)) if p['dir'] else path
        tfile = os.path.join(BASE, target)
        if not os.path.exists(tfile):
            err(rel, f'битая ссылка → {href} (нет файла {target})')
        elif anchor and target in pages and anchor not in pages[target]['ids']:
            err(rel, f'битый якорь → {href}')
    # --- локальные ресурсы (css/js/img/use sprite не трогаем) ---
    for m in re.finditer(r'<(?:link|script|img|iframe)\b[^>]*\b(?:href|src)="([^"]+)"', s):
        u = m.group(1)
        if u.startswith(('http://','https://','data:','mailto:','tel:','#')): continue
        path = u.split('#')[0].split('?')[0]
        tfile = os.path.join(BASE, p['dir'], path) if p['dir'] else os.path.join(BASE, path)
        if not os.path.exists(tfile): err(rel, f'нет ресурса → {u}')
    # --- остатки эмодзи / плейсхолдеров ---
    for ch in set(EMOJI.findall(s)) - KEEP:
        warn(rel, f'остался эмодзи-символ: {ch} (U+{ord(ch):04X})')
    for ph in ('TODO','Lorem','lorem','____'):
        if ph in s: warn(rel, f'плейсхолдер «{ph}»')
    # --- формы: согласие на ПДн ---
    for form in re.findall(r'<form\b.*?</form>', s, re.S):
        if 'lead-form' in form:
            if 'type="checkbox" required' not in form: err(rel, 'форма без обязательного согласия (чекбокс)')
            if 'politika.html' not in form: warn(rel, 'в форме нет ссылки на политику')

# ---------- вес картинок ----------
print("\n— Вес изображений:")
for img in sorted(glob.glob(os.path.join(BASE,'img','*'))):
    kb = os.path.getsize(img)/1024
    mark = '✓' if kb < 400 else '!'
    print(f"  {mark} img/{os.path.basename(img)}: {kb:.0f} КБ")
    if kb >= 400: warn('img', f'{os.path.basename(img)} весит {kb:.0f} КБ — оптимизировать (<400)')

# ---------- контраст + итог ----------
check_contrast()
print(f"\n=== ИТОГ: {len(errors)} ошибок, {len(warns)} предупреждений ===")
if errors: print("\nОШИБКИ:\n" + "\n".join(errors))
if warns: print("\nПРЕДУПРЕЖДЕНИЯ:\n" + "\n".join(warns))
sys.exit(1 if errors else 0)
