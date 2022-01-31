import React, { useEffect, useState } from "react";

export default function Name() {
    const [name, setName] = useState("fetching...");

    useEffect(() => {
        window.api.whoAmI()
        .then(result => setName(result))
        .catch(() => setName("could not fetch name"))
    }, []);

    return (<div>
        I am: {name}
    </div>);
}