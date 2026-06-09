import { motion } from 'framer-motion'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/916383106107"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.4, type: 'spring', stiffness: 200, damping: 18 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed',
        bottom: '28px', right: '28px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '11px 18px 11px 14px',
        borderRadius: '980px',
        background: '#25D366',
        boxShadow: '0 4px 20px rgba(37, 211, 102, 0.35)',
        textDecoration: 'none',
        color: '#fff',
        fontSize: '13px',
        fontWeight: 700,
        fontFamily: 'inherit',
      }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        style={{ height: '18px', width: '18px', filter: 'brightness(0) invert(1)' }}
        alt="WhatsApp"
      />
      <span style={{ display: 'none' }} className="wa-label">WhatsApp</span>
      <style>{`
        @media (min-width: 480px) {
          .wa-label { display: block !important; }
        }
      `}</style>
    </motion.a>
  )
}
