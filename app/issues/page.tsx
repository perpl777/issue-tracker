import React from 'react';
import Link from 'next/link';

const IssuesPage = () => {
    return (
        <div>
            <Link href="/issues/new" className="btn btn-primary">New Issue</Link>
        </div>
    )
}

export default IssuesPage