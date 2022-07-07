import axios from 'axios';

export const useGoTrueSignin = (account: string, library: any, setSessionData: any, deactivate: any) => {
    const sendChallengeToken = (token: string) => {
        axios.post(`${process.env.NEXT_PUBLIC_GOTRUE_URL}/asymmetric_login`, {
            key: account,
            challenge_token_signature: token,
        }, {
            headers: {
                apikey: process.env.NEXT_PUBLIC_GOTRUE_ANON_KEY,
                'x-use-cookie': 'expire',
            }
        }).then((response: any) => {
            // TODO: remove
            console.log('sb-access-token=${response.data.access_token}', response.data.access_token)
            document.cookie = `sb-access-token=${response.data.access_token}; max-age=${response.data.expires_in}; path=/;secure;`
            setSessionData(response.data);
        }).catch(err => {
            if (err.code === 401) {
                document.cookie = 'sb-access-token=; Max-Age=0'
            }
            console.log('Asymmetric login error:', err)
        });
    };

    const signMessage = async (provider: any, challengeToken: string) => {
        try {
            // TODO: handle Wallet connect
            const signer = provider.getSigner();
            const signature = await signer.signMessage(challengeToken);

            sendChallengeToken(signature);
        } catch (err) {
            deactivate();
            localStorage.removeItem('APP_CONNECT_CACHED_PROVIDER');
            window.dispatchEvent(new Event('metamaskInjectionUpdated'))
        }
    };

    const signChallenge = () => {
        axios.post(`${process.env.NEXT_PUBLIC_GOTRUE_URL}/sign_challenge`, {
            key: account,
            algorithm: 'ETH'
        },
            {
                headers: {
                    apikey: process.env.NEXT_PUBLIC_GOTRUE_ANON_KEY,
                }
            }).then(async (res: any) => {
                const challengeToken = res.data?.challenge_token;

                signMessage(library!, challengeToken);
            }).catch(err => console.log('Sign challenge error:', err));
    }

    signChallenge();
}
