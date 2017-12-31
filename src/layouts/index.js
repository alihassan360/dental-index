import React from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"

import { rhythm, scale } from "../utils/typography"
import config from "../data/SiteConfig"

const containerStyle = {
  maxWidth: 700,
  margin: `0 auto`,
  padding: rhythm(3 / 4),
}

class DefaultLayout extends React.Component {
  render() {
    return (
      <div>
        <div
          css={{
            background: `rgb(255,255,255)`,
            marginBottom: rhythm(1),
            padding: `${rhythm(1)} 0px`,
            border: `1px solid rgb(240,240,240)`,
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
        <div css={containerStyle}>{this.props.children()}</div>
      </div>
    )
  }
}

DefaultLayout.propTypes = {
  location: PropTypes.object.isRequired,
}

export default DefaultLayout
