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
      views: {
        dashboard: {
          Component: '@/components/admin/Dashboard#Dashboard',
        },
      },
    },
  },
  collections: [Users, Media, JadwalIbadah, HeroSlide, Pengurus, Kegiatan, Galeri, VideoKhotbah, FAQ, KontakPesan],
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
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
});
