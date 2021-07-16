import React from 'react'
import {Alert} from "antd"
const ErrorNotice = ({err}) => {
    return (
        <div>
            <Alert message={err}  type="error" showIcon />
        </div>
    )
}

export default ErrorNotice
