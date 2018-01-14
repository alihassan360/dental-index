import React, { Component } from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";

import config from "../data/SiteConfig";
import PostsList from "../components/PostsList"

const NavLink = props => {
  if (!props.page) {
    return <Link to={props.url}>{props.text}</Link>;
  } else {
    return <span>{props.text}</span>;
  }
};
 
const IndexPage = ({ data, pathContext }) => {


  const { group, index, first, last, pageCount } = pathContext;
  const { allWordpressPost:{edges} } = data;
  
  let group2 = group.map(({node})=> {
    return edges.find(edge=>edge.node.id=== node.id)
  })
  const previousUrl = index - 1 == 1 ? "" : (index - 1).toString();
  const nextUrl = (index + 1).toString();
 
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
 
      <PostsList posts={group2}/>
      <div className="previousLink">
        {index > 1 && <NavLink page={first} url={previousUrl} text="Go to Previous Page" />}
      </div>
      <div className="nextLink">
        {last < 1 && <NavLink page={last} url={nextUrl} text="Go to Next Page" />}
      </div>
    </div>
  );
};
export default IndexPage;

// Set here the ID of the home page.
export const pageQuery = graphql`
  query homePageQuery {
    allWordpressPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          id
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
