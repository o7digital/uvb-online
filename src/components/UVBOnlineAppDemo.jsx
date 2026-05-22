import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  Bot,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Cloud,
  CreditCard,
  DatabaseBackup,
  FileCheck2,
  FileSignature,
  GraduationCap,
  Laptop,
  MonitorPlay,
  PlayCircle,
  ReceiptText,
  Search,
  Send,
  Smartphone,
  TabletSmartphone,
  UserPlus,
  Users,
  Video,
  X,
} from "lucide-react";

const views = [
  { id: "alumno", label: "Alumno", icon: GraduationCap },
  { id: "admin", label: "Admin", icon: ClipboardList },
  { id: "profesor", label: "Profesor", icon: Users },
  { id: "online", label: "UVB Online", icon: MonitorPlay },
  { id: "app", label: "App movil", icon: Smartphone },
];

const metrics = [
  ["Alumnos activos", "1,248"],
  ["Cursos activos", "86"],
  ["Prospectos", "312"],
  ["Adeudos en seguimiento", "$184k"],
];

const studentCourses = [
  {
    name: "Marketing Digital",
    mode: "Online",
    progress: 72,
    teacher: "Mtra. Daniela Ramos",
    next: "Hoy 18:00",
  },
  {
    name: "Administracion de Empresas",
    mode: "Presencial",
    progress: 64,
    teacher: "Dr. Carlos Medina",
    next: "Lunes 10:00",
  },
  {
    name: "Contabilidad Basica",
    mode: "Hibrido",
    progress: 81,
    teacher: "Mtro. Luis Aguilar",
    next: "Viernes 12:00",
  },
];

const accountRows = [
  ["Colegiatura mayo", "$2,850", "Pendiente"],
  ["Inscripcion", "$1,200", "Pagado"],
  ["Curso online", "$950", "Pagado"],
];

const documents = [
  ["Contrato de inscripcion", "Aprobado"],
  ["Comprobante de domicilio", "Pendiente"],
  ["Identificacion", "Aprobado"],
  ["Historial academico", "Requiere revision"],
];

const adminModules = [
  ["Alumnos", Users],
  ["Prospectos", UserPlus],
  ["Profesores", GraduationCap],
  ["Cursos", BookOpen],
  ["Materias", ClipboardList],
  ["Pagos / Estado de cuenta", CreditCard],
  ["CFDI", ReceiptText],
  ["Documentos", FileCheck2],
  ["Contratos", FileSignature],
  ["Calendario", CalendarDays],
  ["Salones virtuales", Video],
  ["Backups", DatabaseBackup],
];

const adminStudents = [
  ["Maria Fernanda", "Reynosa", "Marketing Digital", "Pendiente $2,850", "72%", "Activa"],
  ["Carlos Rivera", "Tampico", "Administracion", "Pagado", "64%", "Activo"],
  ["Ana Torres", "Reynosa", "Contabilidad", "Pendiente $950", "81%", "Revision"],
];

const quickActions = [
  "Alta alumno",
  "Crear curso",
  "Subir contrato",
  "Programar clase",
  "Revisar CFDI",
  "Enviar comunicado",
];

const onlineCourses = [
  ["Marketing Digital", "Online", "Intermedio", "8 semanas", "Mtra. Daniela Ramos", 72],
  ["Administracion de Empresas", "Hibrido", "Inicial", "10 semanas", "Dr. Carlos Medina", 64],
  ["Contabilidad Basica", "Hibrido", "Inicial", "6 semanas", "Mtro. Luis Aguilar", 81],
  ["Ingles Profesional", "Online", "Intermedio", "12 semanas", "Mtra. Sofia Luna", 38],
  ["Finanzas para Emprendedores", "Online", "Avanzado", "5 semanas", "Mtro. Raul Santos", 52],
];

const aiResults = [
  "Administracion de Empresas",
  "Marketing Digital",
  "Contabilidad Basica",
  "Finanzas para Emprendedores",
];

const aiBadges = [
  "Recomendador de cursos",
  "Buscador inteligente",
  "Clasificacion de prospectos",
  "Seguimiento academico",
];

const mobileItems = [
  "Login UVB Online",
  "Mi cuenta",
  "Estado de cuenta",
  "Mis cursos",
  "Calendario",
  "Chat profesores",
  "Salon virtual",
  "Documentos",
];

const moduleChecklist = [
  "Intranet alumnos",
  "Estado de cuenta",
  "Avance academico",
  "Cursos fisicos",
  "Cursos en linea",
  "Salones virtuales",
  "Calendario de cursos",
  "Chat con profesores",
  "Documentos",
  "Contratos",
  "CFDI",
  "Almacenamiento",
  "Backups",
  "IA Hugging Face",
  "App iOS / Android con Capacitor",
];

function cls(...classes) {
  return classes.filter(Boolean).join(" ");
}

function StatusBadge({ status }) {
  const paid = status === "Pagado" || status === "Aprobado" || status === "Activa" || status === "Activo";
  const review = status.includes("Revision") || status.includes("revision");
  return (
    <span
      className={cls(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-bold",
        paid && "bg-[#e4f1dc] text-[#1c5c3f]",
        review && "bg-[#f1ecd7] text-[#6c5d19]",
        !paid && !review && "bg-[#f7eadf] text-[#8a4b18]",
      )}
    >
      {status}
    </span>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-[#dfe9da]">
      <motion.div
        className="h-full rounded-full bg-[#8ba63f]"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.45 }}
      />
    </div>
  );
}

function ProductCard({ children, className = "" }) {
  return (
    <div className={cls("rounded-2xl border border-[#1c5c3f]/10 bg-white p-5 shadow-sm shadow-green-950/5", className)}>
      {children}
    </div>
  );
}

function PhoneMockup({ activeView }) {
  const phoneContent = {
    alumno: {
      title: "Mi cuenta",
      subtitle: "Maria Fernanda Lopez",
      rows: ["Adeudo actual $2,850", "Avance academico 72%", "Proxima clase Hoy 18:00"],
      action: "Entrar al curso",
    },
    admin: {
      title: "Admin UVB",
      subtitle: "Pulso operativo",
      rows: ["312 prospectos", "18 CFDI por revisar", "Backups al dia"],
      action: "Ver dashboard",
    },
    profesor: {
      title: "Profesor",
      subtitle: "Mtra. Daniela Ramos",
      rows: ["28 alumnos inscritos", "4 mensajes pendientes", "Salon virtual 18:00"],
      action: "Abrir grupo",
    },
    online: {
      title: "UVB Online",
      subtitle: "Marketing Digital",
      rows: ["Video principal", "Material descargable", "Chat del curso"],
      action: "Continuar clase",
    },
    app: {
      title: "App movil",
      subtitle: "iOS / Android",
      rows: ["Login UVB Online", "Mis cursos", "Documentos"],
      action: "WebApp + Capacitor",
    },
  };
  const current = phoneContent[activeView];

  return (
    <div className="mx-auto w-[286px] rounded-[2.4rem] border border-white bg-[#123524] p-3 shadow-2xl shadow-green-950/25 sm:w-[318px]">
      <div className="min-h-[560px] overflow-hidden rounded-[1.9rem] bg-[#f4f8f3]">
        <div className="bg-[#1c5c3f] px-5 pb-5 pt-6 text-white">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-xs font-black text-[#1c5c3f]">UVB</div>
            <Bell className="h-5 w-5 text-[#d7eaa0]" />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              <div className="text-xs font-bold text-[#d7eaa0]">UVB Online</div>
              <div className="text-2xl font-black">{current.title}</div>
              <div className="mt-1 text-sm text-green-50">{current.subtitle}</div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="space-y-3 p-4">
          {current.rows.map((row) => (
            <div key={row} className="rounded-2xl border border-[#1c5c3f]/10 bg-white p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#8ba63f]" />
                <span className="text-sm font-bold text-[#123524]">{row}</span>
              </div>
            </div>
          ))}
          <div className="rounded-2xl bg-[#eaf2e4] p-4">
            <div className="mb-2 flex items-center justify-between text-xs font-bold text-[#1c5c3f]">
              <span>Avance</span>
              <span>{activeView === "admin" ? "86 cursos" : "72%"}</span>
            </div>
            <ProgressBar value={activeView === "admin" ? 86 : 72} />
          </div>
          <button className="w-full rounded-xl bg-[#8ba63f] px-4 py-3 text-sm font-black text-white">
            {current.action}
          </button>
        </div>
      </div>
    </div>
  );
}

function Hero({ activeView }) {
  return (
    <section className="grid gap-8 pb-8 pt-8 lg:grid-cols-[1fr_360px] lg:items-center lg:pt-12">
      <div>
        <div className="mb-4 inline-flex rounded-full border border-[#8ba63f]/35 bg-white px-4 py-2 text-sm font-bold text-[#1c5c3f]">
          Universidad fisica + educacion online + app movil
        </div>
        <h1 className="text-4xl font-black leading-tight text-[#1c5c3f] md:text-6xl">
          UVB Online
          <span className="block text-2xl font-black text-[#123524] md:text-4xl">Intranet academica + App movil iOS / Android</span>
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#3c594a]">
          Una plataforma digital para conectar alumnos, profesores y administracion: estado de cuenta, avance academico,
          cursos presenciales, cursos en linea, calendario, documentos, chat, IA y app movil.
        </p>
        <p className="mt-4 max-w-3xl text-sm font-bold text-[#1c5c3f]">
          El sitio actual presenta UVB. UVB Online permite operar la experiencia digital.
        </p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(([label, value]) => (
            <ProductCard key={label} className="p-4">
              <div className="text-xs font-bold uppercase tracking-wide text-[#6d7a6f]">{label}</div>
              <div className="mt-1 text-2xl font-black text-[#1c5c3f]">{value}</div>
            </ProductCard>
          ))}
        </div>
      </div>
      <PhoneMockup activeView={activeView} />
    </section>
  );
}

function StudentView({ setModal, setActiveView }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
      <ProductCard>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e4f1dc] text-2xl font-black text-[#1c5c3f]">MF</div>
          <div>
            <h2 className="text-xl font-black text-[#1c5c3f]">Maria Fernanda Lopez</h2>
            <p className="text-sm text-[#3c594a]">Campus Reynosa</p>
          </div>
        </div>
        <div className="mt-5 space-y-3 text-sm">
          <div><span className="font-bold text-[#1c5c3f]">Carrera:</span> Marketing Digital</div>
          <div><span className="font-bold text-[#1c5c3f]">Matricula:</span> UVB-2026-0184</div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[
            ["Avance academico", "72%"],
            ["Adeudo actual", "$2,850"],
            ["Cursos inscritos", "3"],
            ["Proxima clase", "Hoy 18:00"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-[#f4f8f3] p-3">
              <div className="text-xs text-[#60746a]">{label}</div>
              <div className="font-black text-[#1c5c3f]">{value}</div>
            </div>
          ))}
        </div>
      </ProductCard>

      <div className="grid gap-5">
        <ProductCard>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-black text-[#1c5c3f]">Estado de cuenta</h3>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setModal("cfdi")} className="rounded-xl bg-[#1c5c3f] px-4 py-2 text-sm font-bold text-white">Solicitar CFDI</button>
              <button className="rounded-xl border border-[#1c5c3f]/15 px-4 py-2 text-sm font-bold text-[#1c5c3f]">Ver historial</button>
              <button className="rounded-xl border border-[#1c5c3f]/15 px-4 py-2 text-sm font-bold text-[#1c5c3f]">Descargar recibo</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <tbody className="divide-y divide-[#1c5c3f]/10">
                {accountRows.map(([concept, amount, status]) => (
                  <tr key={concept}>
                    <td className="py-3 font-bold text-[#123524]">{concept}</td>
                    <td className="py-3 font-black text-[#1c5c3f]">{amount}</td>
                    <td className="py-3"><StatusBadge status={status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ProductCard>

        <div className="grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
          <ProductCard>
            <h3 className="mb-4 text-xl font-black text-[#1c5c3f]">Mis cursos</h3>
            <div className="grid gap-3">
              {studentCourses.map((course) => (
                <div key={course.name} className="rounded-2xl border border-[#1c5c3f]/10 bg-[#f8fbf5] p-4">
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="font-black text-[#1c5c3f]">{course.name}</h4>
                      <p className="text-sm text-[#60746a]">{course.mode} · {course.teacher}</p>
                    </div>
                    <span className="rounded-full bg-[#e4f1dc] px-3 py-1 text-xs font-black text-[#1c5c3f]">{course.progress}%</span>
                  </div>
                  <ProgressBar value={course.progress} />
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
                    <span className="text-[#3c594a]">Proxima sesion: {course.next}</span>
                    <button onClick={() => setActiveView("online")} className="rounded-xl bg-[#8ba63f] px-4 py-2 font-bold text-white">Entrar al curso</button>
                  </div>
                </div>
              ))}
            </div>
          </ProductCard>

          <ProductCard>
            <h3 className="mb-4 text-xl font-black text-[#1c5c3f]">Documentos</h3>
            <div className="space-y-3">
              {documents.map(([name, status]) => (
                <div key={name} className="rounded-xl bg-[#f4f8f3] p-3">
                  <div className="font-bold text-[#123524]">{name}</div>
                  <div className="mt-2"><StatusBadge status={status} /></div>
                </div>
              ))}
            </div>
          </ProductCard>
        </div>
      </div>
    </div>
  );
}

function AdminView() {
  return (
    <div className="grid gap-5 xl:grid-cols-[220px_1fr_260px]">
      <ProductCard>
        <h3 className="mb-4 text-lg font-black text-[#1c5c3f]">Modulos admin</h3>
        <div className="grid gap-2">
          {adminModules.map(([label, Icon]) => (
            <button key={label} className="flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold text-[#1c5c3f] hover:bg-[#f4f8f3]">
              <Icon className="h-4 w-4 text-[#8ba63f]" />
              {label}
            </button>
          ))}
        </div>
      </ProductCard>

      <ProductCard>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-[#1c5c3f]">Dashboard administrativo</h2>
            <p className="text-sm text-[#3c594a]">Una plataforma para alumnos, profesores y administracion.</p>
          </div>
          <Search className="h-5 w-5 text-[#8ba63f]" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-[#f4f8f3] text-xs uppercase text-[#60746a]">
              <tr>
                {["Alumno", "Campus", "Carrera", "Estado de cuenta", "Avance", "Estatus"].map((head) => (
                  <th key={head} className="px-3 py-3">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c5c3f]/10">
              {adminStudents.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={cell} className="px-3 py-4">
                      {index === 4 ? <div className="w-24"><ProgressBar value={Number.parseInt(cell, 10)} /></div> : index === 5 ? <StatusBadge status={cell} /> : <span className={index === 0 ? "font-black text-[#1c5c3f]" : ""}>{cell}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ProductCard>

      <ProductCard>
        <h3 className="mb-4 text-lg font-black text-[#1c5c3f]">Acciones rapidas</h3>
        <div className="grid gap-2">
          {quickActions.map((action) => (
            <button key={action} className="rounded-xl bg-[#f4f8f3] px-3 py-3 text-left text-sm font-bold text-[#1c5c3f] hover:bg-[#e4f1dc]">
              {action}
            </button>
          ))}
        </div>
      </ProductCard>
    </div>
  );
}

function TeacherView({ setModal }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_420px]">
      <div className="grid gap-5">
        <ProductCard>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-[#1c5c3f]">Mtra. Daniela Ramos</h2>
              <p className="font-bold text-[#123524]">Curso: Marketing Digital</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setModal("salon")} className="rounded-xl bg-[#1c5c3f] px-4 py-2 text-sm font-bold text-white">Abrir salon virtual</button>
              <button className="rounded-xl border border-[#1c5c3f]/15 px-4 py-2 text-sm font-bold text-[#1c5c3f]">Subir material</button>
              <button onClick={() => setSent(true)} className="rounded-xl bg-[#8ba63f] px-4 py-2 text-sm font-bold text-white">Enviar mensaje</button>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Alumnos inscritos", "28"],
              ["Proxima clase", "Hoy 18:00"],
              ["Materiales subidos", "6"],
              ["Mensajes pendientes", sent ? "3" : "4"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-[#f4f8f3] p-4">
                <div className="text-xs text-[#60746a]">{label}</div>
                <div className="text-xl font-black text-[#1c5c3f]">{value}</div>
              </div>
            ))}
          </div>
        </ProductCard>

        <ProductCard>
          <h3 className="mb-4 text-xl font-black text-[#1c5c3f]">Espacio profesor</h3>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {["Mis grupos", "Mis alumnos", "Calendario de clases", "Chat con alumnos", "Materiales del curso", "Salon virtual"].map((item) => (
              <div key={item} className="rounded-2xl border border-[#1c5c3f]/10 bg-[#f8fbf5] p-4 font-bold text-[#1c5c3f]">
                {item}
              </div>
            ))}
          </div>
        </ProductCard>
      </div>

      <ProductCard>
        <h3 className="mb-4 text-xl font-black text-[#1c5c3f]">Chat del grupo</h3>
        <div className="space-y-3">
          <div className="rounded-2xl bg-[#f4f8f3] p-3">
            <div className="text-xs font-bold text-[#60746a]">Alumno</div>
            <p className="text-sm">Maestra, donde subimos la actividad?</p>
          </div>
          <div className="ml-8 rounded-2xl bg-[#1c5c3f] p-3 text-white">
            <div className="text-xs font-bold text-[#d7eaa0]">Profesor</div>
            <p className="text-sm">La actividad se sube en la seccion de materiales antes del viernes.</p>
          </div>
          {sent && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="ml-8 rounded-2xl bg-[#8ba63f] p-3 text-white">
              <div className="text-xs font-bold">Profesor</div>
              <p className="text-sm">Mensaje enviado al grupo de Marketing Digital.</p>
            </motion.div>
          )}
        </div>
      </ProductCard>
    </div>
  );
}

function OnlineView({ setActiveView }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_430px]">
      <ProductCard>
        <h2 className="mb-4 text-2xl font-black text-[#1c5c3f]">Catalogo de cursos online</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {onlineCourses.map(([name, mode, level, duration, teacher, progress], index) => (
            <div key={name} className="rounded-2xl border border-[#1c5c3f]/10 bg-[#f8fbf5] p-4">
              <div className="mb-4 flex h-24 items-center justify-center rounded-xl bg-[#e4f1dc] text-[#1c5c3f]">
                {index % 2 === 0 ? <MonitorPlay className="h-9 w-9" /> : <Laptop className="h-9 w-9" />}
              </div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-black text-[#1c5c3f]">{name}</h3>
                <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-[#6b7f2b]">{mode}</span>
              </div>
              <p className="mt-2 text-sm text-[#3c594a]">{level} · {duration} · {teacher}</p>
              <div className="mt-3"><ProgressBar value={progress} /></div>
              <button onClick={() => name === "Marketing Digital" && setActiveView("online")} className="mt-4 rounded-xl bg-[#8ba63f] px-4 py-2 text-sm font-bold text-white">Ver curso</button>
            </div>
          ))}
        </div>
      </ProductCard>

      <ProductCard>
        <h2 className="text-2xl font-black text-[#1c5c3f]">Marketing Digital</h2>
        <p className="mt-1 text-sm text-[#3c594a]">Curso abierto · Online · Mtra. Daniela Ramos</p>
        <div className="mt-5 flex h-44 items-center justify-center rounded-2xl bg-[#1c5c3f] text-white">
          <div className="text-center">
            <PlayCircle className="mx-auto mb-2 h-12 w-12 text-[#d7eaa0]" />
            <div className="font-black">Video principal / clase online</div>
          </div>
        </div>
        <div className="mt-4 grid gap-3">
          {["Material descargable", "Proxima sesion: Hoy 18:00", "Avance del alumno: 72%", "Chat del curso", "Salon virtual"].map((item) => (
            <div key={item} className="rounded-xl bg-[#f4f8f3] p-3 text-sm font-bold text-[#1c5c3f]">{item}</div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-[#8ba63f]/30 bg-[#f4f8f3] p-4 text-sm text-[#3c594a]">
          Compatible con videos externos, salones virtuales y contenidos creados con herramientas como HeyGen.
        </div>
      </ProductCard>
    </div>
  );
}

function DeviceMockup({ platform }) {
  return (
    <div className="rounded-[2.2rem] border border-[#1c5c3f]/15 bg-[#123524] p-3 shadow-xl shadow-green-950/15">
      <div className="min-h-[480px] rounded-[1.7rem] bg-[#f4f8f3] p-4">
        <div className="mb-4 rounded-2xl bg-[#1c5c3f] p-4 text-white">
          <div className="text-xs text-[#d7eaa0]">{platform}</div>
          <div className="text-xl font-black">UVB Online</div>
        </div>
        <div className="space-y-2">
          {mobileItems.map((item) => (
            <div key={`${platform}-${item}`} className="rounded-xl bg-white p-3 text-sm font-bold text-[#1c5c3f] shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileAppView() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr_320px]">
      <DeviceMockup platform="iPhone / iOS" />
      <DeviceMockup platform="Android" />
      <ProductCard>
        <TabletSmartphone className="mb-4 h-9 w-9 text-[#8ba63f]" />
        <h2 className="text-2xl font-black text-[#1c5c3f]">App movil iOS / Android</h2>
        <p className="mt-3 leading-relaxed text-[#3c594a]">
          WebApp preparada para convertirse en app movil mediante Capacitor.
        </p>
        <p className="mt-4 rounded-2xl bg-[#f4f8f3] p-4 text-sm font-bold text-[#1c5c3f]">
          Intranet academica con estado de cuenta, avance, cursos y documentos.
        </p>
      </ProductCard>
    </div>
  );
}

function AiPanel() {
  return (
    <ProductCard className="bg-[#1c5c3f] text-white">
      <div className="grid gap-5 lg:grid-cols-[360px_1fr] lg:items-center">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <Bot className="h-7 w-7 text-[#d7eaa0]" />
            <h2 className="text-2xl font-black">Asistente academico IA</h2>
          </div>
          <div className="rounded-2xl bg-white/10 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm text-green-50">
              <Search className="h-4 w-4 text-[#d7eaa0]" />
              Quiero estudiar algo relacionado con empresas
            </div>
            <div className="space-y-2">
              {aiResults.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-bold">
                  <CheckCircle2 className="h-4 w-4 text-[#d7eaa0]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {aiBadges.map((badge) => (
            <span key={badge} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-green-50">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </ProductCard>
  );
}

function Modal({ modal, setModal }) {
  const copy = {
    cfdi: "Solicitud CFDI enviada a administracion.",
    salon: "Salon virtual programado: Marketing Digital · 18:00.",
  };

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-[#123524]/35 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setModal(null)}
        >
          <motion.div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            initial={{ scale: 0.96, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 10 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-[#8ba63f]">UVB Online</div>
                <h3 className="text-xl font-black text-[#1c5c3f]">{copy[modal]}</h3>
              </div>
              <button onClick={() => setModal(null)} className="rounded-xl bg-[#f4f8f3] p-2 text-[#1c5c3f]" aria-label="Cerrar modal">
                <X className="h-5 w-5" />
              </button>
            </div>
            <button onClick={() => setModal(null)} className="w-full rounded-xl bg-[#1c5c3f] px-4 py-3 text-sm font-bold text-white">
              Entendido
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function UVBOnlineAppDemo() {
  const [activeView, setActiveView] = useState("alumno");
  const [modal, setModal] = useState(null);

  const activeLabel = useMemo(() => views.find((view) => view.id === activeView)?.label ?? "Alumno", [activeView]);

  return (
    <div className="min-h-screen bg-[#f4f8f3] text-[#123524]">
      <header className="sticky top-0 z-40 border-b border-[#1c5c3f]/10 bg-[#f4f8f3]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1c5c3f] font-black text-white">UVB</div>
            <div>
              <div className="text-sm font-bold text-[#6b7f2b]">Demo interactiva</div>
              <div className="font-black text-[#1c5c3f]">UVB Online</div>
            </div>
          </div>
          <nav className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
            {views.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveView(id)}
                className={cls(
                  "flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition",
                  activeView === id ? "bg-[#1c5c3f] text-white shadow-lg shadow-green-950/15" : "bg-white text-[#1c5c3f] hover:bg-[#e4f1dc]",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <Hero activeView={activeView} />

        <section className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-bold text-[#6b7f2b]">Vista activa</div>
            <h2 className="text-3xl font-black text-[#1c5c3f]">{activeLabel}</h2>
          </div>
          <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#1c5c3f] shadow-sm">
            Producto real · sin recargar pagina
          </div>
        </section>

        <AnimatePresence mode="wait">
          <motion.section
            key={activeView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {activeView === "alumno" && <StudentView setModal={setModal} setActiveView={setActiveView} />}
            {activeView === "admin" && <AdminView />}
            {activeView === "profesor" && <TeacherView setModal={setModal} />}
            {activeView === "online" && <OnlineView setActiveView={setActiveView} />}
            {activeView === "app" && <MobileAppView />}
          </motion.section>
        </AnimatePresence>

        <section className="mt-6">
          <AiPanel />
        </section>

        <section className="mt-6">
          <ProductCard>
            <div className="mb-4 flex items-center gap-3">
              <Cloud className="h-6 w-6 text-[#8ba63f]" />
              <h2 className="text-2xl font-black text-[#1c5c3f]">Modulos visibles en la demo</h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {moduleChecklist.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-xl bg-[#f4f8f3] px-3 py-2 text-sm font-bold text-[#1c5c3f]">
                  <CheckCircle2 className="h-4 w-4 text-[#8ba63f]" />
                  {item}
                </div>
              ))}
            </div>
          </ProductCard>
        </section>
      </main>

      <button
        type="button"
        onClick={() => setModal("salon")}
        className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-[#8ba63f] px-5 py-3 text-sm font-black text-white shadow-xl shadow-green-950/20"
      >
        <Send className="h-4 w-4" />
        Abrir salon virtual
      </button>

      <Modal modal={modal} setModal={setModal} />
    </div>
  );
}
