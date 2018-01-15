import React, { Component, Children } from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import { css } from "glamor";
import BackIcon from "react-icons/lib/md/keyboard-arrow-left"
import NextIcon from "react-icons/lib/md/keyboard-arrow-right"

import config from "../data/SiteConfig";
import PostsList from "../components/PostsList"

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
