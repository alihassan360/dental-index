import React from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"

import Header from "../components/Header"
import { rhythm, scale } from "../utils/typography"
import config from "../data/SiteConfig"

const containerStyle = {
  margin: `0 auto`,
}

class DefaultLayout extends React.Component {
  render() {
    const data = this.props.data
    return (
      <div>
        <Header data={data}/>
        <div css={containerStyle}>{this.props.children()}</div>
      </div>
    )
  }
}

DefaultLayout.propTypes = {
  location: PropTypes.object.isRequired,
}

export default DefaultLayout


export const pageQuery = graphql`
  query headerLinksQuery {
    allWordpressPage(sort: { fields: [date], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          date(formatString: "MMM DD, YYYY")
        }
      }
    }
  }
`