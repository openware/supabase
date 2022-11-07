import { NextApiRequest, NextApiResponse } from 'next'
import apiWrapper from 'lib/api/apiWrapper'
import axios from 'axios'

export default (req: NextApiRequest, res: NextApiResponse) => apiWrapper(req, res, handler)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      return handleGetAll(req, res)
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).json({ data: null, error: { message: `Method ${method} Not Allowed` } })
  }
}

// return promise
const fetchUser = (accessToken: string) => {
  let url = `${process.env.GOTRUE_URL}/user`
  console.log('>> Request URL:', url);

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: process.env.SUPABASE_ANON_KEY,
      },
    })
    .then((res: any) => {
      console.log('>> Request response: ', res.data)
      return res.data
    })
    .catch((err) => {
      console.log('>> Request response: ', err)

      const resp = err.request?.response

      return {
        code: resp?.code,
        msg: resp?.msg,
        error: err,
      }
    })
}

const handleGetAll = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies['sb-access-token']

  try {
    if (!token) {
      throw new Error('sb-access-token is missing')
    }
    const userResponse = await fetchUser(token)
    return res.status(200).json(userResponse)
  } catch (error) {
    console.error('Error: ', error)
    return res.status(401).json({ error })
  }
}
