import { isEmpty } from "@ember/utils";
import Component from "@ember/component";
import computed from "ember-addons/ember-computed-decorators";
import DiscourseURL from "discourse/lib/url";

export default Component.extend({
  tagName: "section",
  classNameBindings: [
    ":category-boxes",
    "anyLogos:with-logos:no-logos",
    "hasSubcategories:with-subcategories"
  ],

  @computed("categories.[].uploaded_logo.url")
  anyLogos() {
    return this.categories.any(c => !isEmpty(c.get("uploaded_logo.url")));
  },

  @computed("categories.[].subcategories")
  hasSubcategories() {
    return this.categories.any(c => !isEmpty(c.get("subcategories")));
  },

  click(e) {
    if (!$(e.target).is("a")) {
      const url = $(e.target)
        .closest(".category-box")
        .data("url");
      if (url) {
        DiscourseURL.routeTo(url);
      }
    }
  }
});
