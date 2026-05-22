import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Cloud,
  CreditCard,
  DatabaseBackup,
  FileSignature,
  GraduationCap,
  Home,
  Menu,
  MessageCircle,
  PlayCircle,
  ReceiptText,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserRoundCog,
  Users,
  Video,
  X,
} from "lucide-react";

const navItems = ["Intranet", "Estado de cuenta", "UVB Online", "Dashboard"];

const personas = {
  alumno: {
    label: "Alumno",
    name: "María Fernanda",
    role: "Marketing Digital",
    campus: "Campus Reynosa",
    greeting: "Continuar mi clase",
    focus: "Salón virtual · Hoy 18:00",
    action: "Entrar ahora",
    stats: [
      ["Avance", "72%"],
      ["Adeudo", "$2.8k"],
      ["Cursos", "3"],
    ],
  },
  profesor: {
    label: "Profesor",
    name: "Mtra. Daniela R.",
    role: "Marketing Digital",
    campus: "Campus Reynosa",
    greeting: "Grupo en vivo",
    focus: "28 alumnos conectados",
    action: "Abrir aula",
    stats: [
      ["Grupos", "4"],
      ["Tareas", "18"],
      ["Chat", "6"],
    ],
  },
  admin: {
    label: "Admin",
    name: "Coordinación UVB",
    role: "Operación académica",
    campus: "Multicampus",
    greeting: "Pulso operativo",
    focus: "Prospectos, adeudos y cursos",
    action: "Ver tablero",
    stats: [
      ["Alumnos", "1.2k"],
      ["Cursos", "86"],
      ["Alertas", "12"],
    ],
  },
};

const quickActions = [
  { icon: BookOpen, label: "Mis cursos" },
  { icon: CreditCard, label: "Estado de cuenta" },
  { icon: CalendarDays, label: "Calendario" },
  { icon: MessageCircle, label: "Profesores" },
];

const stats = [
  ["Alumnos", "1,248", "+12%"],
  ["Cursos activos", "86", "24 online"],
  ["Prospectos", "312", "48 calientes"],
  ["Adeudos", "$184k", "seguimiento"],
];

const courses = [
  {
    name: "Marketing Digital",
    kind: "UVB Online",
    progress: 72,
    next: "Clase en vivo · Hoy 18:00",
    teacher: "Mtra. Daniela R.",
    signal: "28 conectados",
  },
  {
    name: "Administración de Empresas",
    kind: "Presencial",
    progress: 64,
    next: "Campus Reynosa · Lun 10:00",
    teacher: "Dr. Carlos M.",
    signal: "Asistencia 91%",
  },
  {
    name: "Contabilidad Básica",
    kind: "Híbrido",
    progress: 81,
    next: "Salón virtual · Vie 12:00",
    teacher: "Mtro. Luis A.",
    signal: "Entrega abierta",
  },
];

const account = [
  ["Colegiatura mayo", "$2,850", "Pendiente"],
  ["Inscripción", "$1,200", "Pagado"],
  ["Curso online", "$950", "Pagado"],
];

const aiPrompts = [
  {
    query: "Quiero estudiar algo relacionado con empresas",
    answer: ["Administración", "Marketing Digital", "Contabilidad"],
    note: "Ruta sugerida para perfil comercial y operativo.",
  },
  {
    query: "Necesito revisar alumnos con riesgo de abandono",
    answer: ["Adeudos recientes", "Bajo avance", "Sin asistencia"],
    note: "La IA prioriza señales académicas y administrativas.",
  },
  {
    query: "Qué curso puede volverse online primero",
    answer: ["Marketing Digital", "Contabilidad Básica", "Inglés Empresarial"],
    note: "Se eligen cursos con material modular y alta demanda.",
  },
];

const modules = [
  { icon: Users, title: "Intranet alumnos", text: "Perfil, foto, datos personales, campus, carrera, documentos y avance académico.", metric: "1,248 perfiles" },
  { icon: CreditCard, title: "Estado de cuenta", text: "Adeudos, pagos, conceptos, historial, datos fiscales y solicitudes CFDI.", metric: "$184k monitoreados" },
  { icon: BookOpen, title: "Cursos físicos", text: "Materias, horarios, campus, profesor asignado, calendario y asistencia básica.", metric: "62 presenciales" },
  { icon: Video, title: "UVB Online", text: "Cursos en línea con videos, sesiones virtuales, materiales y avance por alumno.", metric: "24 online" },
  { icon: MessageCircle, title: "Chat profesores", text: "Comunicación interna por curso entre alumno, profesor y administración.", metric: "186 mensajes" },
  { icon: CalendarDays, title: "Calendario", text: "Clases, pagos, sesiones online, eventos, fechas de entrega y recordatorios.", metric: "42 eventos" },
  { icon: FileSignature, title: "Contratos", text: "Gestión documental y preparación para firma digital con DocuSign.", metric: "96 expedientes" },
  { icon: ReceiptText, title: "CFDI", text: "Captura de datos fiscales y flujo de solicitud de factura para administración.", metric: "18 solicitudes" },
  { icon: Bot, title: "IA Hugging Face", text: "Asistente académico, recomendador de cursos, buscador inteligente y prospectos.", metric: "3 flujos IA" },
  { icon: Cloud, title: "Almacenamiento", text: "Fotos, contratos, materiales, documentos escolares y archivos de cursos.", metric: "Docs centralizados" },
  { icon: DatabaseBackup, title: "Backups", text: "Respaldos básicos de datos, archivos y documentación importante.", metric: "Respaldo diario" },
  { icon: Smartphone, title: "App iOS / Android", text: "WebApp convertida en app móvil mediante Capacitor con navegación optimizada.", metric: "Base WebApp" },
];

function PhonePreview({ persona, selectedCourse, activeModule }) {
  const data = personas[persona];
  const AccentIcon = persona === "admin" ? UserRoundCog : persona === "profesor" ? GraduationCap : Home;

  return (
    <div className="mx-auto w-[292px] rounded-[2.5rem] border border-white/60 bg-[#10291d] p-3 shadow-2xl shadow-green-950/30 sm:w-[330px]">
      <div className="min-h-[590px] overflow-hidden rounded-[2rem] bg-[#f6fbf2]">
        <div className="bg-[#1c5c3f] px-5 pb-4 pt-5 text-white">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-xs font-black text-[#1c5c3f]">UVB</div>
              <div>
                <div className="text-xs text-[#cfe98a]">UVB Online</div>
                <div className="text-sm font-bold">App {data.label}</div>
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
              <Menu className="h-5 w-5 text-[#cfe98a]" />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={persona}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="rounded-2xl bg-white/12 p-4"
            >
              <div className="text-xs text-green-100">Bienvenida</div>
              <div className="text-lg font-black">{data.name}</div>
              <div className="text-xs text-[#dcefa1]">{data.role} · {data.campus}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="space-y-4 p-4">
          <div className="grid grid-cols-3 gap-2">
            {data.stats.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[#1c5c3f]/10 bg-white p-3 shadow-sm">
                <div className="text-[10px] text-[#60746a]">{label}</div>
                <div className="text-lg font-black text-[#1c5c3f]">{value}</div>
              </div>
            ))}
          </div>

          <motion.div layout className="rounded-3xl border border-[#1c5c3f]/10 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-[#1c5c3f]">{data.greeting}</div>
                <div className="text-xs text-[#60746a]">{data.focus}</div>
              </div>
              <PlayCircle className="h-5 w-5 text-[#8ba63f]" />
            </div>
            <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#1c5c3f] via-[#2f7a52] to-[#8ba63f] text-white">
              <div className="absolute left-4 top-4 h-10 w-10 rounded-full border border-white/25" />
              <div className="absolute bottom-4 right-4 h-16 w-16 rounded-full border border-white/20" />
              <div className="relative text-center">
                <AccentIcon className="mx-auto mb-1 h-8 w-8" />
                <div className="text-sm font-bold">{selectedCourse.name}</div>
                <div className="text-xs">{selectedCourse.signal}</div>
              </div>
            </div>
            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8ba63f] py-2 text-sm font-bold text-white">
              {data.action}
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>

          <div className="grid grid-cols-2 gap-2">
            {quickActions.map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl border border-[#1c5c3f]/10 bg-white p-3 shadow-sm">
                <Icon className="mb-2 h-5 w-5 text-[#8ba63f]" />
                <div className="text-xs font-bold text-[#1c5c3f]">{label}</div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#8ba63f]/20 bg-[#eef6ea] p-3">
            <div className="flex items-center gap-2 text-xs font-black text-[#1c5c3f]">
              <Sparkles className="h-4 w-4 text-[#8ba63f]" />
              Módulo activo
            </div>
            <div className="mt-1 text-sm font-bold text-[#1c5c3f]">{activeModule.title}</div>
            <div className="text-xs text-[#60746a]">{activeModule.metric}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ selectedCourseIndex, setSelectedCourseIndex, activePrompt, setActivePrompt }) {
  const selectedCourse = courses[selectedCourseIndex];
  const prompt = aiPrompts[activePrompt];

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
            <motion.div whileHover={{ y: -2 }} key={label} className="rounded-2xl border border-[#1c5c3f]/10 bg-[#f4f8f3] p-4">
              <div className="text-xs text-[#60746a]">{label}</div>
              <div className="text-2xl font-black text-[#1c5c3f]">{value}</div>
              <div className="text-xs font-semibold text-[#6b7f2b]">{note}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-3xl border border-[#1c5c3f]/10 bg-white p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="font-black text-[#1c5c3f]">Cursos y avance</div>
                <div className="text-xs text-[#60746a]">Selecciona un curso para actualizar la app móvil.</div>
              </div>
              <span className="rounded-full bg-[#8ba63f]/15 px-3 py-1 text-xs font-bold text-[#6b7f2b]">físico + online</span>
            </div>
            <div className="space-y-3">
              {courses.map((course, index) => (
                <button
                  key={course.name}
                  type="button"
                  onClick={() => setSelectedCourseIndex(index)}
                  className={`w-full rounded-2xl border p-3 text-left transition ${
                    selectedCourseIndex === index
                      ? "border-[#8ba63f] bg-[#eef6ea] shadow-md"
                      : "border-[#1c5c3f]/10 bg-[#f4f8f3] hover:border-[#8ba63f]/50"
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-[#1c5c3f]">{course.name}</div>
                      <div className="text-xs text-[#60746a]">{course.kind} · {course.teacher}</div>
                    </div>
                    <div className="text-sm font-black text-[#6b7f2b]">{course.progress}%</div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full border border-[#1c5c3f]/10 bg-white">
                    <motion.div className="h-full bg-[#8ba63f]" animate={{ width: `${course.progress}%` }} />
                  </div>
                  <div className="mt-2 text-xs text-[#3c594a]">{course.next}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-[#1c5c3f] p-5 text-white">
              <div className="mb-3 flex items-center gap-3">
                <Bot className="h-6 w-6 text-[#cfe98a]" />
                <div>
                  <div className="font-black">IA Académica</div>
                  <div className="text-xs text-green-100">Simulación Hugging Face</div>
                </div>
              </div>
              <div className="mb-3 flex items-center gap-2 rounded-2xl bg-white/12 p-3 text-sm text-green-50">
                <Search className="h-4 w-4 text-[#cfe98a]" />
                {prompt.query}
              </div>
              <div className="mb-3 flex flex-wrap gap-2">
                {aiPrompts.map((item, index) => (
                  <button
                    key={item.query}
                    type="button"
                    onClick={() => setActivePrompt(index)}
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      activePrompt === index ? "bg-[#cfe98a] text-[#1c5c3f]" : "bg-white/10 text-green-50"
                    }`}
                  >
                    Caso {index + 1}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={prompt.query} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  <div className="space-y-2 text-sm">
                    {prompt.answer.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#cfe98a]" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-2xl bg-white/10 p-3 text-xs text-green-50">{prompt.note}</div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="rounded-3xl border border-[#1c5c3f]/10 bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="font-black text-[#1c5c3f]">Estado de cuenta</div>
                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-800">{selectedCourse.name}</span>
              </div>
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
  const [persona, setPersona] = useState("alumno");
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [activeModuleIndex, setActiveModuleIndex] = useState(3);
  const [activePrompt, setActivePrompt] = useState(0);

  const selectedCourse = courses[selectedCourseIndex];
  const activeModule = modules[activeModuleIndex];
  const selectedModuleIcon = activeModule.icon;
  const SelectedModuleIcon = useMemo(() => selectedModuleIcon, [selectedModuleIcon]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f4f8f3] text-[#123524]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,166,63,.28),transparent_32%),radial-gradient(circle_at_80%_8%,rgba(28,92,63,.2),transparent_28%),linear-gradient(180deg,#fbfff8,#eef6ea_48%,#f8fbf5)]" />
      <div className="relative">
        <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1c5c3f] font-black text-white shadow-xl ring-4 ring-white/70">UVB</div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-[#6b7f2b]">Universidad Valle del Bravo</div>
              <div className="truncate font-bold tracking-wide text-[#1c5c3f]">UVB Online · App iOS / Android</div>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#2f5b45] md:flex">
            {navItems.map((item) => <span key={item}>{item}</span>)}
          </nav>
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#1c5c3f]/15 bg-white text-[#1c5c3f] shadow-sm md:hidden"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <button className="hidden rounded-full bg-[#1c5c3f] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-green-950/20 md:block">Demo conceptual</button>
        </header>

        {isMobileMenuOpen && (
          <div className="mx-5 mb-3 rounded-2xl border border-[#1c5c3f]/10 bg-white/95 p-3 shadow-xl md:hidden sm:mx-6">
            <div className="grid gap-1 text-sm font-semibold text-[#1c5c3f]">
              {navItems.map((item) => (
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
                Demo interactiva · WebApp primero, app móvil después con Capacitor
              </div>
              <h1 className="text-4xl font-black leading-tight text-[#1c5c3f] md:text-6xl">
                UVB Online
                <span className="block text-[#8ba63f]">un campus digital vivo</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#3c594a]">
                Cambia el perfil, selecciona un curso y prueba la IA: la misma WebApp alimenta la intranet académica, el dashboard administrativo y la app iOS / Android.
              </p>

              <div className="mt-8 grid gap-4">
                <div className="inline-grid max-w-xl grid-cols-3 rounded-2xl border border-[#1c5c3f]/10 bg-white/80 p-1 shadow-sm">
                  {Object.entries(personas).map(([key, item]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setPersona(key)}
                      className={`rounded-xl px-3 py-3 text-sm font-black transition ${
                        persona === key ? "bg-[#1c5c3f] text-white shadow-md" : "text-[#1c5c3f] hover:bg-[#f4f8f3]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
                  {[
                    [Smartphone, "App iOS / Android", "Capacitor"],
                    [Video, selectedCourse.kind, selectedCourse.progress + "% avance"],
                    [SelectedModuleIcon, activeModule.title, activeModule.metric],
                  ].map(([Icon, label, note]) => (
                    <motion.div key={label} layout className="rounded-2xl border border-[#1c5c3f]/10 bg-white/80 p-4 shadow-sm">
                      <Icon className="mb-2 h-6 w-6 text-[#8ba63f]" />
                      <div className="text-sm font-bold text-[#1c5c3f]">{label}</div>
                      <div className="text-xs text-[#60746a]">{note}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.1 }}>
              <PhonePreview persona={persona} selectedCourse={selectedCourse} activeModule={activeModule} />
            </motion.div>
          </section>

          <section className="pt-16">
            <AdminDashboard
              selectedCourseIndex={selectedCourseIndex}
              setSelectedCourseIndex={setSelectedCourseIndex}
              activePrompt={activePrompt}
              setActivePrompt={setActivePrompt}
            />
          </section>

          <section className="pt-20">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-2 font-bold text-[#6b7f2b]">Módulos del MVP</div>
                <h2 className="text-3xl font-black text-[#1c5c3f] md:text-4xl">No es solo una app: es una plataforma operativa</h2>
              </div>
              <p className="max-w-xl text-[#3c594a]">Toca un módulo para verlo reflejado en el teléfono y entender cómo la WebApp conecta alumnos, profesores y administración.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_.72fr]">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {modules.map(({ icon: Icon, title, text }, index) => (
                  <motion.button
                    key={title}
                    type="button"
                    whileHover={{ y: -4 }}
                    onClick={() => setActiveModuleIndex(index)}
                    className={`rounded-3xl border p-5 text-left shadow-xl shadow-green-950/5 transition ${
                      activeModuleIndex === index
                        ? "border-[#8ba63f] bg-[#eef6ea]"
                        : "border-[#1c5c3f]/10 bg-white/85 hover:border-[#8ba63f]/50"
                    }`}
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1c5c3f] text-[#c7df6d]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-[#1c5c3f]">{title}</h3>
                    <p className="text-sm leading-relaxed text-[#3c594a]">{text}</p>
                  </motion.button>
                ))}
              </div>

              <motion.aside layout className="sticky top-6 h-fit rounded-[2rem] border border-[#1c5c3f]/10 bg-[#1c5c3f] p-6 text-white shadow-2xl shadow-green-950/20">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#cfe98a]">
                  <SelectedModuleIcon className="h-7 w-7" />
                </div>
                <div className="text-sm font-bold text-[#cfe98a]">Módulo seleccionado</div>
                <h3 className="mt-2 text-3xl font-black">{activeModule.title}</h3>
                <p className="mt-4 leading-relaxed text-green-50">{activeModule.text}</p>
                <div className="mt-5 rounded-2xl bg-white/10 p-4">
                  <div className="text-xs text-green-100">Impacto demo</div>
                  <div className="mt-1 text-xl font-black text-[#cfe98a]">{activeModule.metric}</div>
                </div>
              </motion.aside>
            </div>
          </section>

          <section className="grid gap-5 pt-20 lg:grid-cols-3">
            <motion.div whileHover={{ y: -4 }} className="rounded-[2rem] bg-[#1c5c3f] p-6 text-white shadow-xl shadow-green-950/20">
              <Video className="mb-4 h-8 w-8 text-[#cfe98a]" />
              <h3 className="mb-3 text-2xl font-black">UVB Online</h3>
              <p className="leading-relaxed text-green-50">Cursos digitales con videos, salones virtuales, materiales descargables, seguimiento de avance y apoyo de HeyGen para contenidos introductorios.</p>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} className="rounded-[2rem] border border-[#1c5c3f]/10 bg-white/85 p-6 shadow-xl shadow-green-950/5">
              <UserRoundCog className="mb-4 h-8 w-8 text-[#8ba63f]" />
              <h3 className="mb-3 text-2xl font-black text-[#1c5c3f]">Admin real</h3>
              <p className="leading-relaxed text-[#3c594a]">Alta de alumnos, profesores, perfiles, fotografías, documentos, cursos, materias, calendario, contratos y parametrización básica.</p>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} className="rounded-[2rem] border border-[#1c5c3f]/10 bg-white/85 p-6 shadow-xl shadow-green-950/5">
              <ShieldCheck className="mb-4 h-8 w-8 text-[#8ba63f]" />
              <h3 className="mb-3 text-2xl font-black text-[#1c5c3f]">Base escalable</h3>
              <p className="leading-relaxed text-[#3c594a]">Astro, React, GitHub, Vercel, Supabase, Hugging Face y Capacitor para reducir costo sin perder arquitectura moderna.</p>
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
}
