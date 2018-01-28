import React from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"
import { css } from 'glamor'

import Header from "../components/Header"
import Footer from "../components/Footer"
import { rhythm, scale } from "../utils/typography"
import config from "../data/SiteConfig"

const containerStyle = {
  margin: `0 auto`,
}

css.global('body.menu-opened',  
{ 
  overflow: `hidden`, 
  height: 0,
})
css.global('a:hover',
{
  color: `rgb(35,148,184)`
})

class DefaultLayout extends React.Component {
  render() {
    const data = this.props.data
    return (
      <div>
        <Header data={data}/>
        <div css={containerStyle}>{this.props.children()}</div>
        <Footer />
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
    allWordpressCategory(sort: {fields: [count], order: DESC}) {
      edges {
        node {
          name
          slug
        }
      }
    }
  }
`