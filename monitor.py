#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Мониторинг сайтов семьи Горбатова. Запуск:  python3 monitor.py
Проверяет доступность (HTTP-статус) и изменения главной (хэш контента).
Состояние хранит в monitor_state.json. Код возврата 1, если что-то лежит.
"""
import os, sys, json, hashlib, urllib.request, ssl

BASE = os.path.dirname(os.path.abspath(__file__))
STATE = os.path.join(BASE, 'monitor_state.json')
CTX = ssl.create_default_context(); CTX.check_hostname=False; CTX.verify_mode=ssl.CERT_NONE

SITES = {
    "Головной (ФНЦ/ВНИИМП)": "https://www.vniimp.ru/",
    "ВНИИ кондитерской (наш)": "https://wniikp.ru/",
    "Испытательный центр (НИИЦ)": "https://www.ic.vniimp.ru/",
    "ВНИИ пищевых добавок": "http://www.vniipd.ru/",
    "ВНИИ напитков": "https://www.vniinapitkov.ru/",
    "Учебный центр": "https://edu.vniimp.ru/",
}

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (monitor)'})
    with urllib.request.urlopen(req, timeout=20, context=CTX) as r:
        return r.status, r.read(200000)

state = {}
if os.path.exists(STATE):
    try: state = json.load(open(STATE, encoding='utf-8'))
    except Exception: state = {}

rows, problems = [], []
new_state = {}
for name, url in SITES.items():
    try:
        status, body = fetch(url)
        h = hashlib.sha256(body).hexdigest()[:16]
        txt = body.decode('utf-8', 'ignore').lower()
        suspended = any(k in txt for k in ('работа сайта приостановлена', 'account suspended', 'срок действия услуги'))
        if status == 200 and not suspended:
            prev = state.get(url, {}).get('hash')
            changed = prev is not None and prev != h
            mark = 'ИЗМЕНИЛСЯ' if changed else 'OK'
            if changed: problems.append(f"{name}: контент изменился")
        else:
            mark = 'ОТКЛЮЧЁН' if suspended else f'HTTP {status}'
            problems.append(f"{name}: {mark}")
        new_state[url] = {'hash': h, 'status': status}
        rows.append(f"  {'✓' if mark=='OK' else ('~' if mark=='ИЗМЕНИЛСЯ' else '✗')} {name:30s} {mark:12s} {url}")
    except Exception as e:
        rows.append(f"  ✗ {name:30s} {'НЕДОСТУПЕН':12s} {url}  ({type(e).__name__})")
        problems.append(f"{name}: недоступен ({type(e).__name__})")
        new_state[url] = {'hash': None, 'status': 'error'}

json.dump(new_state, open(STATE, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print("Мониторинг сайтов ФНЦ им. Горбатова:")
print('\n'.join(rows))
print(f"\nИтог: {'всё в норме' if not problems else 'ВНИМАНИЕ — ' + '; '.join(problems)}")
sys.exit(1 if problems else 0)
