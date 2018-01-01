import React, { Component } from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"
import ClockIcon from "react-icons/lib/fa/clock-o"
import TagIcon from "react-icons/lib/fa/tag"
import OpenIcon from "react-icons/lib/fa/folder-open"
import Img from "gatsby-image";
import Helmet from "react-helmet";

import config from "../data/SiteConfig";
import PostIcons from "../components/PostIcons"

import { rhythm } from "../utils/typography"

class Home extends Component {
  render() {
    const data = this.props.data

    return (
      <div
        css={{
          display: `flex`,
          flexWrap: `wrap`,
        }}
      >
        <Helmet>
          <title>{config.siteTitle}</title>
          <link rel="canonical" href={`${config.siteUrl}`} />
        </Helmet>

        {data.allWordpressPost.edges.map(({ node }) => (
          <div 
            css={{
              margin: rhythm(1),
              maxWidth: 333,
              width: 333
            }} 
            key={node.slug}
          >
            <Link to={node.slug} css={{ textDecoration: `none` }}>
              <Img sizes={node.featured_media.localFile.childImageSharp.sizes} />
              <h3>{node.title}</h3>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            <PostIcons css={{ display: `flex`, flexWrap: `wrap` }} node={node} />
          </div>
        ))}
      </div>
    )
  }
}

export default Home

// Set here the ID of the home page.
export const pageQuery = graphql`
  query homePageQuery {
    allWordpressPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          title
          date(formatString: "MMM DD, YYYY")
          excerpt
          featured_media {
            localFile {
              childImageSharp {
                sizes(
                  maxWidth: 350
                  quality: 90
                ) {
                  ...GatsbyImageSharpSizes_withWebp_noBase64
                }
              }
            }
          }
          slug
          ...PostIcons
        }
      }
    }
  }
`
