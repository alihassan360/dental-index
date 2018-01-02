import React, { Component } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet";
import { css } from "glamor";

import config from "../data/SiteConfig";
import { rhythm } from "../utils/typography"

let boxedContent = css({
  maxWidth: 800,
  margin: `1em auto`,
  position: `relative`,
  padding: `0 15px`
})

class PageTemplate extends Component {
  render() {
    const siteMetadata = this.props.data.site.siteMetadata
    const currentPage = this.props.data.wordpressPage
    const page = this.props.data.wordpressPage
    const { slug } = this.props.pathContext;
    if (!page.id) {
      page.id = slug;
    }

    return (
      <div>
        <Helmet>
          <title>{`${page.title} - ${config.siteTitle}`}</title>
          <link rel="canonical" href={`${config.siteUrl}${page.id}`} />
        </Helmet>
        <h1 {...boxedContent} css={{ textAlign: `center` }} dangerouslySetInnerHTML={{ __html: currentPage.title }} />
        <div {...boxedContent} dangerouslySetInnerHTML={{ __html: currentPage.content }} />
      </div>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query currentPageQuery($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      date(formatString: "MMM DD, YYYY")
    }
    site {
      id
      siteMetadata {
        title
        subtitle
      }
    }
  }
`
