import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderDivider,
    CHeaderNav,
    CHeaderToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'

const AppHeader = (props) => {
    const dispatch = useDispatch()
    const sidebarShow = useSelector((state) => state.sidebarShow)

    return (
        <CHeader position={props.position} className={props.classNames}>
            <CContainer fluid className="justify-content-right">
                {props.toggler ? (<CHeaderToggler
                    className="ps-1"
                    onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
                >
                    <CIcon icon={cilMenu} size="lg" />
                </CHeaderToggler>)
                    : (<div></div>)
                }
                {props.brand ? (<CHeaderBrand className="mx-auto d-md-none" to="/">
                    <CIcon icon={logo} height={45} alt="Logo" />
                </CHeaderBrand>) : ''
                }
                <CHeaderNav className="ms-3">
                    <AppHeaderDropdown>{props.children}</AppHeaderDropdown>
                </CHeaderNav>
            </CContainer>
            {props.divider ? (
                <CHeaderDivider />
            ) : ''}
            {props.breadcrumb ? (
                <CContainer fluid>
                    <AppBreadcrumb />
                </CContainer>
            ) : ''}

        </CHeader>
    )
}

export default AppHeader
