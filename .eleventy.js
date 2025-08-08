module.exports = function (eleventyConfig) {
  // Copy static files to output (_site/)
  eleventyConfig.addPassthroughCopy({ "static": "static" });

  // Make the /admin CMS interface available
  eleventyConfig.addPassthroughCopy("admin");

  // Blog collection: sort posts by newest first
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",            // where your source files live
      includes: "_includes",   // where templates live
      output: "_site"          // where the final site is generated
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
