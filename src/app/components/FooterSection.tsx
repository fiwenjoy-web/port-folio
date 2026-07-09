import { motion } from "motion/react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useContent } from "../context/ContentContext";

const MONO = "'Noto Sans Thai', sans-serif";
const SANS = "'Noto Sans Thai', sans-serif";

export function FooterSection() {
  const { content, t } = useContent();
  const { footer } = content;

  return (
    <footer className="relative overflow-hidden" style={{ fontFamily: SANS }}>

      {/* ── Big CTA band ── */}
      <div className="relative px-6 md:px-16 lg:px-24 py-24 overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,102,255,0.07) 0%, transparent 70%)" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.35), transparent)" }} />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#00d4ff", fontFamily: SANS }}>
              LET'S WORK TOGETHER
            </p>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(2.2rem, 6vw, 4.5rem)", color: "#fff", lineHeight: 0.95, letterSpacing: "-0.03em" }}>
              Have a project
              <br />
              <span style={{ background: "linear-gradient(95deg, #00d4ff, #0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                in mind?
              </span>
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a href={`mailto:${footer.email}`}
              className="flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #00d4ff, #0066ff)",
                color: "#000", letterSpacing: "0.05em",
                boxShadow: "0 0 40px rgba(0,212,255,0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}>
              <Mail size={15} />
              GET IN TOUCH
              <ArrowUpRight size={14} />
            </a>
            <a href={`tel:${footer.phone}`}
              className="flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm transition-all hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.1)", letterSpacing: "0.04em" }}>
              <Phone size={15} />
              {footer.phone}
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Footer links ── */}
      <div className="relative py-16 px-6 md:px-16 lg:px-24"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)" }} />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg" style={{ background: "linear-gradient(135deg, #00d4ff, #0066ff)" }} />
              <span className="text-white" style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.05em" }}>WH</span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>
              {t(footer.tagline)}
            </p>
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
              style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)", color: "#00d4ff", fontFamily: MONO }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00d4ff" }} />
              {t(footer.navStatus)}
            </span>
          </motion.div>

          {/* Nav */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: "rgba(255,255,255,0.35)", fontFamily: MONO }}>
              {t(footer.navigateLabel)}
            </p>
            <ul className="flex flex-col gap-3">
              {footer.navItems.map((item, i) => (
                <li key={i}>
                  <a href="#" className="group flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}>
                    <span className="w-0 group-hover:w-4 h-px transition-all duration-200" style={{ background: "#00d4ff" }} />
                    {t(item)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: "rgba(255,255,255,0.35)", fontFamily: MONO }}>
              {t(footer.contactLabel)}
            </p>
            <div className="flex flex-col gap-4">
              {[
                { href: `mailto:${footer.email}`, icon: Mail, color: "#00d4ff", label: "EMAIL", value: footer.email },
                { href: `tel:${footer.phone.replace(/-/g, "")}`, icon: Phone, color: "#0066ff", label: "PHONE", value: footer.phone },
              ].map(({ href, icon: Icon, color, label, value }) => (
                <a key={label} href={href} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: color + "14", border: `1px solid ${color}25` }}>
                    <Icon size={15} color={color} />
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.3)", fontFamily: MONO }}>{label}</p>
                    <p className="text-sm transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = color)}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)")}>
                      {value}
                    </p>
                  </div>
                </a>
              ))}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(147,51,234,0.14)", border: "1px solid rgba(147,51,234,0.25)" }}>
                  <MapPin size={15} color="#9333ea" />
                </div>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.3)", fontFamily: MONO }}>LOCATION</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{t(footer.location)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)", fontFamily: MONO }}>{t(footer.copyright)}</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)", fontFamily: MONO }}>
            CREATIVE DESIGNER / AI VISUAL PRODUCTION
          </p>
        </div>
      </div>
      </div>{/* end footer links wrapper */}
    </footer>
  );
}
