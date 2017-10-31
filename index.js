const flatten = require('flatten')

function extend (prefix, suffix) {
  if (!Array.isArray(prefix)) {
    prefix = [prefix]
  }
  if (!Array.isArray(suffix)) {
    suffix = [suffix]
  }
  return prefix.reduce((prev, curr) => {
    return prev.concat(suffix.map(i => curr + i))
  }, [])
}

const trbl = ['', '-top', '-right', '-bottom', '-left']

const order = [
  'content',

  // Positioning
  'position', 'z-index', 'top', 'right', 'bottom', 'left', 'float', 'clear',

  // Display & Box Model
  'display',
  // Flex
  extend('flex', ['-flow', '-direction', '-wrap']),
  'justify-content', 'align-content', 'align-items', 'align-self', 'order',
  extend('flex', ['', '-basis', '-grow', '-shrink']),
  // Box Model
  'box-sizing', extend('overflow', ['', '-x', '-y']),
  extend(['', 'min-', 'max-'], 'width'),
  extend(['', 'min-', 'max-'], 'height'),
  extend('padding', trbl),
  extend(extend('border', trbl), ['', '-width', '-style', '-color']),
  'border-radius',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-right-radius',
  'border-bottom-left-radius',
  extend('margin', trbl),
  'outline',
  'box-shadow',

  // Color
  extend('background', [
    '',
    '-attachment',
    '-clip',
    '-color',
    '-image',
    '-origin',
    '-position',
    '-repeat',
    '-size'
  ]),
  'color',

  // Text
  extend('font', ['', '-family', '-size', '-weight']),
  'text-align', 'text-decoration', 'text-overflow',
  'word-break', 'word-wrap', 'white-spacing',
  'vertical-align',

  // Appearance
  'opacity', 'visibility'
]

module.exports = {
  plugins: ['stylelint-order'],
  rules: {
    'order/order': ['custom-properties', 'declarations', 'rules'],
    'order/properties-order': [flatten(order), { unspecified: 'bottom' }]
  }
}
