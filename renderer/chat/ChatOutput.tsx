import React, { useState } from "react"

export default function ChatOutput() {
    const [state, setState] = useState("")

    function receiveMessage(user: string, data: string) {
        setState(`${state}${user}:${data}\n`)
    }
    window.api.receiveMessage(receiveMessage)

    return <textarea style={{width: "100%"}} value={state} readOnly></textarea>
}

