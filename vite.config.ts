import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { ROUTES } from './src/data/routes.ts'
import { buildLocalBusinessSchema } from './src/lib/schema.ts'

/**
 * Generates SEO files at build time:
 *  - robots.txt (always)
 *  - sitemap.xml (only when VITE_SITE_URL is set, because sitemap URLs must be absolute)
 *  - LocalBusiness JSON-LD injected statically into index.html
 */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'samarpan-seo-files',
    transformIndexHtml() {
      return [
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(buildLocalBusinessSchema(siteUrl)),
          injectTo: 'head',
        },
      ]
    },
    generateBundle() {
      if (this.environment && this.environment.name !== 'client') return
      const robots = ['User-agent: *', 'Allow: /', siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml` : '']
        .join('\n')
        .trim()
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots}\n` })

      if (!siteUrl) {
        this.warn('VITE_SITE_URL is not set: sitemap.xml and canonical URLs were skipped.')
        return
      }
      const today = new Date().toISOString().slice(0, 10)
      const urls = ROUTES.map(
        (r) =>
          `  <url>\n    <loc>${siteUrl}${r.path === '/' ? '/' : r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`,
      ).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const siteUrl = (env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '')
  return {
    plugins: [react(), tailwindcss(), seoFiles(siteUrl)],
  }
})
