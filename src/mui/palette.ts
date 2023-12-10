import { red } from '@mui/material/colors'

export const buildPalette = (isDark: boolean) => ({
  primary: {
    main: isDark ? '#1a1a1a' : '#DAE0E6',
    light: isDark ? '#222' : '#F6F7F8',
    dark: isDark ? '#333' : '#cccecf'
  },
  secondary: {
    main: isDark ? '#fff' : '#1c1c1c',
    dark: isDark ? '#fff' : '#1A1A1B'
  },
  gray: {
    main: '#878A8C',
    light: isDark ? '#444' : '#ccc',
    dark: '#7c7c7c'
  },
  bright: {
    main: isDark ? '#494949' : '#e9f5fd',
    light: isDark ? '#d0d0d0' : '#fff',
    dark: isDark ? '#7c7c7c' : '#DAE0E6'
  },
  white: {
    main: isDark ? '#000' : '#fff'
  },
  black: {
    main: isDark ? '#fff' : '#000'
  },
  blue: {
    main: '#0079D3'
    // light: isDark ? '#d0d0d0': '#e9f5fd'
  },
  orange: {
    main: '#ff4500'
  },
  green: {
    main: '#44b700'
  },
  yellow: {
    main: '#ffd623'
  },
  purple: {
    main: '#fa00e2'
  },
  error: {
    main: red.A400
  },
  premiumPricingBg: {
    main: isDark ? '#ff4500' : '#e9f5fd'
  }
})
