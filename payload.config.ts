import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { JadwalIbadah } from "./collections/JadwalIbadah";
import { HeroSlide } from "./collections/HeroSlide";
import { Pengurus } from "./collections/Pengurus";
import { Kegiatan } from "./collections/Kegiatan";
import { Galeri } from "./collections/Galeri";
import { VideoKhotbah } from "./collections/VideoKhotbah";
import { FAQ } from "./collections/FAQ";
import { KontakPesan } from "./collections/KontakPesan";
import { Komunitas } from "./collections/Komunitas";
import { SiteSettings } from "./collections/SiteSettings";
import { TentangGereja } from "./collections/TentangGereja";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      providers: ['@/components/admin/StyleProvider#StyleProvider'],
      beforeLogin: ['@/components/admin/BeforeLogin#BeforeLogin'],
      graphics: {
        Logo: '@/components/admin/AdminLogo#AdminLogo',
      },
      views: {
        dashboard: {
          Component: '@/components/admin/Dashboard#Dashboard',
        },
      },
    },
  },
  collections: [Users, Media, JadwalIbadah, HeroSlide, Pengurus, Kegiatan, Galeri, VideoKhotbah, FAQ, KontakPesan, Komunitas],
  globals: [SiteSettings, TentangGereja],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
      ssl: { rejectUnauthorized: false },
      max: 3,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 60000,
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: {
          // Makes foto.url return the direct Blob CDN URL instead of proxying
          // through /api/media/file/[filename]. Required for fast image loading.
          disablePayloadAccessControl: true,
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
});
