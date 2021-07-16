const fs = require("fs");

const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

module.exports = {
  title: "RSLint",
  description: "Documentation for RSLint",
  theme: "yuu",
  themeConfig: {
    editLinks: true,
		lastUpdated: true,
    activeHeaderLinks: true,
    docsDir: "docs",
    nav: [
      {
        text: "User Guide",
        link: "/guide/",
      },
      {
        text: "Rules",
        link: "/rules/"
      },
      {
        text: "Developer Guide",
        link: "/dev/"
      },
      {
        text: "Crate Docs",
        link: "https://docs.rs/rslint_core"
      },
      {
        text: "GitHub",
        link: "https://github.com/rslint/rslint"
      }
    ],
    sidebar: {
      "/guide/": [
        {
          title: "User Guide",
          collapsable: false,
          children: [
            "/guide/",
            "/guide/config",
            "/guide/directives",
            "/guide/formatters",
            "/guide/autofix",
          ]
        }
      ],
      "/dev/": [
        {
          title: "Developer Guide",
          collapsable: false,
          children: [
            "/dev/",
            "/dev/architecture",
            "/dev/lexing",
            "/dev/untyped-trees",
            "/dev/parsing",
            "/dev/runner",
            "/dev/rules",
            "/dev/docgen",
          ]
        }
      ],
      "/rules/": getRuleSidebar(),
    },
  },
  plugins: [
    [
      "vuepress-plugin-container",
      {
        type: "eslint"
      }
    ]
  ]
};

function getRuleSidebar() {
  let res = [
    {
      title: "Overview",
      collapsable: false,
      children: [
        ["/rules/", "Rules"]
      ]
    }
  ];
  fs.readdirSync("./docs/rules").forEach(file => {
    if (fs.statSync(`./docs/rules/${file}`).isDirectory()) {
      let children = getRulesList(file);
      children.unshift([`/rules/${file}/`, "Overview"])
      res.push({
        title: capitalize(file),
        collapsable: false,
        children
      })
    }
  });
  return res;
}

function getRulesList(group) {
  return fs.readdirSync(`./docs/rules/${group}`).filter(file => file != "README.md").map(file => {
    let name = file.substring(0, file.length - 3);
    return [`/rules/${group}/${name}`, name];
  });
}
