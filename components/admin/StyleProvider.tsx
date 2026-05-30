'use client'

import React from 'react'

const adminStyles = `
  /* ── Login card background ── */
  .template-minimal {
    background: linear-gradient(135deg, #eef4fa 0%, #f8fafc 55%, #ebf3fb 100%) !important;
    min-height: 100vh;
  }
  .template-minimal__wrap {
    border-radius: 1rem !important;
    box-shadow: 0 8px 32px rgba(0,94,155,0.10), 0 2px 6px rgba(0,0,0,0.05) !important;
    border: 1px solid rgba(0,94,155,0.15) !important;
    overflow: hidden !important;
  }

  /* ── Login page ── */
  .login__brand { display: none !important; }
  .login__form {
    padding: 0.25rem 2.25rem 2.5rem !important;
  }
  .login__form__inputWrap {
    margin-bottom: 1.25rem !important;
  }
  .login__form > a {
    display: block !important;
    margin-bottom: 1.25rem !important;
  }

  /* ── Forgot password & reset password pages ── */
  .template-minimal__wrap > .form,
  .template-minimal__wrap > form {
    padding: 2rem 2.25rem 2.25rem !important;
  }
  .template-minimal__wrap > a {
    display: block !important;
    padding: 0 2.25rem 1.75rem !important;
    text-align: center !important;
  }
`

export function StyleProvider({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: adminStyles }} />
      {children}
    </>
  )
}
