import React, { Component } from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"

import { rhythm, scale } from "../utils/typography"
import config from "../data/SiteConfig"

const containerStyle = {
  maxWidth: 700,
  margin: `0 auto`,
  padding: rhythm(3 / 4),
}

class Header extends Component {
    render() {
        const data = this.props.data
        return (
            <header
                css={{
                    marginBottom: rhythm(1),
                    borderBottom: `1px solid rgb(240,240,240)`,
                    textAlign: `center`,
                }}
            >
                <div
                    css={{
                        background: `rgb(255,255,255)`,
                        padding: `${rhythm(1)} 0px`,
                        borderBottom: `1px solid rgb(240,240,240)`,
                        "@media screen and (min-width: 500px)": {
                        padding: `${rhythm(1)} 0px`,
                        },
                    }}
                    >
                    <div css={containerStyle}>
                        <h1
                        css={{
                            margin: 0,
                            fontSize: scale(1.5).fontSize,
                            textAlign: `center`,
                            lineHeight: 1,
                            "@media screen and (min-width: 500px)": {
                            fontSize: scale(1.9).fontSize,
                            lineHeight: 1,
                            },
                        }}
                        >
                        <span
                            css={{
                            display: `none`,
                            }}
                        >Casemasters Blog</span>
                        <Link
                            css={{
                            color: `rgb(224,203,144)`,
                            ":hover": {
                                color: `rgb(224,203,144)`,
                                textDecoration: `none`,
                            },
                            }}
                            to="/"
                        >
                            <img
                            css={{
                                width: `70px`,
                                margin: `0 auto`,
                            }}
                            src={config.siteLogo} alt="Casemasters" 
                            />
                        </Link>
                        </h1>
                    </div>
                </div>
                <div css={{ padding: `${rhythm(0.5)} 0px`, display: `flex`, justifyContent: `center` }}>
                    <div css={{ marginRight: rhythm(1), ':last-child': {marginRight: 0} }}>
                        <Link to="/" css={{ textDecoration: `none`, color: `rgb(133,133,133)` }}>Home</Link>
                    </div>
                    {data.allWordpressPage.edges.map(({ node }) => (
                        <div css={{ marginRight: rhythm(1), ':last-child': {marginRight: 0} }} key={node.slug}>
                            <Link to={node.slug} css={{ textDecoration: `none`, color: `rgb(133,133,133)` }}>
                                {node.title}
                            </Link>
                        </div>
                    ))}
                </div>
            </header>
        );
    }
}

export default Header;
