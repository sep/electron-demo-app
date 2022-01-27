import React, { useState } from 'react';

declare global {
    interface Window {
        ipc: {
            invoke(channel: string): Promise<unknown>
        }
    }
}

export default function FileViewer(){
    const [result, setResult] = useState("");
    const openFile = async () =>
    {
        const data = await window.ipc.invoke("openFile") as string|null;
        if (data === null){
            console.log("Browsing canceled by user.")
            return;
        }
        setResult(data);
    };
    
    const style = {
        width: "100%",
        height: "100%"
    }

    return (
        <div>
            <div>
                <button onClick={openFile} id="open-file">Open file...</button>  
            </div>
            <div>       
                <textarea readOnly value={result} style={style} id="opened-file" />
            </div>
        </div>
        );
    }