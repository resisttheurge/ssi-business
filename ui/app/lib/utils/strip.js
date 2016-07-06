export const _strip = (
  { left = /\s*\|/
  , right = /\s*/
  , replacement = ''
  } = {}
) => do {
  const src = x => x instanceof RegExp ? x.source : x
      , regex = new RegExp(`(^${src(left)})|(${src(right)}$)`, 'm')
      , replace = (str) => str.replace(regex, replacement)
      , tag = (strings, ...values) =>
        do {
          const value = (i) => values[i]
              , interpolate = (str, i) => `${replace(str)}${value(i)}`
          strings.map(interpolate).join('')
        }

  tag
}

export const strip = _strip()

export default strip
