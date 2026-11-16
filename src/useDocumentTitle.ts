import { useEffect } from 'react'

/** Sets the browser tab title for a page: "Page, NearPaws". Without a page name it is the site's own title. */
export function useDocumentTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} · NearPaws` : 'NearPaws · Prototype'
  }, [page])
}
