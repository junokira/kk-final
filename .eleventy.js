const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "static": "static" });
  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addFilter("formatDate", (value, format = "PPP") => {
    const jsDate = value instanceof Date ? value : new Date(value);
    return DateTime.fromJSDate(jsDate).toFormat(format);
  });

  // ADD THIS
  eleventyConfig.addFilter("dateISO", (value) => {
    const jsDate = value instanceof Date ? value : new Date(value);
    return jsDate.toISOString();
  });

  eleventyConfig.addCollection("posts", (collection) =>
    collection.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
