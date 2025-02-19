import { FC, ReactNode } from 'react'
import Head from 'next/head'
import Divider from 'components/ui/Divider'

interface Props {
  children: ReactNode
}

const VercelIntegrationLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Supabase + Vercel</title>
      </Head>

      <main className="flex flex-col w-full h-full overflow-y-auto">
        <div>
          <div className="mx-auto px-4 sm:px-6">
            <div className="max-w-xl flex justify-between items-center mx-auto py-4">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <div>
                  <span className="sr-only">Supabase</span>
                  <img className="h-6 w-auto sm:h-6" src="/admin/img/supabase-logo.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider light />
        <div className="flex-grow">
          <div className="max-w-7xl h-full mx-auto px-4 sm:px-6">
            <div className="max-w-xl h-full mx-auto py-10">{children}</div>
          </div>
        </div>
      </main>
    </>
  )
}
export default VercelIntegrationLayout
