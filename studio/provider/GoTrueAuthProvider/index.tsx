import { ReactElement, useEffect, useState } from 'react';
import useDApp from '../../hooks/web3/useDApp';
// import { useHandleDisconnect } from '../../hooks/web3/useHandleDisconnect';
import { useGoTrueSignin, useRefreshToken, fetchUser } from '../../hooks/gotrueOpendax';
import { isBrowser } from '../../helpers/isBrowser';
import { useStore } from 'hooks'

interface Props {
    children: ReactElement;
}

export const GoTrueAuthProvider: React.FC<Props> = ({ children, ...props }: Props) => {
    const rootStore = useStore()
    const { ui } = rootStore

    const { context: { account, library, deactivate } } = useDApp();

    const currentSession = isBrowser() && localStorage.getItem('session');
    const session = currentSession && JSON.parse(currentSession);

    const loginStorage = isBrowser() && localStorage.getItem('login_time');

    const [loginTime, setLoginTime] = useState<string | undefined>(loginStorage ? loginStorage : undefined);
    const [expiresIn, setExpiresIn] = useState<string | undefined>(session && session.expires_in);

    const accessToken = session && session.access_token;
    const [isMetamaskConnected, setIsMetamaskConnected] = useState<boolean>(isBrowser() && !!localStorage.getItem('APP_CONNECT_CACHED_PROVIDER'));

    const setSessionData = (sessionData: any) => {
        if (sessionData) {
            const updatedSession = {
                access_token: sessionData.access_token,
                refresh_token: sessionData.refresh_token,
                expires_in: sessionData.expires_in
            };

            setExpiresIn(sessionData.expires_in);

            const loginDateTimestamp = String(new Date().getTime());
            localStorage.setItem('login_time', loginDateTimestamp);
            setLoginTime(loginDateTimestamp);

            localStorage.setItem('session', JSON.stringify(updatedSession));
        };
    };

    useEffect(()=>{
        if(isBrowser()){
            window.addEventListener('metamaskInjectionUpdated', (() => {
                setIsMetamaskConnected(!!localStorage.getItem('APP_CONNECT_CACHED_PROVIDER'))
             }));
        }
    }, [typeof window])

    useEffect(() => {
        if (!isMetamaskConnected) {
            localStorage.removeItem('session');
        }

        const setUserToRedux = async (accessToken: string) => {
            const user = await fetchUser(accessToken)
            console.log('user', user)
            // ui.setProfile(user)
        }

        accessToken && isMetamaskConnected && setUserToRedux(accessToken);
    }, [accessToken, isMetamaskConnected, account]);

    useEffect(() => {
        if (loginTime && expiresIn) {
            const timeBeforeRefresh = +loginTime + +expiresIn * 1000 - new Date().getTime();
            if (timeBeforeRefresh >= 0) {
                const interval = setInterval(() => {
                    const currentSession = isBrowser() && localStorage.getItem('session');
                    const session = currentSession && JSON.parse(currentSession);
                    const refreshToken = session && session.refresh_token;

                    if (refreshToken && refreshToken !== 'undefined') {
                        useRefreshToken(refreshToken, setSessionData);
                    }
                }, timeBeforeRefresh);

                return () => clearInterval(interval);
            }
        }
    }, [loginTime, expiresIn]);

    useEffect(() => {
        if (account && !isMetamaskConnected) {
            localStorage.removeItem('session');
            localStorage.removeItem('login_time');
            setLoginTime(undefined);
        }

        if (!account && !isMetamaskConnected) {
            localStorage.removeItem('session');
            localStorage.removeItem('login_time');
            setLoginTime(undefined);
        }
    }, [isMetamaskConnected, account])

    useEffect(() => {
        console.log('test login')
        if (account && !accessToken && isMetamaskConnected) {
            console.log('test')
            useGoTrueSignin(account, library, setSessionData, deactivate);
        }
    }, [account, isMetamaskConnected, accessToken]);

    // TODO: useHandleDisconnect
    // useHandleDisconnect(!userLoading && Boolean(user.id))

    return children;
};
