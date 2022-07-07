function isBrowser(): boolean {
    return typeof window !== 'undefined';
}

export type AppConfig = {
    appName: string;
    appLogos?: string;
    appVersion: string;
    blockchain: {
        supportedChainIds: string[];
    };
    languages: string[];
    platformChainId: string;
    infuraId: string;
}

export function isDevMode(): boolean {
    const isLocalHost = isBrowser() && location.hostname.startsWith("local");
    const isNextDevMod = Boolean(process.env.NEXT_PUBLIC_APP_DEV_MODE);

    return isLocalHost || isNextDevMod;
}

function getWsProtocol(): string {
    if (isBrowser()) {
        return location.protocol === 'http:' ? 'ws://' : 'wss://'
    }
    return ''
}

export function getFinexHostUrl(): string {
    if (isDevMode()) {
        return 'ws://localhost:9003/ws'
    }

    if (isBrowser()) {
        const protocol = getWsProtocol()
        return `${protocol}${location.hostname}/api/v1/finex/ws`
    }

    return ''
}

export function getGoTrueUrl(): string {
    if (isDevMode()) {
        return 'http://localhost:8000/api/v1/auth'
    }

    if (isBrowser()) {
        return `${location.protocol}//${location.hostname}/api/v1/auth`
    }

    return ''
}

export function getGRPCHostUrl(): string {
    if (isDevMode()) {
        return 'http://localhost:8000/api/v1-grpc/finex'
    }

    if (isBrowser()) {
        return `${location.protocol}//${location.hostname}/api/v1-grpc/finex`
    }

    return ''
}
