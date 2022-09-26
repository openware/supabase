import { useState, useEffect } from 'react'
import { NextPageWithLayout } from 'types'
import { observer } from 'mobx-react-lite'

import { useStore, withAuth } from 'hooks'
import { finexPostgRESTClient } from 'lib/api/postgrestClient'
import { ProjectLayoutWithAuth } from 'components/layouts'

const Assets: NextPageWithLayout = () => {
  const { meta, ui } = useStore()
  const [assets, setAssets] = useState([])

  useEffect(() => {
    const fetchAssets = async () => {
      // TODO: should be assets
      const data = await finexPostgRESTClient.from('currencies').select()
      console.log('currencies', data)
    }
    fetchAssets()
  }, [])

  return (
    <>
      <h1>Assets</h1>
      <div className="mt-10">{assets}</div>
    </>
  )
}

Assets.getLayout = (page) => <ProjectLayoutWithAuth>{page}</ProjectLayoutWithAuth>

export default observer(Assets)
