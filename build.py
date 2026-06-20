#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Генератор общих блоков из site.json. Запуск:  python3 build.py
Пересобирает на всех страницах: топбар, меню (с активным пунктом и CTA), подвал.
Уникальный контент страниц не трогает. Идемпотентно. ct-analyzer.html и versions/ — пропускаются.
"""
import os, re, json, glob

BASE = os.path.dirname(os.path.abspath(__file__))
S = json.load(open(os.path.join(BASE, 'site.json'), encoding='utf-8'))
C, ORG, F = S['contacts'], S['org'], S['footer']

def ic(name):
    return f'<svg class="ic" aria-hidden="true"><use href="#ico-{name}"></use></svg>'

def topbar():
    return ('<div class="topbar"><div class="wrap">\n'
            f'  <span class="left">{ORG["topbar_left"]}</span>\n'
            f'  <a href="tel:{C["phone_href"]}">{C["phone"]}</a>\n'
            f'  <a href="mailto:{C["email"]}">{C["email"]}</a>\n'
            '  <button class="a11y-toggle" aria-label="Включить версию для слабовидящих"><svg class="ic" aria-hidden="true"><use href="#ico-eye"></use></svg><span>Для слабовидящих</span></button>\n'
            '</div></div>')

def nav(active, cta):
    lines = ['<nav class="nav" aria-label="Главное меню">']
    for it in S['nav']:
        kids = it.get('children')
        if kids:
            hrefs = {it['href'].split('#')[0]} | {c['href'].split('#')[0] for c in kids}
            act = ' active' if active in hrefs else ''
            lines.append('    <div class="nav-dd">')
            lines.append(f'      <a href="{it["href"]}" class="nav-dd-t{act}">{it["label"]}<span class="dd-caret">▾</span></a>')
            lines.append('      <div class="dd-menu">')
            for c in kids:
                lines.append(f'        <a href="{c["href"]}">{c["label"]}</a>')
            lines.append('      </div>')
            lines.append('    </div>')
        else:
            cls = ' class="active"' if it['href'] == active else ''
            lines.append(f'    <a href="{it["href"]}"{cls}>{it["label"]}</a>')
    lines.append('    <a href="poisk.html" class="nav-search" aria-label="Поиск"><svg class="ic" aria-hidden="true"><use href="#ico-search"></use></svg></a>')
    lines.append(f'    <a href="{cta["href"]}" class="btn btn-primary cta">{cta["label"]}</a>')
    lines.append('  </nav>')
    return '\n'.join(lines)

def links(items):
    return ''.join(f'<li><a href="{i["href"]}">{i["label"]}</a></li>' for i in items)

def footer():
    contacts = (f'{C["address_html"]}<br>'
                f'{ic("phone")} <a href="tel:{C["phone_href"]}">{C["phone"]}</a><br>'
                f'{ic("mail")} <a href="mailto:{C["email"]}">{C["email"]}</a><br>'
                f'<span style="opacity:.85;font-size:13px">Режим работы: {C["hours"]}</span>')
    return ('<footer class="footer"><div class="wrap">\n'
            '  <div class="cols">\n'
            f'    <div><div class="fbrand">{ORG["short"]}</div><p>{ORG["full"]}</p>'
            f'<div class="a11y-note">{ic("accessibility")} {S["a11y_note"]}</div></div>\n'
            f'    <div><h4>Институт</h4><ul>{links(F["institute"])}</ul></div>\n'
            f'    <div><h4>Услуги</h4><ul>{links(F["services"])}</ul></div>\n'
            f'    <div><h4>Контакты</h4><p>{contacts}</p></div>\n'
            '  </div>\n'
            f'  <div class="bottom"><span>{F["copyright"]}</span>'
            f'<span><a href="politika.html">Политика конфиденциальности</a> · {F["bottom_note"]}</span></div>\n'
            '</div></footer>')

nav_hrefs = set()
for _it in S['nav']:
    nav_hrefs.add(_it['href'])
    for _c in _it.get('children', []):
        nav_hrefs.add(_c['href'].split('#')[0])
changed = 0
for f in sorted(glob.glob(os.path.join(BASE, '*.html'))):
    base = os.path.basename(f)
    if base == 'ct-analyzer.html':
        continue
    s = open(f, encoding='utf-8').read()
    orig = s
    active = base if base in nav_hrefs else S['active_alias'].get(base)
    cta = S['cta_page'].get(base, S['cta_default'])
    s = re.sub(r'<div class="topbar">.*?</div></div>', lambda m: topbar(), s, count=1, flags=re.S)
    s = re.sub(r'<nav class="nav".*?</nav>', lambda m: nav(active, cta), s, count=1, flags=re.S)
    s = re.sub(r'<footer class="footer">.*?</footer>', lambda m: footer(), s, count=1, flags=re.S)
    # единый источник: номер лицензии в теле + контакты в JSON-LD
    s = re.sub(r'(лицензии №&nbsp;)[^<]*', lambda m: m.group(1) + C['license'] + '.', s)
    s = re.sub(r'"telephone": "[^"]*"', f'"telephone": "{C["tel_schema"]}"', s)
    s = re.sub(r'"email": "[^"]*"', f'"email": "{C["email"]}"', s)
    s = re.sub(r'"postalCode": "[^"]*"', f'"postalCode": "{C["postal"]}"', s)
    s = re.sub(r'"addressLocality": "[^"]*"', f'"addressLocality": "{C["locality"]}"', s)
    s = re.sub(r'"streetAddress": "[^"]*"', f'"streetAddress": "{C["street"]}"', s)
    if s != orig:
        open(f, 'w', encoding='utf-8').write(s)
        changed += 1
        print(f"  обновлён {base}  (актив: {active or '—'}, CTA: {cta['label']})")
print(f"Готово: пересобрано блоков на {changed} страницах.")
