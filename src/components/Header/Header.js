import React from 'react';
import { withRouter } from "react-router-dom";
function Header(props) {

    return(
        <nav className="navbar navbar-dark bg-primary" style={{width: '100%',marginTop: 50}}>
            <div className="row col-12 d-flex justify-content-center text-white">

                Register Form
            </div>
        </nav>
    )
}
export default withRouter(Header);