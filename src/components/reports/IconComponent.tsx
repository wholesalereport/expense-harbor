import React from 'react';

export  const IconComponent = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="none"
            className="w-12 h-12"
        >
            {/* Background */}
            <rect width="50" height="50" rx="12" fill="#E0E7FF" />

            {/* Mirrored E */}
            <text
                x="35%" /* Adjusted for 5px movement to the right */
                y="40%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#4F46E5"
                fontSize="24"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
                //transform="scale(-1, 1) translate(-50, 0)" /* Flip horizontally */
            >
                E
            </text>

            {/* H */}
            <text
                x="70%"
                y="65%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#6D28D9"
                fontSize="24"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
            >
                H
            </text>
        </svg>
    );
};
