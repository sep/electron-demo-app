import React, { KeyboardEvent, useState } from "react"
import "../common/windowExtensions"

export default function ChatInput() {
    const [state, setState] = useState("")

    const [name, setName] = useState("unknown")

    window.api.whoAmI().then(result => setName(result))

    const dispatchMessage = (input: string): void => {
        window.api.sendGlobalMessage(name, input)
    }

    const onChange = (event) => {
        setState(event.target.value)
    }

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            dispatchMessage(state)
            setState("")
        }
    };

    return <input type="text" onKeyDown={onKeyDown} value={state} onChange={onChange}></input>
}