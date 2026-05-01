"use client";

import { useState } from "react";

interface FormData {
  nama: string;
  email: string;
  pesan: string;
}

interface FormErrors {
  nama: string;
  email: string;
  pesan: string;
}

const EMPTY_FORM: FormData = { nama: "", email: "", pesan: "" };
const EMPTY_ERRORS: FormErrors = { nama: "", email: "", pesan: "" };

export default function FormKontak() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>(EMPTY_ERRORS);
  const [success, setSuccess] = useState(false);

  function validate(): FormErrors {
    const e: FormErrors = { ...EMPTY_ERRORS };
    if (!formData.nama.trim()) e.nama = "Nama wajib diisi.";
    if (!formData.email.trim()) {
      e.email = "Email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Format email tidak valid.";
    }
    if (!formData.pesan.trim()) e.pesan = "Pesan wajib diisi.";
    return e;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.values(newErrors).some((v) => v)) {
      setErrors(newErrors);
      return;
    }
    setSuccess(true);
    setFormData(EMPTY_FORM);
    setErrors(EMPTY_ERRORS);
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10 h-full flex flex-col items-center justify-center text-center gap-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-primary">Pesan Terkirim!</h3>
        <p className="text-gray-600 leading-relaxed max-w-sm">
          Pesan Anda telah diterima. Kami akan segera menghubungi Anda.
        </p>
        <button
          onClick={() => setSuccess(false)}
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

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1.5">
            Nama <span className="text-red-500">*</span>
          </label>
          <input
            id="nama"
            name="nama"
            type="text"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Nama lengkap Anda"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-primary/20 ${
              errors.nama
                ? "border-red-400 focus:border-red-400"
                : "border-gray-200 focus:border-primary"
            }`}
          />
          {errors.nama && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.nama}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@contoh.com"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-primary/20 ${
              errors.email
                ? "border-red-400 focus:border-red-400"
                : "border-gray-200 focus:border-primary"
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="pesan" className="block text-sm font-medium text-gray-700 mb-1.5">
            Pesan <span className="text-red-500">*</span>
          </label>
          <textarea
            id="pesan"
            name="pesan"
            rows={5}
            value={formData.pesan}
            onChange={handleChange}
            placeholder="Tuliskan pesan Anda di sini..."
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors resize-none focus:ring-2 focus:ring-primary/20 ${
              errors.pesan
                ? "border-red-400 focus:border-red-400"
                : "border-gray-200 focus:border-primary"
            }`}
          />
          {errors.pesan && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.pesan}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Kirim Pesan
        </button>
      </form>
    </div>
  );
}
