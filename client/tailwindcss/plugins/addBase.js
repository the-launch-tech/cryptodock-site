module.exports = function({ addBase, config }) {
  addBase({
    h1: {
      fontSize: config('theme.fontSize.5xl'),
      fontWeight: 700,
      fontFamily: config('theme.fontFamily.display'),
    },
    h2: {
      fontSize: config('theme.fontSize.3xl'),
      fontWeight: 700,
      fontFamily: config('theme.fontFamily.display'),
    },
    h3: {
      fontSize: config('theme.fontSize.xl'),
      fontWeight: 700,
      fontFamily: config('theme.fontFamily.head'),
    },
    h4: {
      fontSize: config('theme.fontSize.lg'),
      fontWeight: 700,
      fontFamily: config('theme.fontFamily.head'),
    },
    h5: {
      fontSize: config('theme.fontSize.base'),
      fontWeight: 700,
      fontFamily: config('theme.fontFamily.head'),
    },
    h6: {
      fontSize: config('theme.fontSize.sm'),
      fontWeight: 700,
      fontFamily: config('theme.fontFamily.head'),
    },
    p: {
      fontSize: config('theme.fontSize.xs'),
      fontWeight: 300,
      fontFamily: config('theme.fontFamily.body'),
    },
    span: {
      fontSize: config('theme.fontSize.xs'),
      fontWeight: 300,
      fontFamily: config('theme.fontFamily.body'),
    },
    li: {
      fontSize: config('theme.fontSize.xs'),
      fontWeight: 300,
      fontFamily: config('theme.fontFamily.body'),
    },
    a: {
      fontSize: config('theme.fontSize.xs'),
      fontWeight: 300,
      fontFamily: config('theme.fontFamily.body'),
    },
    div: {
      fontSize: config('theme.fontSize.xs'),
      fontWeight: 300,
      fontFamily: config('theme.fontFamily.body'),
    },
  })
}
