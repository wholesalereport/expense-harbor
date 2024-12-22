import React from 'react';

function SubmitButton({ type, isLoading = false, text = 'Submit' }) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-md text-white font-medium min-w-[120px] 
        ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'} 
        flex items-center justify-center`}
            disabled={isLoading}
        >
            {isLoading ? (
                <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                </svg>
            ) : (
                text
            )}
        </button>
    );
}

export default SubmitButton;