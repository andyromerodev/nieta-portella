---
name: "La Nieta de Portella"
description: "Sistema de diseño artesanal y refinado para pastelería fina, cupcakes de autor y pedidos directos a WhatsApp"
---

## Overview

La Nieta de Portella es una pastelería fina y repostería artesanal de autor ("Happy Bakes") especializada en cupcakes, tartas delicadas, petit fours y repostería personalizada para ocasiones especiales. 

El lenguaje visual fusiona la calidez del horno tradicional con la sofisticación contemporánea: tonos terracota / coral cálido emblemáticos de la marca, toques de rosa glaseado suave, crema pastelera y contrastes chocolate profundo. La experiencia evoca placer sensorial, indulgencia cuidada y cercanía, garantizando una navegación táctil fluida con un bottom navigation persistente y un carrito optimizado para formalizar encargos directo a WhatsApp con resumen detallado.

## Colors

La paleta se extrae directamente de la identidad de la marca: el icónico corazón batidor en terracota vibrante (`#E2492D` / `#D3381B`), acentos de crema chantilly (`#FFF8F3`), glaseado rosa dulce (`#F7D6D0`), verde menta suave de confirmación y acentos de chocolate oscuro (`#2B1B17`) para máxima legibilidad.

- **Primary:** Terracota de autor, cálido, apetitoso y distintivo.
- **Secondary:** Rosa glaseado suave para badges y momentos dulces.
- **WhatsApp Accent:** Verde auténtico de WhatsApp (`#25D366`) reservado exclusivamente para la acción de checkout y contacto.

```yaml
colors:
  accent: "#E2492D"
  whatsapp: "#25D366"
  whatsapp-hover: "#20BA5A"
  light:
    primary: "#B9321B"
    on-primary: "#FFFFFF"
    primary-container: "#FFDAD3"
    on-primary-container: "#3E0400"
    secondary: "#8F4C38"
    on-secondary: "#FFFFFF"
    secondary-container: "#FFDBCF"
    on-secondary-container: "#380D02"
    tertiary: "#77574E"
    on-tertiary: "#FFFFFF"
    tertiary-container: "#FFDBCF"
    on-tertiary-container: "#2C150F"
    surface: "#FFF8F6"
    on-surface: "#231A18"
    surface-container-low: "#FCF1EE"
    surface-container: "#F6ECE8"
    surface-container-high: "#F0E6E2"
    on-surface-variant: "#534340"
    outline: "#85736F"
    outline-variant: "#D8C2BD"
  dark:
    primary: "#FFB4A5"
    on-primary: "#650B00"
    primary-container: "#772614"
    on-primary-container: "#FFDAD3"
    secondary: "#FFB4A5"
    on-secondary: "#5D180B"
    secondary-container: "#7E3021"
    on-secondary-container: "#FFDBCF"
    tertiary: "#FFB59A"
    on-tertiary: "#53220E"
    tertiary-container: "#6E3722"
    on-tertiary-container: "#FFDBCF"
    surface: "#1D100D"
    on-surface: "#F8DCD7"
    surface-container-low: "#271815"
    surface-container: "#2B1C19"
    surface-container-high: "#362623"
    on-surface-variant: "#E3BEB7"
    outline: "#AA8983"
    outline-variant: "#5A413B"
```

## Typography

Combina una tipografía con serifa editorial de alta repostería (`Playfair Display`) para titulares evocadores con una sans-serif geométrica legible y humana (`Plus Jakarta Sans`) para descripciones, precios y acciones.

Icons: Material Symbols Outlined

```yaml
typography:
  display-lg:
    fontFamily: "Playfair Display"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 48px
    letterSpacing: -0.5px
  display-lg-mobile:
    fontFamily: "Playfair Display"
    fontSize: 30px
    fontWeight: 700
    lineHeight: 36px
    letterSpacing: -0.25px
  headline-lg:
    fontFamily: "Playfair Display"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 38px
    letterSpacing: -0.2px
  headline-lg-mobile:
    fontFamily: "Playfair Display"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 30px
    letterSpacing: -0.1px
  headline-md:
    fontFamily: "Playfair Display"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 28px
  headline-md-mobile:
    fontFamily: "Playfair Display"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 24px
  title-lg:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 18px
    fontWeight: 700
    lineHeight: 24px
  title-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 22px
  body-lg:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  body-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
  label-lg:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
    letterSpacing: 0.1px
  label-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 16px
    letterSpacing: 0.2px
  label-sm:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 14px
```

## Layout & Spacing

Diseñado de forma prioritaria para experiencia móvil táctil (viewport de 390px x 844px) con margen perimetral seguro de 16px a 20px, barra de navegación inferior fija de 64px a 72px con elevación sutil y área de scroll sin interferencias.

```yaml
spacing:
  gutter-xs: 4px
  gutter-sm: 8px
  gutter-md: 16px
  gutter-lg: 24px
  gutter-xl: 32px
  section: 40px
  page-margin: 16px
```

## Elevation & Depth

La jerarquía visual se establece mediante superficies superpuestas cálidas (`surface-container-low`, `surface-container`) combinadas con sombras difusas color canela/chocolate suave (`rgba(50, 20, 10, 0.06)` a `rgba(50, 20, 10, 0.12)`). La barra inferior y los modales flotantes gozan de sombra sutil y borde casi imperceptible de tono `outline-variant` para una sensación premium.

## Shapes

Bordes suaves y orgánicos inspirados en el glaseado y los moldes de repostería. Las tarjetas de producto utilizan esquinas redondeadas generosas (16px a 20px), las píldoras de categorías son circulares y los botones de acción principal cuentan con radios fluidos.

```yaml
rounded:
  sm: 6px
  DEFAULT: 12px
  md: 16px
  lg: 20px
  xl: 28px
  full: 9999px
```

## Motion & Micro-interaction

Micro-interacciones suaves y esponjosas. Al presionar "Agregar al carrito" o los selectores de cantidad, hay una leve respuesta táctil con escala (scale-95). La barra flotante inferior actualiza la insignia numérica con una transición suave.

```yaml
motion:
  state-change:
    duration: 150ms
    delay: 0ms
    timingFunction: ease-out
  surface-enter:
    duration: 250ms
    delay: 0ms
    timingFunction: cubic-bezier(0.16, 1, 0.3, 1)
  surface-exit:
    duration: 180ms
    delay: 0ms
    timingFunction: cubic-bezier(0.3, 0, 1, 1)
```

## Voice & Content Strategy

- **Tono:** Cálido, refinado, apasionado por el detalle dulce y cercano ("Hecho con amor y mantequilla de verdad"). Evita frialdad corporativa o formalismos distantes.
- **Mayúsculas:** Capitalización tipo oración para títulos y descripciones; nombres propios y categorías destacados con sutileza.
- **Acciones:** Verbos directos y apetecibles: *"Pedir por WhatsApp"*, *"Añadir al pedido"*, *"Ver detalles"*, *"Personalizar tarta"*.
- **WhatsApp Flow:** Transparencia total en el carrito: desglose de productos, sabores seleccionados, dedicatoria o nota de entrega, fecha deseada y el botón verde icónico que abre el chat con el mensaje pre-redactado de forma impecable.

## Components

Component implementations live as individual HTML sticker sheet files in
`components/`. Each file contains the canonical, styled HTML components with
`<!-- COMPONENT: name -->` comment markers. Read each file before use.

- **Badge** → `@components/badge.html`: `badge-numeric`, `badge-dot`
- **Button** → `@components/button.html`: `button-primary`, `button-icon`, `button-with-icon`
- **Card** → `@components/card.html`: `card-elevated`, `card-action`, `card-interactive`, `card-interactive-2`
- **Input Field** → `@components/input-field.html`: `input-field-text`, `input-field-icon`
