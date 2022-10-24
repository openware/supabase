import { PostgrestClient } from '@supabase/postgrest-js'

const REST_URL = 'http://localhost:3000'

const finexPostgRESTClient = new PostgrestClient(REST_URL, {
  // TODO: JWT
  headers: {
    Authorization:
      'Bearer null',
  },
  schema: 'finex',
})

export { finexPostgRESTClient }
