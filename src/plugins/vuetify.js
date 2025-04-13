import 'vuetify/styles';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import {
  aliases,
  mdi,
} from 'vuetify/iconsets/mdi';

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#6200EE',
          secondary: '#03DAC6',
          background: '#121212',
          surface: '#1E1E1E',
          error: '#CF6679',
        },
      },
    },
  },
}) 