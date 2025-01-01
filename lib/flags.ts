import { flag } from '@vercel/flags/next'
import { vercelAdapter } from '@vercel/flags-adapter-native'

export const canSave = flag<boolean>({
  key: 'can-save',
  adapter: vercelAdapter(),
})
