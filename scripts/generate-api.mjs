import { fileURLToPath } from 'node:url';
import { generateApi } from 'swagger-typescript-api';
import { loadEnv } from 'vite';

const root = fileURLToPath(new URL('..', import.meta.url));
const env = loadEnv(process.env.NODE_ENV || 'development', root, '');
const url = env.OPENAPI_URL || 'http://localhost:3000/api/openapi.json';
const response = await fetch(url, { signal: AbortSignal.timeout(15000) });

if (!response.ok) {
  throw new Error(`OpenAPI: HTTP ${response.status}`);
}

await generateApi({
  spec: await response.json(),
  output: fileURLToPath(new URL('../src/api', import.meta.url)),
  fileName: 'api.ts',
  httpClientType: 'fetch',
  generateClient: true,
  enumStyle: 'union',
});
