import React, { Component } from 'react';
import Helmet from "react-helmet";

import PostsList from "../components/PostsList"
import { css } from "glamor";
import BackIcon from "react-icons/lib/md/keyboard-arrow-left"
import NextIcon from "react-icons/lib/md/keyboard-arrow-right"
import Link from "gatsby-link";

const NavLink = props => {
  if (!props.page) {
    return <Link to={props.url}>{props.text} {props.children}</Link>;
  } else {
    return <span>{props.text}</span>;
  }
};

const pageNavWrapper = css({
  margin: `1em auto 3em`,
  flexDirection: `columm`,
  justifyContent: `center`,
  display: `flex`,

  "@media screen and (min-width:790px)": {
    flexDirection: `row`,
    textAlign: `center`
  },
  "& .previousLink a, & .nextLink a": {
    margin: `.5em`,
    backgroundColor: `rgb(133, 133, 133)`,
    padding: `.25em .5em`,
    borderRadius: `50px`,
    color: `rgb(255,255,255)`,
    textDecoration: `none`,
    textTransform: `uppercase`,
    display: `flex`,
    alignItems: `center`,
    border: `1px solid rgb(133, 133, 133)`,
    fontSize: `14px`,
    width: `10em`,
    //justifyContent: `center`,
    position: `relative`,
    transition: `all .3s linear`,

    "&:hover": {
      transition: `all .3s linear`,
      backgroundColor: `rgb(255,255,255)`,
      color: `rgb(133, 133, 133)`,

      "& svg": {
        backgroundColor: `rgb(133, 133, 133)`,
        color: `rgb(255,255,255)`,
      }
    }
  },
  "& .nextLink a": {
    paddingLeft: `1em`,

    "& svg": {
      display: `flex`,
      justifyContent: `center`,
      position: `absolute`,
      alignItems: `center`,
      right: `0.5em`,
      top: `20%`,
      transition: `all .3s linear`,
    }
  },
  "& .previousLink a": {
    flexDirection: `row-reverse`,
    paddingRight: `1em`,

    "& svg": {
      display: `flex`,
      justifyContent: `center`,
      position: `absolute`,
      alignItems: `center`,
      left: `0.5em`,
      top: `20%`
    }
  },
  "& svg": {
    backgroundColor: `rgb(255,255,255)`,
    color: `rgb(133, 133, 133)`,
    borderRadius: 50,
  }
})


class Category extends Component {
  render() {
        const pathContext = this.props.pathContext;
        const categoryPath = pathContext.pathPrefix + "/";
        const postEdges = this.props.data.allWordpressPost.edges;
        
        const { group, index, first, last, pageCount } = pathContext;


        const groupPosts = group.map(({node})=> {
          return postEdges.find(edge=>edge.node.id=== node.id)
        })

        const previousUrl = categoryPath + (index - 1 == 1 ? "" : (index - 1).toString());
        const nextUrl = categoryPath + (index + 1).toString();


        return (
          <div>
            {/* <h1 dangerouslySetInnerHTML={{ __html: categoryTitle }} /> */}
            <PostsList posts={groupPosts} />

            <div {...pageNavWrapper}>
              {index > 1 &&<div className="previousLink">
                
                <NavLink page={first} url={previousUrl} text="Previous">
                  <BackIcon size="18px"/>
                </NavLink>
              </div>}
              {last < 1 && <div className="nextLink">
                <NavLink page={last} url={nextUrl} text="Next">
                  <NextIcon size="18px" />
                </NavLink>
              </div>}
            </div>
          </div>
        );
    }
}

export default Category;

export const pageQuery = graphql`
  query CategoryPage {
    allWordpressPost(
      limit: 1000
      sort: { fields: [date], order: DESC }
      filter: {}
    ) {
      totalCount
      edges {
        node {
            id
            title
            date(formatString: "MMM DD, YYYY")
            excerpt
            categories {
                name
                id
            }
            slug
            ...PostIcons
            ...PostFooter
            featured_media {
              localFile {
                childImageSharp {
                  sizes(maxWidth: 350, quality: 90) {
                    ...GatsbyImageSharpSizes_withWebp_noBase64
                  }
                }
              }
            }
        }
      }
    }
  }
`;