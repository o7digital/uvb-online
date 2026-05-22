import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  Bot,
  CalendarDays,
  CheckCircle2,
  Cloud,
  CreditCard,
  DatabaseBackup,
  FileSignature,
  FileText,
  GraduationCap,
  Home,
  Menu,
  MessageCircle,
  PlayCircle,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  X,
  UserRoundCog,
  Users,
  Video,
} from "lucide-react";

const stats = [
  ["Alumnos", "1,248", "+12%"],
  ["Cursos activos", "86", "24 online"],
  ["Prospectos", "312", "48 calientes"],
  ["Adeudos", "$184k", "seguimiento"],
];

const studentMenu = [
  { icon: Home, label: "Inicio" },
  { icon: BookOpen, label: "Mis cursos" },
  { icon: CreditCard, label: "Estado de cuenta" },
  { icon: CalendarDays, label: "Calendario" },
  { icon: MessageCircle, label: "Profesores" },
  { icon: FileText, label: "Documentos" },
];

const modules = [
  { icon: Users, title: "Intranet alumnos", text: "Perfil, foto, datos personales, campus, carrera, documentos y avance académico." },
  { icon: CreditCard, title: "Estado de cuenta", text: "Adeudos, pagos, conceptos, historial, datos fiscales y solicitudes CFDI." },
  { icon: BookOpen, title: "Cursos físicos", text: "Materias, horarios, campus, profesor asignado, calendario y asistencia básica." },
  { icon: Video, title: "UVB Online", text: "Cursos en línea con videos, sesiones virtuales, materiales y avance por alumno." },
  { icon: MessageCircle, title: "Chat profesores", text: "Comunicación interna por curso entre alumno, profesor y administración." },
  { icon: CalendarDays, title: "Calendario", text: "Clases, pagos, sesiones online, eventos, fechas de entrega y recordatorios." },
  { icon: FileSignature, title: "Contratos", text: "Gestión documental y preparación para firma digital con DocuSign." },
  { icon: ReceiptText, title: "CFDI", text: "Captura de datos fiscales y flujo de solicitud de factura para administración." },
  { icon: Bot, title: "IA Hugging Face", text: "Asistente académico, recomendador de cursos, buscador inteligente y prospectos." },
  { icon: Cloud, title: "Almacenamiento", text: "Fotos, contratos, materiales, documentos escolares y archivos de cursos." },
  { icon: DatabaseBackup, title: "Backups", text: "Respaldos básicos de datos, archivos y documentación importante." },
  { icon: Smartphone, title: "App iOS / Android", text: "WebApp convertida en app móvil mediante Capacitor con navegación optimizada." },
];

const courses = [
  { name: "Marketing Digital", kind: "UVB Online", progress: 72, next: "Clase en vivo · Hoy 18:00", teacher: "Mtra. Daniela R." },
  { name: "Administración de Empresas", kind: "Presencial", progress: 64, next: "Campus Reynosa · Lun 10:00", teacher: "Dr. Carlos M." },
  { name: "Contabilidad Básica", kind: "Híbrido", progress: 81, next: "Salón virtual · Vie 12:00", teacher: "Mtro. Luis A." },
];

const account = [
  ["Colegiatura mayo", "$2,850", "Pendiente"],
  ["Inscripción", "$1,200", "Pagado"],
  ["Curso online", "$950", "Pagado"],
];

function PhonePreview() {
  return (
    <div className="mx-auto w-[290px] rounded-[2.5rem] border border-white/40 bg-[#10291d] p-3 shadow-2xl shadow-green-950/30 sm:w-[320px]">
      <div className="min-h-[570px] overflow-hidden rounded-[2rem] bg-[#f6fbf2]">
        <div className="bg-[#1c5c3f] px-5 pb-4 pt-5 text-white">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-xs font-black text-[#1c5c3f]">UVB</div>
              <div>
                <div className="text-xs text-[#cfe98a]">UVB Online</div>
                <div className="text-sm font-bold">App Alumno</div>
              </div>
            </div>
            <Menu className="h-5 w-5 text-[#cfe98a]" />
          </div>
          <div className="rounded-2xl bg-white/12 p-4">
            <div className="text-xs text-green-100">Bienvenida</div>
            <div className="text-lg font-black">María Fernanda</div>
            <div className="text-xs text-[#dcefa1]">Marketing Digital · Campus Reynosa</div>
          </div>
        </div>

        <div className="space-y-4 p-4">
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Avance", "72%"],
              ["Adeudo", "$2.8k"],
              ["Cursos", "3"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[#1c5c3f]/10 bg-white p-3 shadow-sm">
                <div className="text-[10px] text-[#60746a]">{label}</div>
                <div className="text-lg font-black text-[#1c5c3f]">{value}</div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-[#1c5c3f]/10 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="font-bold text-[#1c5c3f]">Mi clase online</div>
              <PlayCircle className="h-5 w-5 text-[#8ba63f]" />
            </div>
            <div className="flex h-28 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1c5c3f] to-[#8ba63f] text-white">
              <div className="text-center">
                <Video className="mx-auto mb-1 h-8 w-8" />
                <div className="text-sm font-bold">Salón virtual</div>
                <div className="text-xs">Marketing Digital · 18:00</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {studentMenu.slice(1, 5).map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl border border-[#1c5c3f]/10 bg-white p-3 shadow-sm">
                <Icon className="mb-2 h-5 w-5 text-[#8ba63f]" />
                <div className="text-xs font-bold text-[#1c5c3f]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#1c5c3f]/10 bg-white/90 shadow-2xl shadow-green-950/10">
      <div className="flex items-center justify-between bg-[#1c5c3f] px-6 py-4 text-white">
        <div>
          <div className="text-xs font-semibold text-[#cfe98a]">Admin WebApp</div>
          <div className="text-xl font-black">Dashboard UVB</div>
        </div>
        <Bell className="h-5 w-5 text-[#cfe98a]" />
      </div>
      <div className="grid gap-5 p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([label, value, note]) => (
            <div key={label} className="rounded-2xl border border-[#1c5c3f]/10 bg-[#f4f8f3] p-4">
              <div className="text-xs text-[#60746a]">{label}</div>
              <div className="text-2xl font-black text-[#1c5c3f]">{value}</div>
              <div className="text-xs font-semibold text-[#6b7f2b]">{note}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-3xl border border-[#1c5c3f]/10 bg-white p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="font-black text-[#1c5c3f]">Cursos y avance</div>
              <span className="rounded-full bg-[#8ba63f]/15 px-3 py-1 text-xs font-bold text-[#6b7f2b]">físico + online</span>
            </div>
            <div className="space-y-3">
              {courses.map((course) => (
                <div key={course.name} className="rounded-2xl border border-[#1c5c3f]/10 bg-[#f4f8f3] p-3">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-[#1c5c3f]">{course.name}</div>
                      <div className="text-xs text-[#60746a]">{course.kind} · {course.teacher}</div>
                    </div>
                    <div className="text-sm font-black text-[#6b7f2b]">{course.progress}%</div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full border border-[#1c5c3f]/10 bg-white">
                    <div className="h-full bg-[#8ba63f]" style={{ width: `${course.progress}%` }} />
                  </div>
                  <div className="mt-2 text-xs text-[#3c594a]">{course.next}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-[#1c5c3f] p-5 text-white">
              <div className="mb-3 flex items-center gap-3">
                <Bot className="h-6 w-6 text-[#cfe98a]" />
                <div className="font-black">IA Académica</div>
              </div>
              <div className="mb-3 rounded-2xl bg-white/12 p-3 text-sm text-green-50">“Quiero estudiar algo relacionado con empresas”</div>
              <div className="space-y-2 text-sm">
                {["Administración", "Marketing Digital", "Contabilidad"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#cfe98a]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#1c5c3f]/10 bg-white p-5">
              <div className="mb-3 font-black text-[#1c5c3f]">Estado de cuenta</div>
              <div className="space-y-2">
                {account.map(([concept, amount, status]) => (
                  <div key={concept} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-xl border border-[#1c5c3f]/5 bg-[#f4f8f3] px-3 py-2 text-sm">
                    <span>{concept}</span>
                    <span className="font-bold text-[#1c5c3f]">{amount}</span>
                    <span className={status === "Pagado" ? "font-semibold text-emerald-700" : "font-semibold text-amber-700"}>{status}</span>
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full rounded-xl bg-[#8ba63f] py-2 text-sm font-bold text-white">Solicitar CFDI</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UVBOnlineAppDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f4f8f3] text-[#123524]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,166,63,.28),transparent_32%),radial-gradient(circle_at_80%_8%,rgba(28,92,63,.2),transparent_28%),linear-gradient(180deg,#fbfff8,#eef6ea_48%,#f8fbf5)]" />
      <div className="relative">
        <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1c5c3f] font-black text-white shadow-xl ring-4 ring-white/70">UVB</div>
            <div>
              <div className="text-sm font-semibold text-[#6b7f2b]">Universidad Valle del Bravo</div>
              <div className="font-bold tracking-wide text-[#1c5c3f]">UVB Online · App iOS / Android</div>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#2f5b45] md:flex">
            <span>Intranet</span>
            <span>Estado de cuenta</span>
            <span>UVB Online</span>
            <span>Dashboard</span>
          </nav>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#1c5c3f]/15 bg-white text-[#1c5c3f] shadow-sm md:hidden"
            aria-label={isMobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <button className="hidden rounded-full bg-[#1c5c3f] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-green-950/20 sm:block">Demo conceptual</button>
        </header>
        {isMobileMenuOpen && (
          <div className="mx-5 mb-3 rounded-2xl border border-[#1c5c3f]/10 bg-white/95 p-3 shadow-xl md:hidden sm:mx-6">
            <div className="grid gap-1 text-sm font-semibold text-[#1c5c3f]">
              {["Intranet", "Estado de cuenta", "UVB Online", "Dashboard"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className="rounded-xl px-3 py-2 text-left hover:bg-[#f4f8f3]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="mt-3 w-full rounded-xl bg-[#1c5c3f] px-4 py-2 text-sm font-semibold text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Demo conceptual
            </button>
          </div>
        )}

        <main className="mx-auto max-w-7xl px-5 pb-20 sm:px-6">
          <section className="grid items-center gap-10 pt-8 lg:grid-cols-[1fr_.92fr] lg:pt-14">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8ba63f]/40 bg-white/75 px-4 py-2 text-sm font-semibold text-[#1c5c3f] shadow-sm">
                <GraduationCap className="h-4 w-4 text-[#8ba63f]" />
                Universidad física + UVB Online + App móvil
              </div>
              <h1 className="text-4xl font-black leading-tight text-[#1c5c3f] md:text-6xl">
                UVB Online
                <span className="block text-[#8ba63f]">Intranet académica y App móvil</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#3c594a]">
                Una experiencia digital para alumnos, profesores y administración: estado de cuenta, avance académico, cursos en línea, salones virtuales, chat, documentos, IA y app iOS / Android.
              </p>
              <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                {[
                  [Smartphone, "App iOS / Android"],
                  [Video, "Cursos online"],
                  [CreditCard, "Estado de cuenta"],
                ].map(([Icon, label]) => (
                  <div key={label} className="rounded-2xl border border-[#1c5c3f]/10 bg-white/80 p-4 shadow-sm">
                    <Icon className="mb-2 h-6 w-6 text-[#8ba63f]" />
                    <div className="text-sm font-bold text-[#1c5c3f]">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.1 }}>
              <PhonePreview />
            </motion.div>
          </section>

          <section className="pt-16">
            <AdminDashboard />
          </section>

          <section className="pt-20">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-2 font-bold text-[#6b7f2b]">Módulos del MVP</div>
                <h2 className="text-3xl font-black text-[#1c5c3f] md:text-4xl">No es solo una app: es una plataforma operativa</h2>
              </div>
              <p className="max-w-xl text-[#3c594a]">El sitio actual presenta UVB. Esta WebApp permite operar la experiencia digital de alumnos, profesores y administración.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {modules.map(({ icon: Icon, title, text }) => (
                <motion.div key={title} whileHover={{ y: -4 }} className="rounded-3xl border border-[#1c5c3f]/10 bg-white/85 p-5 shadow-xl shadow-green-950/5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1c5c3f] text-[#c7df6d]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#1c5c3f]">{title}</h3>
                  <p className="text-sm leading-relaxed text-[#3c594a]">{text}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="grid gap-5 pt-20 lg:grid-cols-3">
            <div className="rounded-[2rem] bg-[#1c5c3f] p-6 text-white shadow-xl shadow-green-950/20">
              <Video className="mb-4 h-8 w-8 text-[#cfe98a]" />
              <h3 className="mb-3 text-2xl font-black">UVB Online</h3>
              <p className="leading-relaxed text-green-50">Cursos digitales con videos, salones virtuales, materiales descargables, seguimiento de avance y apoyo de HeyGen para contenidos introductorios.</p>
            </div>
            <div className="rounded-[2rem] border border-[#1c5c3f]/10 bg-white/85 p-6 shadow-xl shadow-green-950/5">
              <UserRoundCog className="mb-4 h-8 w-8 text-[#8ba63f]" />
              <h3 className="mb-3 text-2xl font-black text-[#1c5c3f]">Admin real</h3>
              <p className="leading-relaxed text-[#3c594a]">Alta de alumnos, profesores, perfiles, fotografías, documentos, cursos, materias, calendario, contratos y parametrización básica.</p>
            </div>
            <div className="rounded-[2rem] border border-[#1c5c3f]/10 bg-white/85 p-6 shadow-xl shadow-green-950/5">
              <ShieldCheck className="mb-4 h-8 w-8 text-[#8ba63f]" />
              <h3 className="mb-3 text-2xl font-black text-[#1c5c3f]">Base escalable</h3>
              <p className="leading-relaxed text-[#3c594a]">Astro, React, GitHub, Vercel, Supabase, Hugging Face y Capacitor para reducir costo sin perder arquitectura moderna.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
