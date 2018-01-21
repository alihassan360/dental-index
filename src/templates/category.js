import React, { Component } from 'react';
import Helmet from "react-helmet";

import PostsList from "../components/PostsList"

class Category extends Component {
    
  getPostsOfCategory(posts, categoryId) {
    return posts.filter(post => post.node.categories.filter(category => category.id === categoryId).length > 0);
  }
  
  render() {
        const category = this.props.pathContext.categoryId;
        const postEdges = this.props.data.allWordpressPost.edges;
        const postsOfCategory = this.getPostsOfCategory(postEdges, category);

        return (
            <PostsList posts={postsOfCategory} />
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
                name,
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