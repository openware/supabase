import { PostgrestClient } from '@supabase/postgrest-js'

const REST_URL = 'http://localhost:3000'
const postgrestClient = new PostgrestClient(REST_URL, {
  headers: {
    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTc1NTU3MTQsInN1YiI6IjA1OWZiN2UyLTM4OWEtNGI1Yy04MGIxLTYzODUyZDkyOGNkNiIsImVtYWlsIjoiIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJBc3ltbWV0cmljS2V5IiwicHJvdmlkZXJzIjpbIkFzeW1tZXRyaWNLZXkiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoic3VwZXJhZG1pbiIsImFzeW1tZXRyaWNfa2V5IjoiMHhkODVGODgzYTZCMmUxNUJEM2UxZDZDOTM5ODY2Q0E5NWY4MDJCMzk2IiwiYXN5bW1ldHJpY19rZXlfYWxnb3JpdGhtIjoiRVRIIn0.YWsmVYFtBgtDrgqCgcWDJTDyQHhyWvNT23COqSPavmUrK-cI8a2vWK5q_7olK53a3jtck8KcdGG0SkcqapnqnHvCAUYQ4PSLulR5P3sHmh5AgqZKVsppDMKyW5GF3xyLwtos1Kj_JcXKwBIyrwCFTadCMskUHXhpGfTC47rliL_5JQ8d7gPMQcDrjKfzNmyKmLlCrn6J7gesrnDFaVvzXmxgBUiJFk5GGHsq7jLoTf47wCgZbqpGOKUf9-Wc_sumFEb26bAX8KZOK3szGJXlXTJwPVwc40rrLxY4Hof2CgxFRIPJCvaFXSJCS4CimzK8chbpWyNj5paU-uVi4mzcCg"
  },
  schema: 'finex'
});

// let readOnly: any

// if (IS_PLATFORM) {
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
// }

export { postgrestClient }
