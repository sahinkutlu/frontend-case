import React from 'react'

export default function AlertError({error}: { error: string }) {
    return (
        <div className="w-full min-h-[2rem] p-2 font-bold text-[0.8rem] flex items-center justify-center border border-red-200 bg-red-300 rounded-md text-gray-800">
            {error}
        </div>
    )
}
