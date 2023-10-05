import React, { useEffect, useRef } from 'react'; 
import { Messages } from 'primereact/messages';

export default function Message() {
    const msgs = useRef(null);

    useEffect(() => {
        msgs.current.show(
            { sticky: true, severity: 'info', summary: 'Info', detail: 'Message Content', closable: true }
        );
    }, []); 

    return (
        <div className="card flex justify-content-center">
            <Messages ref={msgs} />
        </div>
    )
}