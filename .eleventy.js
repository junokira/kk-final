const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Passthroughs
  eleventyConfig.addPassthroughCopy({ "static": "static" });
  eleventyConfig.addPassthroughCopy("admin");

  // Date filter usable as: {{ date | formatDate("PPP") }}
  eleventyConfig.addFilter("formatDate", (value, format = "PPP") => {
    const jsDate = value instanceof Date ? value : new Date(value);
    return DateTime.fromJSDate(jsDate).toFormat(format);
  });

  // Blog collection
  eleventyConfig.addCollection("posts", (collection) =>
    collection.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
