import { NextPage } from 'next'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore, withAuth } from 'hooks'
import BaseLayout from 'components/layouts'
import { postgrestClient } from 'lib/api/supabaseClient'

const Markets: NextPage = () => {
  const { ui } = useStore()

  useEffect(() => {
    const fetchMarkets = async () => {
      const data = await postgrestClient.from('markets').select()
      console.log('data', data);
    }
    fetchMarkets()
  }, [])

  const project = ui.selectedProject

  return (
    <BaseLayout>
        <h1>Markets FINEX</h1>
    </BaseLayout>
  )
}

export default withAuth(observer(Markets))
