import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Card } from './Card'
import { Chart } from './Chart'

const MONTHLY_CHART_DATA = [
  { name: 'Jan', value: 3 },
  { name: 'Feb', value: 5 },
  { name: 'Mar', value: 4 },
  { name: 'Apr', value: 8 },
  { name: 'Mei', value: 6 },
  { name: 'Jun', value: 11 },
  { name: 'Jul', value: 7 },
  { name: 'Agu', value: 13 },
  { name: 'Sep', value: 10 },
  { name: 'Okt', value: 15 },
  { name: 'Nov', value: 12 },
  { name: 'Des', value: 9 },
]

export async function Dashboard() {
  const payload = await getPayload({ config })

  const [
    { totalDocs: totalKegiatan },
    { totalDocs: totalPengurus },
    { totalDocs: totalVideo },
    { totalDocs: totalPesanBaru },
    { docs: pesanTerbaru },
  ] = await Promise.all([
    payload.find({ collection: 'kegiatan', limit: 0 }),
    payload.find({ collection: 'pengurus', limit: 0 }),
    payload.find({ collection: 'video-khotbah', limit: 0 }),
    payload.find({
      collection: 'kontak-pesan',
      where: { dibaca: { equals: false } },
      limit: 0,
    }),
    payload.find({
      collection: 'kontak-pesan',
      sort: '-createdAt',
      limit: 5,
    }),
  ])

  const now = new Date()
  const greeting =
    now.getHours() < 12 ? 'Selamat pagi' : now.getHours() < 17 ? 'Selamat siang' : 'Selamat malam'

  return (
    <div
      style={{
        padding: "2rem 2.5rem",
        background: "#F8FAFC",
        minHeight: "100vh",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", system-ui, sans-serif',
        color: "#111827",
      }}
    >
      {/* ─── Header ─── */}
      <div style={{ marginBottom: "2rem" }}>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#9CA3AF",
            margin: "0 0 0.25rem",
            fontWeight: 500,
          }}
        >
          {greeting} 👋
        </p>
        <h1
          style={{
            fontSize: "1.625rem",
            fontWeight: 700,
            color: "#111827",
            margin: 0,
            letterSpacing: "-0.025em",
          }}
        >
          Dashboard GKY
        </h1>
      </div>

      {/* ─── Stat Cards ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "1.125rem",
          marginBottom: "1.5rem",
        }}
      >
        <Card
          title="Kegiatan"
          value={totalKegiatan}
          description="Total kegiatan terdaftar"
          icon="📅"
          accentColor="#6366F1"
          accentBg="#EEF2FF"
        />
        <Card
          title="Pengurus"
          value={totalPengurus}
          description="Anggota aktif pengurus"
          icon="👥"
          accentColor="#10B981"
          accentBg="#ECFDF5"
        />
        <Card
          title="Video Khotbah"
          value={totalVideo}
          description="Video tersedia"
          icon="🎬"
          accentColor="#F59E0B"
          accentBg="#FFFBEB"
        />
        <Card
          title="Pesan Belum Dibaca"
          value={totalPesanBaru}
          description="Dari form kontak"
          icon="✉️"
          accentColor="#EF4444"
          accentBg="#FEF2F2"
        />
      </div>

      {/* ─── Chart + Quick Actions ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 280px",
          gap: "1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        <Chart data={MONTHLY_CHART_DATA} title="Aktivitas Konten · 2025" />

        {/* Quick Actions */}
        <div
          style={{
            background: "#fff",
            borderRadius: "1rem",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
            border: "1px solid #F3F4F6",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "#111827",
              margin: "0 0 1.125rem",
              letterSpacing: "-0.01em",
            }}
          >
            Aksi Cepat
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.625rem",
              flex: 1,
            }}
          >
            <QuickActionLink
              href="/admin/collections/kegiatan/create"
              label="Tambah Kegiatan"
              emoji="📅"
              primary
            />
            <QuickActionLink
              href="/admin/collections/video-khotbah/create"
              label="Tambah Video"
              emoji="🎬"
            />
            <QuickActionLink
              href="/admin/collections/pengurus/create"
              label="Tambah Pengurus"
              emoji="👥"
            />
            <QuickActionLink
              href="/admin/collections/galeri/create"
              label="Upload Galeri"
              emoji="🖼️"
            />
            <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
              <QuickActionLink
                href="/admin/collections/kontak-pesan"
                label={`Pesan Masuk${totalPesanBaru > 0 ? ` (${totalPesanBaru})` : ""}`}
                emoji="✉️"
                badge={totalPesanBaru > 0}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Recent Messages ─── */}
      <div
        style={{
          background: "#fff",
          borderRadius: "1rem",
          padding: "1.5rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
          border: "1px solid #F3F4F6",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.25rem",
          }}
        >
          <h3
            style={{
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "#111827",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Pesan Terbaru
          </h3>
          <a
            href="/admin/collections/kontak-pesan"
            style={{
              fontSize: "0.8125rem",
              color: "#6366F1",
              fontWeight: 500,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            Lihat semua →
          </a>
        </div>

        {pesanTerbaru.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "2.5rem 1rem",
              color: "#9CA3AF",
              fontSize: "0.875rem",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📭</div>
            Belum ada pesan masuk
          </div>
        ) : (
          <div>
            {pesanTerbaru.map((pesan, i) => {
              const nama = pesan.nama as string;
              const pesanText = pesan.pesan as string;
              const dibaca = pesan.dibaca as boolean;
              const createdAt = pesan.createdAt as string;

              return (
                <div
                  key={pesan.id}
                  style={{
                    padding: "1rem 0",
                    borderBottom:
                      i < pesanTerbaru.length - 1
                        ? "1px solid #F9FAFB"
                        : "none",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.875rem",
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: "2.25rem",
                      height: "2.25rem",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #818CF8, #6366F1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      flexShrink: 0,
                      color: "#fff",
                    }}
                  >
                    {nama?.[0]?.toUpperCase() ?? "?"}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            color: "#111827",
                          }}
                        >
                          {nama}
                        </span>
                        {!dibaca && (
                          <span
                            style={{
                              background: "#6366F1",
                              color: "#fff",
                              fontSize: "0.625rem",
                              padding: "2px 7px",
                              borderRadius: "9999px",
                              fontWeight: 600,
                              letterSpacing: "0.04em",
                              textTransform: "uppercase",
                            }}
                          >
                            Baru
                          </span>
                        )}
                      </div>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "#9CA3AF",
                          flexShrink: 0,
                        }}
                      >
                        {new Date(createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                    <p
                      style={{
                        color: "#6B7280",
                        fontSize: "0.8125rem",
                        margin: "0.25rem 0 0",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        lineHeight: 1.5,
                      }}
                    >
                      {pesanText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Footer ─── */}
      <p
        style={{
          textAlign: "center",
          color: "#D1D5DB",
          fontSize: "0.75rem",
          marginTop: "2rem",
          fontWeight: 500,
        }}
      >
        GKY Admin · © {new Date().getFullYear()} GKY Balikpapan. All rights reserved.
      </p>
    </div>
  );
}

function QuickActionLink({
  href,
  label,
  emoji,
  primary,
  badge,
}: {
  href: string
  label: string
  emoji: string
  primary?: boolean
  badge?: boolean
}) {
  return (
    <a
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
        padding: '0.625rem 0.875rem',
        borderRadius: '0.625rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        textDecoration: 'none',
        transition: 'background 0.15s, transform 0.1s',
        ...(primary
          ? {
              background: 'linear-gradient(135deg, #818CF8, #6366F1)',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(99,102,241,0.35)',
            }
          : {
              background: '#F9FAFB',
              color: '#374151',
              border: '1px solid #E5E7EB',
            }),
      }}
    >
      <span style={{ fontSize: '1rem' }}>{emoji}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {badge && (
        <span
          style={{
            background: '#EF4444',
            color: '#fff',
            fontSize: '0.625rem',
            width: '1.25rem',
            height: '1.25rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
          }}
        >
          !
        </span>
      )}
    </a>
  )
}
