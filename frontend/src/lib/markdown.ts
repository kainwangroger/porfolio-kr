import { marked } from "marked"
import sanitizeHtml from "sanitize-html"

/**
 * Rend du Markdown en HTML sûr.
 *
 * Le contenu des projets provient des README importés depuis GitHub
 * (`backend/enrich_projects.py`), et le Markdown autorise le HTML brut. Or
 * `marked` ne filtre plus rien depuis sa v5 : la sortie partait telle quelle
 * dans `dangerouslySetInnerHTML`, y compris d'éventuelles balises `script`.
 * Tout passe désormais par une liste blanche.
 *
 * À utiliser partout où du Markdown finit dans `dangerouslySetInnerHTML` —
 * c'est le seul endroit du code qui doit connaître `marked`.
 */

const ALLOWED_TAGS = [
  "h2", "h3", "h4", "h5", "h6",
  "p", "br", "hr",
  "ul", "ol", "li",
  "strong", "em", "del", "code", "pre", "blockquote",
  "a", "img",
  "table", "thead", "tbody", "tr", "th", "td",
]

export async function renderMarkdown(source: string): Promise<string> {
  const html = await marked.parse(source)

  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      // `rel` et `target` figurent ici parce que la liste blanche s'applique
      // APRÈS `transformTags` : sans eux, les attributs ajoutés plus bas
      // seraient posés puis aussitôt retirés.
      a: ["href", "title", "rel", "target"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      // Les blocs de code balisés par langue conservent leur classe, dont
      // dépend une éventuelle coloration syntaxique.
      code: ["class"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    // Ni `javascript:` ni `data:` : la première exécute, la seconde permet
    // d'embarquer un document entier dans une image.
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesAppliedToAttributes: ["href", "src"],
    // Un lien issu d'un README mène hors du site : nouvelle fenêtre, et
    // `noopener` pour que la page ouverte ne puisse pas manipuler la nôtre.
    transformTags: {
      // La page porte déjà son `h1` : un README qui commence par un titre de
      // niveau 1 en créerait un second, ce qui brouille la structure pour les
      // moteurs de recherche comme pour les lecteurs d'écran.
      h1: "h2",
      a: sanitizeHtml.simpleTransform("a", {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
      }),
      img: sanitizeHtml.simpleTransform("img", { loading: "lazy" }),
    },
    // Le contenu de ces balises est supprimé, pas seulement leurs chevrons :
    // sans cela, un `<script>alert(1)</script>` laisserait « alert(1) » en
    // texte visible dans la page.
    nonTextTags: ["style", "script", "textarea", "option", "noscript", "iframe"],
  })
}
