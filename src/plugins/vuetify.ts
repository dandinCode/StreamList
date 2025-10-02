/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#ffffff',
          surface: '#ffffff',
          primary: '#5e57e8',
          secondary: '#03dac6',
          onSurface: '#222222',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#1e1e1e',
          primary: '#5e57e8',
          secondary: '#03dac6',
          onSurface: '#ffffff',
        },
      },
    },
  },
})
export default vuetify
