# nerdishbynature.com

The site for my iOS apps, built with Jekyll.

## Running it

```sh
bundle install
bundle exec jekyll serve --livereload
```

Then open <http://localhost:4000>.

## Layout

```
_data/apps.yml        the app list on the front page
_data/navigation.yml  the header nav
_layouts/app.html     app detail pages
airportquiz/          app page + privacy policy
youupload/            app page + privacy policy
_posts/               the 2015 writing, kept for its permalinks
```

App pages carry an `accent` colour in their front matter, which overrides the
`--accent` custom property for that page only.

## Email addresses

No address appears in the built HTML. `_includes/contact.html` emits a button
holding each half of the address ROT13'd and reversed; `assets/js/contact.js`
joins them on click. Pass `reveal=true` to print the address in place instead
of opening a mail client — the imprint uses that so the address stays readable.

## Deploying

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site
and publishes it to GitHub Pages. Pull requests build and run the link check
without deploying. There are no secrets and no credentials to rotate.

The custom domain comes from the committed `CNAME` file. DNS for the apex must
point at GitHub Pages:

```
A     nerdishbynature.com  185.199.108.153
A     nerdishbynature.com  185.199.109.153
A     nerdishbynature.com  185.199.110.153
A     nerdishbynature.com  185.199.111.153
CNAME www                  nerdishbynature.github.io.
```

HTTPS is automatic once *Enforce HTTPS* is enabled under Settings > Pages.

## Link checking

`script/check_links.rb` runs against `_site/` in CI and fails the build on
internal links that resolve to nothing, or on protocol-relative subresources.
Run it locally with:

```sh
bundle exec jekyll build && ruby script/check_links.rb
```
