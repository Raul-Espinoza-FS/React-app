import React, { Component } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilLowVision } from '@coreui/icons'
import Auth from 'src/api/Auth';
import { useNavigate } from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputPasswordType: true,
            username: '',
            password: '',
            showLoginError: false,
            loginInProgress: false,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.togglePassword = this.togglePassword.bind(this);
        this.loginUser = this.loginUser.bind(this);

        this.authApi = new Auth();
    }

    togglePassword() {
        let inputPasswordType = this.state.inputPasswordType;
        this.setState({
            inputPasswordType: !inputPasswordType,
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async loginUser() {
        try {
            this.setState({
                loginInProgress: true,
            })

            let result = await this.authApi.login(this.state.username, this.state.password);
            if (result.success) {
                this.props.navigate('/dashboard');
            }
            else {
                this.setState({
                    showLoginError: true,
                    loginInProgress: false,
                })
            }
        }
        catch (e) {
            this.setState({
                showLoginError: true,
                loginInProgress: false,
            })
        }
    }

    render() {
        return (
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={6}>
                            <CCardGroup>
                                <CCard className="p-5">
                                    <CCardBody>
                                        <CForm>
                                            <h1>Login</h1>
                                            <p className="text-medium-emphasis">Sign In to your account</p>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
                                                <CFormInput name="username" value={this.state.username} onChange={this.handleInputChange} placeholder="Username" autoComplete="username" />
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>
                                                <CFormInput name="password" value={this.state.password} onChange={this.handleInputChange} type={this.state.inputPasswordType ? 'password' : 'text'} placeholder="Password" autoComplete="current-password" />
                                                <CButton onMouseDown={this.togglePassword} onMouseUp={this.togglePassword}
                                                    onTouchStart={this.togglePassword} onTouchEnd={this.togglePassword}
                                                    type="button" color="secondary" variant="outline" id="button-addon">
                                                    <CIcon icon={cilLowVision} />
                                                </CButton>
                                            </CInputGroup>
                                            <CRow>
                                                {this.state.showLoginError ? (<p className='text-danger'>Username or password incorrect</p>) : ''}
                                            </CRow>
                                            <CRow>
                                                <CCol xs={6}>
                                                    <CButton onClick={this.loginUser} disabled={this.state.loginInProgress} color="primary" className="px-4">
                                                        Login
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        )
    }
}

function LoginWithNavigate(props) {
    let navigate = useNavigate();
    return (<Login {...props} navigate={navigate} />);
}


export default LoginWithNavigate
