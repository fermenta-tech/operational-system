# Manual interactivo

`content.js` se genera desde `../../manual/index.md`; no se debe editar a mano.

Para reconstruirlo después de cambiar el Markdown:

```sh
npx --yes marked -i manual/index.md -o /tmp/reduction-manual.html
node ejemplos/manual-interactivo/build-content.mjs \
  /tmp/reduction-manual.html \
  ejemplos/manual-interactivo/content.js
```

Las imágenes se cargan directamente desde `../../manual/images/`.

Los resúmenes bilingües y cuestionarios se mantienen en
`chapter-reviews.mjs`. El avatar narrador utiliza `../../robot.png`.
