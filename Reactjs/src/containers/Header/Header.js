import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGE, USER_ROLE } from '../../utils/constant';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash'


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    componentDidMount() {
        let { userInfo } = this.props
        let menu = []
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleID

            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu
            }
        }
        this.setState({
            menuApp: menu
        })
    }
    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className='languages'>
                    <span className='welcome'>
                        <FormattedMessage id='headerhomepage.welcome' />
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''}
                    </span>
                    <span className={language === LANGUAGE.VI ? 'language-vi active' : 'language-vi'}
                        onClick={() => { this.handleChangeLanguage(LANGUAGE.VI) }}>
                        VN
                    </span>
                    <span className={language === LANGUAGE.EN ? 'language-en active' : 'language-en'}
                        onClick={() => { this.handleChangeLanguage(LANGUAGE.EN) }}>
                        EN
                    </span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (languageData) => dispatch(actions.changeLanguageApp(languageData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
