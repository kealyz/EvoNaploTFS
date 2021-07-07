import React, { useEffect, useState } from 'react';

export default function Home() {

    const [session, setSession] = useState();
    useEffect(() => {
        (
            async () => {
                const response = await fetch('api/Session', { method: 'GET' });
                const content = await response.json();

                await setSession(content);
            }
        )();
    }, []);

    if (session !== undefined) {
        if (session.title !== "Unauthorized") {
            return (
                <div>
                    <h1>Hali!</h1>
                    <p>Egy kisse atdolgoztam a feluletet... Remelem tetszik.</p>
                </div>
            );
        }
    }
    return (
        <p>Lepjel befele</p>
    );
};