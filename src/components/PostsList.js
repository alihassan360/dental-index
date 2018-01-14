import React, { Component } from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"
import ClockIcon from "react-icons/lib/md/access-time"
import TagIcon from "react-icons/lib/md/label"
import OpenIcon from "react-icons/lib/md/folder"
import Img from "gatsby-image";
import { css } from "glamor";

import PostIcons from "../components/PostIcons"
import { rhythm } from "../utils/typography"
import Post  from "./Post"

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>;
  } else {
    return <span>{props.text}</span>;
  }
};

let card = css({
  margin: `0 auto`,

  "& .link-more": {
    display: `none`
  },
  "@media screen and (min-width: 750px)": {
    maxWidth: 800,
  },
  "@media screen and (min-width: 1281px)": {
    maxWidth: 1280,
  },
  '& .date-field': {
    display: `none !important`
  },
  '& .category-field': {
    marginBottom: rhythm(0.5)
  }
})

class PostsList extends Component {
  
  render() {
    const posts = this.props.posts;
    return (
      <div 
        css={{
          display: `flex`,
          flexWrap: `wrap`,
          padding: rhythm(3 / 4)
        }}
        {...card}
      >
        {posts.map(post => <Post key={post.node.title} node={post.node}/>)}
      </div>
    )
  }
}

export default PostsList
