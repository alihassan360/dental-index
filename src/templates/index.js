import React, { Component } from "react";
import Link from "gatsby-link";
 
const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>;
  } else {
    return <span>{props.text}</span>;
  }
};
 
const IndexPage = ({ data, pathContext }) => {
console.log(data, pathContext)
  const { group, index, first, last, pageCount } = pathContext;
  const previousUrl = index - 1 == 1 ? "" : (index - 1).toString();
  const nextUrl = (index + 1).toString();
 
  return (
    <div>
      <h4>{pageCount} Posts</h4>
 
      {group.map(({ node }) => (
        <div key={node.id} className="blogListing">
          <div className="date">{node.date}</div>
          <Link className="blogUrl" to={node.slug}>
            {node.title}
          </Link>
          <div>{node.excerpt}</div>
        </div>
      ))}
      <div className="previousLink">
        <NavLink test={first} url={previousUrl} text="Go to Previous Page" />
      </div>
      <div className="nextLink">
        <NavLink test={last} url={nextUrl} text="Go to Next Page" />
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
