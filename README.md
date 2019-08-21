
<h1 align="center">
  KotSF Blogging Engine
</h1>

This is a pretty straightforward blog based on the Gatsby blog tutorial. The
main difference is this blog has three sections.

1. /gdarchive/

  These are posts transfered over from an old blog. They use a different url scheme.

2. /publish/

  These are the main posts of this blog.

3. /draft/

    These are posts that are in-progress. The /draft/* url is meant to be hidden
    behind basic AUTH from the webserver. This way posts can be shared with
    friends to review for comment if desired, without them being available to
    the general public.


## 🚀 Quick start

1.  **Clone this repository.**

    If you'd like to use this for your own blog, start by cloning this repository.

    ```sh
    # create a new blog using kotsf-blog
    git clone git@github.com:ggetzie/kotsf-blog.git
    ```

1.  **Update data location.**

    I keep the data in a separate repository. Open gatsby-config.js and update the path for the gatsby-source-filesystem

    ```
    resolve: `gatsby-source-filesystem`,
      options: {
        name: `root`,
        path: `/path/to/your/data/`
      },
    ```

    When writing posts make sure to have a field called `section` in the frontmatter that has a value of either `"gdarchive"`, `"publish"`, or `"draft"` and make sure the path is set appropriately so gatsby puts the post in the right place when building the site. My posts directory looks like this:

    ```
    ├── draft
      ├── a-draft-slug
        ├── index.md
    ├── gdarchive
      ├── a-gdarchive-slug
        ├── index.md
        ├── an-image.jpg
    ├── publish
      ├── a-published-slug
        ├── index.md
        ├── another-image.jpg
    ├── about.md
    ├── portfolio.md
    ├── contact.md
    ```

    Markdown files for each section are stored with the pattern of having a directory with the slug name and an index.md with the post content underneath it. The about.md, portfolio.md, and contact.md contain the content to use for those portions of the site.


1.  **Start the development server!**

    Once you have everything how you like it just run:

    ```sh
      gatsby develop
    ```

    and the site should come up at `http://localhost:8000`
