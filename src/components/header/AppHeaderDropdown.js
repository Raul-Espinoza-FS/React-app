import React, { useState } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilLockLocked,
  cilSettings,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import defaultAvatar from './../../assets/images/avatars/user_default.png'
import Settings from 'src/api/Settings'
import Auth from 'src/api/Auth'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  // eslint-disable-next-line
  let [user, setUser] = useState();
  let navigate = useNavigate();
  let settings = new Settings();
  let auth = new Auth();

  user = settings.getUser(); 

  async function logout() {
    try{
      // eslint-disable-next-line
      let result = await auth.logout();
    }
    finally {
      navigate('/login');
    }
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <span className="mr-1">{user}</span>
        <CAvatar src={defaultAvatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={() => logout()}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
