import React from 'react'

type Props = {
}

const LoaderSpinner = ({ }: Props) => {
    return (
        <div className="h-full w-full absolute -top-16 bottom-0 left-0 right-0 z-30 flex items-center justify-center">
            <div className="flex items-center justify-center space-x-2 animate-ping">
                <div className="w-6 h-6 bg-primary-50 rounded-full"></div>
            </div>
        </div>
    )
}

export default LoaderSpinner