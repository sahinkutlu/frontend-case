import React from 'react'

export default function Linkedin() {
    return (
        <div
            onClick={() => window.open('https://www.linkedin.com/in/codercor/')}
            className="font-bold flex items-center gap-2 cursor-pointer">
            <img width={20}
                 alt="Linkedin icon"
                 src="/assets/linkedin.svg"/>
            <p>Mustafa
                Çor</p>
        </div>
    )
}
