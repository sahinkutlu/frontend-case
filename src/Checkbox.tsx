import React from 'react'

type ExamCheckboxProps = JSX.IntrinsicElements['input'] & {
    containerClass?: string
    label: string
}

export default function ExamCheckbox({ id, label, containerClass = "", ...props }: ExamCheckboxProps) {
    return (
        <label id={id} className={`exam-checkbox ${containerClass}`}>
            <input {...props} className='exam-checkbox-input' type='checkbox' />
            <div dangerouslySetInnerHTML={{ __html: label }}></div>
        </label>
    )
}