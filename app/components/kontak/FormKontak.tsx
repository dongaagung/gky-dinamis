import Image from "next/image";

export default function FormKontak() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 h-full flex flex-col items-center text-center">
      <h2 className="text-xl font-bold text-primary mb-2">Doa</h2>
      <p className="text-gray-500 text-sm mb-6">
        Sedang ada pergumulan atau butuh didoakan? Scan QR code di bawah ini.
      </p>

      <div className="w-56 h-56 md:w-64 md:h-64 rounded-xl overflow-hidden border border-gray-200 p-3">
        <Image
          src="/QR-doa-gky.jpeg"
          alt="QR Code Doa GKY"
          width={256}
          height={256}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
