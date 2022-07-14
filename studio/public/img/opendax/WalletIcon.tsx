import React from 'react';
import { SVGICON } from '../../../helpers/svgicon';

interface WalletIconProps {
    classNames?: string;
    stroke?: string;
}

export const WalletIcon: React.FC<WalletIconProps> = ({
    classNames = '',
    stroke = 'var(--primary-cta-layer-color-60)',
}: WalletIconProps): JSX.Element => (
    <SVGICON>
        <svg
            className={classNames}
            fill="none"
            viewBox="0 0 512 512"
            stroke={stroke}
            aria-hidden="true"
        >
            <rect
                width="416"
                height="288"
                x="48"
                y="144"
                fill="none"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="48"
                ry="48"
            />
            <path
                fill="none"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M411.36 144v-30A50 50 0 00352 64.9L88.64 109.85A50 50 0 0048 159v49"
            />
            <path
                strokeWidth="32"
                d="M368 320a32 32 0 1132-32 32 32 0 01-32 32z"
            />
        </svg>
    </SVGICON>
)
