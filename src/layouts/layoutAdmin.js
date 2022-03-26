import React from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'

function LayoutAdmin(props) {
    return (
        <div>
            <Outlet />
        </div>
    )
}

LayoutAdmin.propTypes = {

}

export default LayoutAdmin

