/**
 * Two worlds while the redesign is built.
 * - "/v2" and below: the redesign (React + Tailwind + design tokens, no BEM). Loads only its own CSS.
 * - everything else: the original site, untouched, with its own CSS.
 * Each world is a separate chunk, so their stylesheets and token names can never meet in one document.
 * Links between the worlds are plain <a> elements (a full page load). When the redesign covers every route, the
 * original world and this switch are deleted.
 */
const inRedesign = location.pathname === '/v2' || location.pathname.startsWith('/v2/')

if (inRedesign) {
  void import('./v2/main')
} else {
  void import('./legacy')
}
