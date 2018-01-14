import React, { Component } from "react";
import Helmet from "react-helmet";

import config from "../data/SiteConfig";
import PostsList from "../components/PostsList";


class Home extends Component {
  removeEntities(str) {
    return str.replace(/&[^;]+;/g, " ");
  }
  render() {
    const data = this.props.data;

    return (
      <div>
        <Helmet>
          <title>{config.siteTitle}</title>
          <link rel="canonical" href={`${config.siteUrl}`} />
          <meta property="og:title" content={`${config.siteTitle}`} />
          <meta name="description" content={`${config.siteDescription}`} />
          <meta property="og:title" content={`${config.siteTitle}`} />
          <meta property="og:url" content={`${config.siteUrl}`} />
          <meta property="og:image" content={`${config.siteOgImage}`} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${config.siteTitle}`} />
          <meta
            name="twitter:description"
            content={`${config.siteDescription}`}
          />
          <meta name="twitter:image" content={`${config.siteOgImage}`} />
        </Helmet>
        <PostsList posts={data.allWordpressPost.edges} />
      </div>
    );
  }
}

export default Home;

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
                sizes(maxWidth: 350, quality: 90) {
                  ...GatsbyImageSharpSizes_withWebp_noBase64
                }
              }
            }
          }
          slug
          ...PostIcons
          ...PostFooter
        }
      }
    }
  }
`;
