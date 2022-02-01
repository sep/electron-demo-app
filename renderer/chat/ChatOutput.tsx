import React, { useEffect, useState } from "react"
import "../common/windowExtensions"

export default function ChatOutput() {
    const [state, setState] = useState("")
    
    useEffect(() => {
        window.api.receiveMessage((user: string, data: string) => {
            setState(state => `${state}${user}:${data}\n`)
        })
    }, [])

    return <textarea style={{width: "100%"}} value={state} readOnly></textarea>
}

