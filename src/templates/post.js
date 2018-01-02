import React, { Component } from "react"
import PropTypes from "prop-types"
import PostIcons from "../components/PostIcons"
import Img from "gatsby-image"
import Helmet from "react-helmet";
import { css } from "glamor";

import config from "../data/SiteConfig";
import { rhythm } from "../utils/typography"

let boxedContent = css({
  maxWidth: 650,
  margin: `2em auto`,
  position: `relative`,
  padding: `0 1em`,
  '& img': {
    width: `100%`,
    objectFit: `cover`
  },
})

class PostTemplate extends Component {
  render() {
    const post = this.props.data.wordpressPost
    const { slug } = this.props.pathContext;
    if (!post.id) {
      post.id = slug;
    }

    return (
      <div css={{ position: `relative` }}>
        <Helmet>
          <title>{`${post.title} - ${config.siteTitle}`}</title>
          <link rel="canonical" href={`${config.siteUrl}${post.id}`} />
        </Helmet>
        
        <Img css={{ height: `60vh` }} sizes={post.featured_media.localFile.childImageSharp.sizes}/>
        <div css={{ background: `linear-gradient(rgba(255,255,255,0) 50%,rgba(255,255,255,1) 95%)`, width: `100%`, height: `60vh`, position: `absolute`, top: 0, left: 0 }}></div>
      
        <div {...boxedContent} css={{ display: `flex`, flexDirection: `column`, justifyContent: `center`, alignItems: `center`, marginTop: `-4em !important` }}>
          <h1 css={{color: `rgb(133,133,133)`, textTransform: `uppercase`}} dangerouslySetInnerHTML={{ __html: post.title }} />
          <PostIcons node={post} css={{ marginBottom: rhythm(1 / 2), textAlign: `center` }} />
        </div>
        <div {...boxedContent} dangerouslySetInnerHTML={{ __html: post.content }} />
        {post.acf &&
          post.acf.page_builder_post &&
          post.acf.page_builder_post.map((layout, i) => {
            if (layout.__typename === `WordPressAcf_image_gallery`) {
              return (
                <div key={`${i} image-gallery`}>
                  <h2>ACF Image Gallery</h2>
                  {layout.pictures.map(({ picture }) => {
                    const img = picture.localFile.childImageSharp.sizes
                    return (
                      <Img
                        css={{ marginBottom: rhythm(1) }}
                        key={img.src}
                        sizes={img}
                      />
                    )
                  })}
                </div>
              )
            }
            if (layout.__typename === `WordPressAcf_post_photo`) {
              const img = layout.photo.localFile.childImageSharp.sizes
              return (
                <div key={`${i}-photo`}>
                  <h2>ACF Post Photo</h2>
                  <Img
                    css={{ marginBottom: rhythm(1) }}
                    src={img.src}
                    sizes={img}
                  />
                </div>
              )
            }
            return null
          })}
      </div>
    )
  }
}
//<img src={post.image.sizes.thumbnail} />

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default PostTemplate

export const pageQuery = graphql`
  query currentPostQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      ...PostIcons
      featured_media {
        localFile {
          childImageSharp {
            sizes(
              maxWidth: 800
              quality: 90
            ) {
              ...GatsbyImageSharpSizes_withWebp_noBase64
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        subtitle
      }
    }
  }
`
