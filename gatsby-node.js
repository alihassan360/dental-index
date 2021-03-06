const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)
const createPaginatedPages = require("gatsby-paginate");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for Wordpress pages (route : /{slug})
// Will create pages for Wordpress posts (route : /post/{slug})
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage, createNodeField } = boundActionCreators
  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local Wordpress graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.

    // ==== PAGES (WORDPRESS NATIVE) ====
    graphql(
      `
        {
          allWordpressPage {
            edges {
              node {
                id
                slug
                status
                template
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create Page pages.
        const pageTemplate = path.resolve(`./src/templates/page.js`)
        // We want to create a detailed page for each
        // page node. We'll just use the Wordpress Slug for the slug.
        // The Page ID is prefixed with 'PAGE_'
        _.each(result.data.allWordpressPage.edges, edge => {
          // Gatsby uses Redux to manage its internal state.
          // Plugins and sites can use functions like "createPage"
          // to interact with Gatsby.
          createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: `/${edge.node.slug}/`,
            component: slash(pageTemplate),
            context: {
              id: edge.node.id,
            },
          })
        })
      })
      // ==== END PAGES ====

      // ==== POSTS (WORDPRESS NATIVE AND ACF) ====
      .then(() => {
        graphql(
          `
            {
              allWordpressPost {
                edges {
                  node {
                    id
                    slug
                    status
                    template
                    format
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }
          createPaginatedPages({
            edges: result.data.allWordpressPost.edges,
            createPage: createPage,
            pageTemplate: "./src/templates/index.js",
            pageLength: 6, // This is optional and defaults to 10 if not used
            pathPrefix: "", // This is optional and defaults to an empty string if not used
            context: {} // This is optional and defaults to an empty object if not used
          });
          const postTemplate = path.resolve(`./src/templates/post.js`)
          // We want to create a detailed page for each
          // post node. We'll just use the Wordpress Slug for the slug.
          // The Post ID is prefixed with 'POST_'
          _.each(result.data.allWordpressPost.edges, edge => {
            createPage({
              path: edge.node.slug,
              component: slash(postTemplate),
              context: {
                id: edge.node.id,
              },
            })
          })
          resolve()
        })
      })
    // ==== END POSTS ====


      // ==== CARTEGORIES (WORDPRESS NATIVE AND ACF) ====
      .then(() => {
        graphql(
          `
            {
              allWordpressCategory {
                edges {
                  node {
                    id
                    slug
                    name
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }
          const categoryTemplate = path.resolve(`./src/templates/category.js`)
          // We want to create a detailed page for each
          // post node. We'll just use the Wordpress Slug for the slug.
          // The Post ID is prefixed with 'POST_'
          const allPosts = graphql(
            `
              {
                allWordpressPost {
                  edges {
                    node {
                      id
                      slug
                      status
                      template
                      format,
                      categories {
                        name
                        id
                      }
                    }
                  }
                }
              }
            `
          ).then(allPosts => {
            if (result.errors) {
              console.log(result.errors)
              reject(result.errors)
            }
            _.each(result.data.allWordpressCategory.edges, edge => {
              const filteredCategoryPosts = allPosts.data.allWordpressPost.edges.filter(post => { return post.node.categories.filter(category => category.id === edge.node.id).length > 0});

              // A workaround as the pagination libraray doesn't allow passing custom context parameters currently
              const categoryPosts = filteredCategoryPosts.map(post => Object.assign({}, post, {currentCategory: edge.node.name}));

              createPaginatedPages({
                edges: categoryPosts,
                createPage: createPage,
                pageTemplate: "./src/templates/category.js",
                pageLength: 6, // This is optional and defaults to 10 if not used
                pathPrefix: `category/${edge.node.slug}`, // This is optional and defaults to an empty string if not used
                context: {} // This is optional and defaults to an empty object if not used
              });
              
            })
            resolve()
          })
        })
      })
    // ==== END CATEGORIES ====

      // ==== TAGS (WORDPRESS NATIVE AND ACF) ====
      .then(() => {
        graphql(
          `
            {
              allWordpressTag {
                edges {
                  node {
                    id
                    slug
                    name
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }
          const tagTemplate = path.resolve(`./src/templates/tag.js`);
          const allPosts = graphql(
            `
              {
                allWordpressPost {
                  edges {
                    node {
                      id
                      slug
                      status
                      template
                      format,
                      tags {
                        name
                        id
                      }
                    }
                  }
                }
              }
            `
          ).then(allPosts => {
            if (result.errors) {
              console.log(result.errors)
              reject(result.errors)
            }
            _.each(result.data.allWordpressTag.edges, edge => {
              const filteredTagPosts = allPosts.data.allWordpressPost.edges.filter(post => post.node.tags && post.node.tags.filter(tag => tag.id === edge.node.id).length > 0);

              // A workaround as the pagination libraray doesn't allow passing custom context parameters currently
              const tagPosts = filteredTagPosts.map(post => Object.assign({}, post, {currentTag: edge.node.name}));

              createPaginatedPages({
                edges: tagPosts,
                createPage: createPage,
                pageTemplate: tagTemplate,
                pageLength: 6, // This is optional and defaults to 10 if not used
                pathPrefix: `tag/${edge.node.slug}`, // This is optional and defaults to an empty string if not used
                context: {} // This is optional and defaults to an empty object if not used
              });
              
            })
            resolve()
          })
        })
      })
    // ==== END TAGS ====
  })
}
