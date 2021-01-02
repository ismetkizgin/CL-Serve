const Handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");

class HandlebarsUtils {
  constructor() {}

  static _readAsync(fileName) {
    return new Promise(function (resolve, reject) {
      fs.readFile(fileName, "utf8", function (err, content) {
        if (err) reject(err);
        else resolve(content);
      });
    });
  }

  static async createTemplateAsync(filePath, data) {
    const templateFile = path.join(__dirname, "..", filePath);
    const templateSource = await this._readAsync(templateFile);
    const template = Handlebars.compile(templateSource);
    return template(data);
  }
}

module.exports = HandlebarsUtils;
