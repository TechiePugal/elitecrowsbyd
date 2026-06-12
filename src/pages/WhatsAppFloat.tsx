import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'

const floatingStyle = {
  position: 'fixed' as const,
  right: '28px',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '11px 18px 11px 14px',
  borderRadius: '980px',
  textDecoration: 'none',
  color: '#fff',
  fontSize: '13px',
  fontWeight: 700,
  fontFamily: 'inherit',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.18)',
}

export default function WhatsAppFloat() {
  return (
    <>
      <motion.a
        href="tel:+916383106107"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.4, type: 'spring', stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        style={{
          ...floatingStyle,
          bottom: '96px',
          background: 'linear-gradient(135deg, #0071E3, #00C6FF)',
        }}
      >
        <Phone size={18} color="#fff" />
        <span style={{ display: 'none' }} className="call-label">Call</span>
      </motion.a>

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
          ...floatingStyle,
          bottom: '28px',
          background: 'linear-gradient(135deg, #25D366, #1EBE5D)',
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          style={{ height: '18px', width: '18px', filter: 'brightness(0) invert(1)' }}
          alt="WhatsApp"
        />
        <span style={{ display: 'none' }} className="wa-label">WhatsApp</span>
      </motion.a>

      <style>{`
        @media (min-width: 480px) {
          .wa-label, .call-label { display: block !important; }
        }
      `}</style>
    </>
  )
}
