import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export const readJson = paths => require(paths)
