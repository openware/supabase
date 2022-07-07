import { createClient } from '@supabase/supabase-js'
import { IS_PLATFORM } from '../constants'

let readOnly: any

if (IS_PLATFORM) {
  // readOnly = createClient('localhost:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs')
  // const readOnlyErrMessage = Error('This client is for read-only actions. Use readWrite instead.')

  // // overwrites function calls
  // // for readOnly
  // readOnly.from('').insert = () => {
  //   throw readOnlyErrMessage
  // }
  // readOnly.from('').delete = () => {
  //   throw readOnlyErrMessage
  // }
  // readOnly.from('').update = () => {
  //   throw readOnlyErrMessage
  // }
  // readOnly.rpc = () => {
  //   throw readOnlyErrMessage
  // }
}

export { readOnly }
