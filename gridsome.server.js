const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const yaml = require('js-yaml')
const Prism = require('prismjs')

// highlight page-query and static-query in html
Prism.languages.html.graphql = {
    pattern: /(<(page|static)-query[\s\S]*?>)[\s\S]*?(?=<\/(page|static)-query>)/i,
    inside: Prism.languages.graphql,
    lookbehind: true,
    greedy: true
}

module.exports = function (api) {
    api.loadSource(async ({addMetadata, addCollection}) => {
        let gridsomeVersion = ''

        try {
            const {stdout} = await execa('npm', ['show', 'gridsome', 'version'])
            gridsomeVersion = stdout
        } catch (err) {
            console.warn('Failed to get gridsome version from npm.')
        }

        addMetadata('gridsomeVersion', gridsomeVersion)

        // contributors
        // const authorsPath = path.join(__dirname, 'contributors/contributors.yaml')
        // const authorsRaw = await fs.readFile(authorsPath, 'utf8')
        // const authorsJson = yaml.safeLoad(authorsRaw)
        // const authors = addCollection('Contributor')
        //
        // authorsJson.forEach(({id, name: title, ...fields}) => {
        //     authors.addNode({
        //         id,
        //         title,Contributor
        //         internal: {
        //             origin: authorsPath
        //         },
        //         ...fields
        //     })
        // })

        // Starters
        // const startersPath = path.join(__dirname, 'starters/starters.yaml')
        // const startersRaw = await fs.readFile(startersPath, 'utf8')
        // const startersJson = yaml.safeLoad(startersRaw)
        // const starters = addCollection('Starter')
        //
        // // Connect author field to Contributors & Platforms
        // starters.addReference('author', 'Contributor')
        // starters.addReference('platforms', 'Platform')
        //
        // startersJson.forEach((starter, index) => {
        //     starters.addNode({
        //         ...starter,
        //         index,
        //         internal: {
        //             origin: startersPath
        //         }
        //     })
        // })

        // Platforms
        // const platformsPath = path.join(__dirname, 'platforms/platforms.yaml')
        // const platformsRaw = await fs.readFile(platformsPath, 'utf8')
        // const platformsJson = yaml.safeLoad(platformsRaw)
        // const platforms = addCollection('Platform')
        //
        // // Connect author field to Contributors
        // platformsJson.forEach((platform, index) => {
        //     platforms.addNode({
        //         ...platform,
        //         index,
        //         internal: {
        //             origin: platformsPath
        //         }
        //     })
        // })

    })

    // api.createPages(({createPage}) => {
    //     createPage({
    //         path: '/plugins/:id*',
    //         component: './src/templates/Plugin.vue'
    //     })
    // })

    api.createPages(async ({graphql, createPage}) => {
        const {data} = await graphql(`
      {
        strapi {
          platforms {
            id
            slug
            name 
          }
          articles {
            slug
          }          
          
          categories {
            slug,
            id
          }
          
          authors {
            linked_user {
              username
            }
            id
          } 
          
          tags {
            id
            slug
          }
          
        }
      }
    `);

        // Create blog articles pages.
        const articles = data.strapi.articles;
        if (articles) {
            articles.forEach((article) => {
                createPage({
                    path: `/blog/${article.slug}`,
                    component: "./src/templates/Article.vue",
                    context: {
                        slug: article.slug,
                    },
                });
            });
        }

        const profiles = data.strapi.authors;
        if (profiles) {
            profiles.forEach((profile) => {
                let path = `/${profile.id}`;

                if (profile.linked_user) {
                    path = `/${profile.linked_user.username}`;
                }

                createPage({
                    path: path,
                    component: "./src/templates/Author.vue",
                    context: {
                        id: profile.id,
                    },
                });
            });
        }

        const categories = data.strapi.categories;
        if (categories) {
            categories.forEach((category) => {
                createPage({
                    path: `/blog/category/${category.slug}`,
                    component: "./src/templates/Category.vue",
                    context: {
                        id: category.id,
                    },
                });
            });
        }

        const tags = data.strapi.tags;
        if (tags) {
            tags.forEach((tag) => {
                createPage({
                    path: `/blog/tag/${tag.slug}`,
                    component: "./src/templates/Tag.vue",
                    context: {
                        id: tag.id,
                    },
                });
            });
        }

        const platforms = data.strapi.platforms;
        if (platforms) {
            platforms.forEach((platform) => {
                createPage({
                    path: `/projects/${platform.slug}`,
                    component: "./src/templates/Platform.vue",
                    context: {
                        id: platform.id,
                        name: platform.name,
                        slug: platform.slug,
                    },
                });
            });
        }
    });
}
