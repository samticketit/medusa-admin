import { useMedusa } from "medusa-react"

/**
 * Legacy admin code and some bundles expect `client.admin.auth.session()` like the old
 * `services/api.js` client. `@medusajs/medusa-js` only exposes `getSession()`.
 * Patch runs during render, before sibling providers call `useAdminGetSession`.
 */
function MedusaAdminAuthShim() {
  const { client } = useMedusa()
  const auth = client.admin?.auth as
    | {
        getSession?: (...args: unknown[]) => unknown
        session?: (...args: unknown[]) => unknown
      }
    | undefined

  if (
    auth &&
    typeof auth.getSession === "function" &&
    typeof auth.session !== "function"
  ) {
    auth.session = auth.getSession.bind(auth)
  }

  return null
}

export default MedusaAdminAuthShim
