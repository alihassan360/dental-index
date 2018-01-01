import React, { Component } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet";

import config from "../data/SiteConfig";

import { rhythm } from "../utils/typography"

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
        <h1 dangerouslySetInnerHTML={{ __html: currentPage.title }} />
        <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
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
