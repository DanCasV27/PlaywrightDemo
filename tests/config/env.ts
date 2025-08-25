export const BASE_URL = process.env.BASE_URL|| '';

// Credenciales para login E2E (usadas en UserBuilder)

export const E2E_USER_EMAIL = process.env.E2E_USER_EMAIL||'';
export const E2E_USER_PASSWORD = process.env.E2E_USER_PASSWORD||'';

// Configuración de tiempo de espera global para acciones (útil para apps lentas o flujos complejos)
export const DEFAULT_TIMEOUT = process.env.DEFAULT_TIMEOUT
  ? Number(process.env.DEFAULT_TIMEOUT)
  : 15000; // 15 segundos

// Control de ejecución en CI
export const IS_CI = process.env.CI === 'true';

// Configuración de reporter de Playwright (si decides usarlo en el código)
export const REPORTER = process.env.REPORTER || 'html';

// Ejemplo: API keys para integraciones externas (útil si tu automatización requiere acceso a APIs)
export const EXTERNAL_API_KEY = process.env.EXTERNAL_API_KEY || '';

// Ejemplo: Ruta del directorio de descargas (si tus tests descargan archivos)
export const DOWNLOADS_DIR = process.env.DOWNLOADS_DIR || './downloads';

// Ejemplo: Toggle de features/flags (si necesitas activar/desactivar funciones en los tests)
export const FEATURE_X_ENABLED = process.env.FEATURE_X_ENABLED === 'true';