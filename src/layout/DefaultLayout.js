import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';
import Auth from 'src/api/Auth';
import {
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
} from '@coreui/react';
import {
    cilLockLocked,
    cilSettings,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'

const DefaultLayout = () => {

    let navigate = useNavigate();
    let auth = new Auth();

    async function logout() {
        try {
            // eslint-disable-next-line
            let result = await auth.logout();
        }
        finally {
            navigate('/login');
        }
    }

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader classNames="mb-4" position="sticky" toggler={true} breadcrumb={true} divider={true} brand={true}>
                    <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
                    <CDropdownItem className="role-button">
                        <CIcon icon={cilSettings} className="me-2" />
                        Settings
                    </CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem className="role-button" onClick={() => logout()}>
                        <CIcon icon={cilLockLocked} className="me-2" />
                        Log out
                    </CDropdownItem>
                </AppHeader>
                <div className="body flex-grow-1 px-3">
                    <AppContent />
                </div>
                <AppFooter />
            </div>
        </div>
    )
}

export default DefaultLayout
