"use client";

import { useActionState, useEffect, useState } from "react";
import { kirimPesan } from "@/app/actions/kirimPesan";

export default function FormKontak() {
  const [state, action, isPending] = useActionState(kirimPesan, null);
  const [formKey, setFormKey] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (state?.success) setSent(true);
  }, [state?.success]);

  if (sent) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10 h-full flex flex-col items-center justify-center text-center gap-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-primary">Pesan Terkirim!</h3>
        <p className="text-gray-600 leading-relaxed max-w-sm">
          {state?.message}
        </p>
        <button
          onClick={() => { setSent(false); setFormKey((k) => k + 1); }}
          className="mt-2 text-sm text-primary font-medium hover:underline"
        >
          Kirim pesan lain
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <h2 className="text-xl font-bold text-primary mb-2">Kirim Pesan</h2>
      <p className="text-gray-500 text-sm mb-6">
        Ada pertanyaan atau ingin menghubungi kami? Isi formulir di bawah ini.
      </p>

      <form key={formKey} action={action} noValidate className="space-y-5">
        <div>
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1.5">
            Nama <span className="text-red-500">*</span>
          </label>
          <input
            id="nama"
            name="nama"
            type="text"
            required
            placeholder="Nama lengkap Anda"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label htmlFor="nomorWA" className="block text-sm font-medium text-gray-700 mb-1.5">
            Nomor WhatsApp / Telepon <span className="text-red-500">*</span>
          </label>
          <input
            id="nomorWA"
            name="nomorWA"
            type="tel"
            required
            placeholder="Contoh: 08123456789"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label htmlFor="pesan" className="block text-sm font-medium text-gray-700 mb-1.5">
            Pesan <span className="text-red-500">*</span>
          </label>
          <textarea
            id="pesan"
            name="pesan"
            rows={5}
            required
            placeholder="Tuliskan pesan Anda di sini..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors resize-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {state && !state.success && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <svg className="mt-0.5 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
              </svg>
              Mengirim...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Kirim Pesan
            </>
          )}
        </button>
      </form>
    </div>
  );
}
