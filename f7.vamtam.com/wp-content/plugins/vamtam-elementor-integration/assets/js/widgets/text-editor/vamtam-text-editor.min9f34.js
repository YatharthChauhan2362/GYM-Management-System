class VamtamTextEditor extends elementorModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: { paragraph: "p:first", textEditor: ".elementor-text-editor" },
      classes: {
        dropCap: "elementor-drop-cap",
        dropCapLetter: "elementor-drop-cap-letter",
      },
    };
  }
  getDefaultElements() {
    const selectors = this.getSettings("selectors"),
      classes = this.getSettings("classes"),
      $dropCap = jQuery("<span>", { class: classes.dropCap }),
      $dropCapLetter = jQuery("<span>", { class: classes.dropCapLetter });
    return (
      $dropCap.append($dropCapLetter),
      {
        $paragraph: this.$element.find(selectors.paragraph),
        $textEditor: this.$element.find(selectors.textEditor),
        $dropCap: $dropCap,
        $dropCapLetter: $dropCapLetter,
      }
    );
  }
  wrapDropCap() {
    const isDropCapEnabled = this.getElementSettings("drop_cap"),
      $paragraph = this.elements.$paragraph,
      textNode = this.elements.$textEditor.text();
    if (isDropCapEnabled) {
      if (
        ($paragraph.length || (textNode && (this.isTextNode = !0)),
        $paragraph.length || this.isTextNode)
      )
        if (this.isTextNode) {
          const firstLetter = textNode[0];
          if (!firstLetter) return;
          (this.dropCapLetter = firstLetter),
            this.elements.$dropCapLetter.text(firstLetter);
          const restoredTextNode = textNode
            .slice(firstLetter.length)
            .replace(/^ */, (match) =>
              new Array(match.length + 1).join("&nbsp;")
            );
          this.elements.$textEditor
            .html(restoredTextNode)
            .prepend(this.elements.$dropCap);
        } else {
          const paragraphContent = $paragraph.html().replace(/&nbsp;/g, " "),
            firstLetterMatch = paragraphContent.match(/^ *([^ ] ?)/);
          if (!firstLetterMatch) return;
          const firstLetter = firstLetterMatch[1],
            trimmedFirstLetter = firstLetter.trim();
          if ("<" === trimmedFirstLetter) return;
          (this.dropCapLetter = firstLetter),
            this.elements.$dropCapLetter.text(trimmedFirstLetter);
          const restoredParagraphContent = paragraphContent
            .slice(firstLetter.length)
            .replace(/^ */, (match) =>
              new Array(match.length + 1).join("&nbsp;")
            );
          $paragraph
            .html(restoredParagraphContent)
            .prepend(this.elements.$dropCap);
        }
    } else
      this.dropCapLetter &&
        (this.isTextNode
          ? (this.elements.$dropCap.remove(),
            this.elements.$textEditor.text(textNode),
            (this.isTextNode = !1))
          : (this.elements.$dropCap.remove(),
            $paragraph.prepend(this.dropCapLetter),
            (this.dropCapLetter = "")));
  }
  onInit(...args) {
    super.onInit(...args), this.wrapDropCap();
  }
  onElementChange(propertyName) {
    "drop_cap" === propertyName && this.wrapDropCap();
  }
}
jQuery(window).on("elementor/frontend/init", () => {
  let addHandler;
  (addHandler =
    elementorFrontend.elementsHandler &&
    elementorFrontend.elementsHandler.attachHandler
      ? elementorFrontend.elementsHandler.attachHandler(
          "text-editor",
          VamtamTextEditor
        )
      : ($element) => {
          elementorFrontend.elementsHandler.addHandler(VamtamTextEditor, {
            $element: $element,
          });
        }),
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/text-editor.default",
      addHandler,
      100
    );
});
