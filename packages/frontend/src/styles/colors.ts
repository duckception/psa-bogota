const breakpoints = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '1024px',
  xl: '1216px',
  hd: '1408px',
}

const palette = {
  // neutrals
  white: '#FFFFFF',
  athens: '#F8F9FB',
  porcelain: '#E6EBF2',
  mystic: '#D0D6E6',
  casper: '#9FAAC4',
  waterloo: '#7A859E',
  stone: '#0B0E14',
  shark: '#15181F',

  // brand
  cobalt: '#1A5AFF',
  cobaltLight: '#ECF1FF',
  cobaltDark: '#0749F3',

  // technicals
  red: '#FF4545',
  redLight: '#FFE9E9',
  redDark: '#D94949',

  green: '#0FD28C',
  greenLight: '#E0F9F0',
  greenDark: '#007C50',

  orange: '#FFA350',
  orangeLight: '#FFF1E7',
  orangeDark: '#BA5C18',
}

const colors = {
  white: palette.white,
  black: palette.stone,

  // brand
  brand: palette.cobalt,
  brandLight: palette.cobaltLight,
  brandDark: palette.cobaltDark,

  // theme can make variable for light/dark modes
  background: palette.white,
  text: palette.stone,

  // grayscale (ex. gray.1)
  gray: [
    palette.white,
    palette.athens,
    palette.porcelain,
    palette.mystic,
    palette.casper,
    palette.waterloo,
    palette.stone,
    palette.shark,
  ],

  // status groups
  success: palette.green,
  successLight: palette.greenLight,
  successDark: palette.greenDark,

  danger: palette.red,
  dangerLight: palette.redLight,
  dangerDark: palette.redDark,

  warning: palette.orange,
  warningLight: palette.orangeLight,
  warningDark: palette.orangeDark,
}

export default { breakpoints, palette, colors, borderRadius: '4px', borderColor: '#E7EAF3' }
