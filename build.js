const fs = require('fs');
const minify = require('html-minifier').minify;
const parse5 = require('parse5');
const Bundler = require('polymer-bundler').Bundler;

const bundler = new Bundler({stripComments: true});

(async function() {
  const manifest = await bundler.generateManifest(['index_dev.html']);
  const bundle = await bundler.bundle(manifest);

  let out = parse5.serialize(bundle.documents.get('index_dev.html').ast);

  out = minify(out, {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    sortAttributes: true,
    sortClassName: true
  });

  fs.writeFileSync('index.html', out);
})();
