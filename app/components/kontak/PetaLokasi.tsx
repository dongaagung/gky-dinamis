type PetaLokasiProps = {
  alamat: string
  googleMapsEmbedUrl?: string | null
}

export default function PetaLokasi({ alamat, googleMapsEmbedUrl }: PetaLokasiProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-xl font-bold text-primary">Lokasi Gereja</h2>
        <p className="text-gray-500 text-sm mt-1">{alamat}</p>
      </div>
      {googleMapsEmbedUrl && (
        <iframe
          src={googleMapsEmbedUrl}
          title="Lokasi Gereja"
          className="w-full h-[350px] md:h-[400px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      )}
    </div>
  );
}
