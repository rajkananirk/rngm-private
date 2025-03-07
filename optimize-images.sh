#!/bin/bash

# Optimize PNG and JPEG
find . -type f -name "*.png" -exec optipng -o5 {} \;
find . -type f -name "*.jpg" -exec jpegoptim --max=85 {} \;

# Convert to WebP
find . -type f \( -name "*.png" -o -name "*.jpg" \) -exec sh -c '
    webp_path="${1%.*}.webp"
    cwebp -q 85 "$1" -o "$webp_path"
' sh {} \;

# Convert to AVIF
find . -type f \( -name "*.png" -o -name "*.jpg" \) -exec sh -c '
    avif_path="${1%.*}.avif"
    avifenc -s 0 "$1" "$avif_path"
' sh {} \; 