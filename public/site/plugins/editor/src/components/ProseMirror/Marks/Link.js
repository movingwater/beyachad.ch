export default {
  toolbar: {
    icon: "url",
    label: "Link",
    action: "link"
  },
  attrs: {
    href: {},
    title: {
      default: null
    }
  },
  inclusive: false,
  parseDOM: [{
    tag: "a[href]", getAttrs(dom) {
      return {
        href: dom.getAttribute("href"),
        title: dom.getAttribute("title")
      }
    }
  }],
  toDOM(node) {
    let a = document.createElement("a");

    if (node.attrs.title) {
      a.setAttribute("title", node.attrs.title);
    }

    a.setAttribute("href", node.attrs.href);

    a.addEventListener("click", function (e) {
      if (e.altKey === true) {
        window.open(node.attrs.href);
      }
    });

    return a;
  }
};
