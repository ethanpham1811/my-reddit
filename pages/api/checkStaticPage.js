import fs from 'fs'
import path from 'path'

/**
 * Check if a route has been generated as static page
 * This is part of solution for "fallback=true" behave like "fallback=blocking" issue of page router
 */
const checkStaticPage = async (req, res) => {
  const { query } = req
  const route = query.route

  const staticPagesDir = path.join(process.cwd(), '.next/server/pages')

  // Construct the path to the specific static HTML file for the given route
  const routeParts = route.split('/').filter(Boolean) // Split and remove empty parts
  const staticPagePath = path.join(staticPagesDir, ...routeParts) + '.html'

  // Check if the static HTML file exists
  try {
    await fs.promises.access(staticPagePath, fs.constants.F_OK)
    // The file exists, so the static page is considered to exist
    res.status(200).json({ exists: true })
  } catch (error) {
    // The file doesn't exist, indicating the static page is not generated
    res.status(200).json({ exists: false })
  }
}
export default checkStaticPage
