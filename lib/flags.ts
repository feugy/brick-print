import { unstable_flag as flag } from '@vercel/flags/next'

export const canSave = flag({
  key: 'can-save',
  decide: () => false,
})
