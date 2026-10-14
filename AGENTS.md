<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Store portfolio identity, projects, learning areas and roadmap in a shared browser-safe data module so content stays consistent across pages and terminal commands.
- Use a shared portfolio header and footer in the root, with dedicated shareable content routes and a curated complete overview at the index.
- Contact actions use actual mailto and LinkedIn links, with clipboard copy; do not imply message delivery through an unconnected form.
- The portfolio assistant streams from the /api/ask server route; its prompt is built only from src/data/portfolio.ts via src/lib/assistant-prompt.ts so answers stay truthful and in sync with the site.
