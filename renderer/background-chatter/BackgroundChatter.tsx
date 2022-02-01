import React, { useEffect } from "react"
import "../common/windowExtensions"

export default function BackgroundChatter() {
    useEffect(() => {
        let name = "";
        console.log(1)
        window.api.receiveMessage(function(user: string) {
            console.log(2, name, user)
            if (name !== "" && user != name) {
                console.log(3)
                window.api.sendGlobalMessage(name, `Cool story, ${user}.`)
            }
        });

        window.api.whoAmI()
        .then(result => {console.log(result); name = result;})
    }, []);

    return <div></div>
}