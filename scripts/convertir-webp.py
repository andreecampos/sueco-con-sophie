#!/usr/bin/env python3
"""
Convierte todas las imágenes PNG (con transparencia) a WebP, manteniendo el
canal alfa y máxima calidad. Perfecto para las imágenes de Juanita.

Uso:
  1) Copia este archivo a la carpeta donde están tus PNG (ej. sueco-imagenes).
  2) Instala Pillow si no lo tienes:   pip3 install Pillow
  3) Ejecuta:                          python3 convertir-webp.py

Genera un .webp por cada .png, conservando la transparencia.
"""
from PIL import Image
import glob, os

pngs = sorted(set(glob.glob('*.png') + glob.glob('*.PNG')))
if not pngs:
    print('No encontré archivos .png en esta carpeta.')
else:
    for f in pngs:
        im = Image.open(f).convert('RGBA')          # conserva la transparencia
        out = os.path.splitext(f)[0] + '.webp'
        # quality=92 + method=6 = excelente calidad con alfa y peso bajo.
        # Para máxima calidad exacta (más peso) cambia por: im.save(out,'WEBP',lossless=True,method=6)
        im.save(out, 'WEBP', quality=92, method=6)
        print(f'  ✓ {f}  →  {out}  ({os.path.getsize(out)//1024} KB)')
    print(f'\nListo. {len(pngs)} imágenes convertidas a WebP (transparencia conservada).')
    print('Ahora sube los .webp a Supabase Storage → bucket assets → carpeta juanita/')
