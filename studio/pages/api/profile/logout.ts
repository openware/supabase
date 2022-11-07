import { NextApiRequest, NextApiResponse } from 'next'
import apiWrapper from 'lib/api/apiWrapper'
import axios from 'axios'

export default (req: NextApiRequest, res: NextApiResponse) => apiWrapper(req, res, handler)

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req

    switch (method) {
        case 'POST':
            return handlePost(req, res)
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).json({ data: null, error: { message: `Method ${method} Not Allowed` } })
    }
}

// return promise
const logout = (accessToken: string) => {
    let url = `${process.env.GOTRUE_URL}/logout`

    return axios.post(
        url,
        {},
        {
            headers: {
                apikey: process.env.SUPABASE_ANON_KEY,
                Authorization: `Bearer ${accessToken}`,
            },
        }).then((res: any) => res)
        .catch((err) => {
                const resp = err.request?.response

                return {
                    code: resp?.code,
                    msg: resp?.msg,
                    error: err,
                }
        })
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies['sb-access-token']

    try {
        if (!token) {
            throw new Error('sb-access-token is missing')
        }
        const response = await logout(token)

        console.log('response.headers', response.headers['set-cookie'])
        res.setHeader('set-cookie', response.headers['set-cookie']);
        return res.status(200).json('Success')
    } catch (error) {
        console.error('Error: ', error)
        return res.status(401).json({ error })
    }
}
