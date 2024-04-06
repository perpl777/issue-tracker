import React, { PropsWithChildren } from 'react'


const ErrorMessage = ({children}: PropsWithChildren) => {

    if (!children) return null;

    return (
        <div className="badge badge-error gap-2">
            {children}
        </div>
    );
}

export default ErrorMessage