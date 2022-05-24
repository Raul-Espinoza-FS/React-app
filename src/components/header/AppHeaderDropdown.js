import React, { useState } from 'react'
import {
    CAvatar,
    CDropdown,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'

import defaultAvatar from './../../assets/images/avatars/user_default.png'
import Settings from 'src/api/Settings'

const AppHeaderDropdown = (props) => {
    // eslint-disable-next-line
    let [user, setUser] = useState();
    let settings = new Settings();
    user = settings.getUser();

    return (
        <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                <span className="mr-1">{user}</span>
                <CAvatar src={defaultAvatar} size="md" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                {props.children}
            </CDropdownMenu>
        </CDropdown>
    )
}

export default AppHeaderDropdown
