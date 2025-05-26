import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'pokeApp',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,        // Tiempo visible (ms)
      launchAutoHide: true,            // Oculta automáticamente
      showSpinner: false,              // Sin spinner
      splashFullScreen: true,          // Pantalla completa
      splashImmersive: true,           // Oculta barra de estado (Android)
      backgroundColor: '#ffffff',      // Fondo blanco
      androidScaleType: 'CENTER_CROP', // Escala tipo Android
      iosContentMode: 'scaleAspectFill'// Escala tipo iOS
    }
  },
  android: {
    path: 'android'
  }
};

export default config;