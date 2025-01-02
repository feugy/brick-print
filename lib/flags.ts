import { vercelAdapter } from '@vercel/flags-adapter-native'
import { flag } from '@vercel/flags/next'

export const canSave = flag<boolean>({
  key: 'can-save',
  adapter: vercelAdapter(),
})
