import type { CollectionConfig } from 'payload'
import sharp from 'sharp'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    beforeOperation: [
      async ({ operation, req }) => {
        if ((operation === 'create' || operation === 'update') && req.file) {
          const { mimetype } = req.file

          // Skip SVG, GIF (animated), and non-image files
          if (
            !mimetype?.startsWith('image/') ||
            mimetype === 'image/svg+xml' ||
            mimetype === 'image/gif'
          ) {
            return
          }

          try {
            const { data, info } = await sharp(req.file.data)
              .resize({
                width: 2048,
                height: 2048,
                fit: 'inside',
                withoutEnlargement: true,
              })
              .webp({ quality: 80 })
              .toBuffer({ resolveWithObject: true })

            req.file.data = data
            req.file.mimetype = 'image/webp'
            req.file.size = info.size
            req.file.name = req.file.name.replace(/\.[^.]+$/, '') + '.webp'
          } catch (err) {
            console.error('[Media] Image compression error:', err)
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'medium',
        width: 960,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
  },
}
