import React, { Component } from 'react';
import config from "../data/SiteConfig"

class Footer extends Component {
    render() {
        return (
            <footer css={{textAlign: `center`, borderTop: `1px solid rgb(240,240,240)`, padding: `1em`, color: `rgb(150,150,150)`, fontSize: 12, }}>
                <div>{config.copyright}</div>
            </footer>
        );
    }
}

export default Footer;