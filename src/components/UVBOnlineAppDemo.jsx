import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Bot,
  CheckCircle2,
  ClipboardList,
  DatabaseBackup,
  Download,
  FileCheck2,
  FileSignature,
  GraduationCap,
  Menu,
  MonitorPlay,
  PlayCircle,
  Search,
  Smartphone,
  Users,
  X,
} from "lucide-react";

const views = [
  { id: "alumno", label: "Alumno", icon: GraduationCap },
  { id: "admin", label: "Admin", icon: ClipboardList },
  { id: "profesor", label: "Profesor", icon: Users },
  { id: "online", label: "UVB Online", icon: MonitorPlay },
  { id: "app", label: "App movil", icon: Smartphone },
];

const studentMenu = ["Mi cuenta", "Mis cursos", "Estado de cuenta", "Calendario", "Documentos", "Mensajes"];
const adminMenu = ["Dashboard", "Alumnos", "Profesores", "Prospectos", "Cursos", "Pagos", "CFDI", "Documentos", "Contratos", "Backups"];

const studentStats = [
  ["Avance academico", "72%"],
  ["Adeudo actual", "$2,850"],
  ["Cursos activos", "3"],
  ["Proxima clase", "Hoy 18:00"],
];

const accountRows = [
  ["Colegiatura mayo", "$2,850", "Pendiente"],
  ["Inscripcion", "$1,200", "Pagado"],
  ["Curso online", "$950", "Pagado"],
];

const studentCourses = [
  ["Marketing Digital", "Online", 72, "Mtra. Daniela Ramos"],
  ["Administracion de Empresas", "Presencial", 64, "Dr. Carlos Medina"],
  ["Contabilidad Basica", "Hibrido", 81, "Mtro. Luis Aguilar"],
];

const adminStats = [
  ["Alumnos activos", "1,248"],
  ["Prospectos", "312"],
  ["Cursos activos", "86"],
  ["Adeudos en seguimiento", "$184k"],
];

const adminStudents = [
  ["Maria Fernanda", "Reynosa", "Marketing Digital", "Pendiente $2,850", "72%", "Activa"],
  ["Carlos Rivera", "Tampico", "Administracion", "Pagado", "64%", "Activo"],
  ["Ana Torres", "Reynosa", "Contabilidad", "Pendiente $950", "81%", "Revision"],
];

const adminActions = ["Alta alumno", "Crear curso", "Subir contrato", "Programar clase", "Revisar CFDI", "Crear comunicado"];

const adminActionCopy = {
  "Alta alumno": "Formulario para registrar alumno, campus, carrera, documentos y estado inicial.",
  "Crear curso": "Panel para crear curso, modalidad, profesor asignado, calendario y materiales.",
  "Subir contrato": "Flujo para cargar contrato, asociarlo al expediente y marcar estatus.",
  "Programar clase": "Calendario para definir fecha, hora, profesor, grupo y salon virtual.",
  "Revisar CFDI": "Bandeja para validar datos fiscales y solicitudes de factura.",
  "Crear comunicado": "Editor para enviar avisos a alumnos, profesores o grupos especificos.",
};

const onlineCourses = [
  ["Marketing Digital", "Online", 72, "Mtra. Daniela Ramos", "Hoy 18:00"],
  ["Administracion de Empresas", "Hibrido", 64, "Dr. Carlos Medina", "Lunes 10:00"],
  ["Contabilidad Basica", "Hibrido", 81, "Mtro. Luis Aguilar", "Viernes 12:00"],
  ["Ingles Profesional", "Online", 38, "Mtra. Sofia Luna", "Martes 17:00"],
  ["Finanzas para Emprendedores", "Online", 52, "Mtro. Raul Santos", "Jueves 19:00"],
];

const aiResults = ["Administracion de Empresas", "Marketing Digital", "Contabilidad Basica", "Finanzas para Emprendedores"];
const aiBadges = ["Recomendador de cursos", "Buscador inteligente", "Clasificacion de prospectos", "Seguimiento academico"];

const initialChatMessages = [
  { from: "Alumno", text: "Maestra, donde subimos la actividad?" },
  { from: "Profesor", text: "La actividad se sube en materiales antes del viernes." },
];

function cls(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Panel({ children, className = "" }) {
  return <div className={cls("min-w-0 rounded-lg border border-[#1c5c3f]/10 bg-white p-4 shadow-sm sm:p-5", className)}>{children}</div>;
}

function ProgressBar({ value }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-[#dfe9da]">
      <motion.div className="h-full rounded-full bg-[#8ba63f]" initial={{ width: 0 }} animate={{ width: `${value}%` }} />
    </div>
  );
}

function StatusBadge({ status }) {
  const ok = ["Pagado", "Activa", "Activo", "Aprobado"].includes(status);
  const review = status === "Revision" || status === "Requiere revision";
  return (
    <span
      className={cls(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-black",
        ok && "bg-[#e4f1dc] text-[#1c5c3f]",
        review && "bg-[#f1ecd7] text-[#6c5d19]",
        !ok && !review && "bg-[#f7eadf] text-[#8a4b18]",
      )}
    >
      {status}
    </span>
  );
}

function Sidebar({ title, items, activeItem, onSelect }) {
  return (
    <Panel className="p-3">
      <div className="px-3 py-2 text-xs font-black uppercase tracking-wide text-[#6b7f2b]">{title}</div>
      <div className="flex min-w-0 gap-2 overflow-x-auto lg:block lg:space-y-1">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            className={cls(
              "flex shrink-0 items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-bold xl:w-full",
              "lg:w-full",
              activeItem === item ? "bg-[#1c5c3f] text-white" : "text-[#1c5c3f] hover:bg-[#f4f8f3]",
            )}
          >
            {item}
            {activeItem === item && <CheckCircle2 className="h-4 w-4 text-[#d7eaa0]" />}
          </button>
        ))}
      </div>
    </Panel>
  );
}

function InfoGrid({ items }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map(([title, detail, status]) => (
        <div key={title} className="rounded-lg border border-[#1c5c3f]/10 bg-[#f8fbf5] p-4">
          <div className="font-black text-[#1c5c3f]">{title}</div>
          <div className="mt-1 text-sm text-[#3c594a]">{detail}</div>
          {status && <div className="mt-3"><StatusBadge status={status} /></div>}
        </div>
      ))}
    </div>
  );
}

function AiAssistant({ compact = false }) {
  return (
    <Panel className={cls("bg-[#1c5c3f] text-white", compact && "p-4")}>
      <div className="mb-3 flex items-center gap-2">
        <Bot className="h-5 w-5 text-[#d7eaa0]" />
        <h3 className="font-black">Asistente academico UVB</h3>
      </div>
      <div className="rounded-2xl bg-white/10 p-3">
        <div className="mb-3 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#123524]">
          <Search className="h-4 w-4 text-[#8ba63f]" />
          Quiero estudiar algo relacionado con empresas
        </div>
        <p className="mb-2 text-sm text-green-50">Te recomendamos revisar estos programas:</p>
        <div className="space-y-2">
          {aiResults.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm font-bold">
              <CheckCircle2 className="h-4 w-4 text-[#d7eaa0]" />
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {aiBadges.map((badge) => (
          <span key={badge} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-green-50">{badge}</span>
        ))}
      </div>
    </Panel>
  );
}

function StudentView({ setActiveView, setModal, setSelectedCourse }) {
  const [studentSection, setStudentSection] = useState("Mi cuenta");
  return (
    <div className="grid gap-4 lg:grid-cols-[200px_1fr] xl:grid-cols-[220px_1fr_300px] xl:gap-5">
      <Sidebar title="Alumno" items={studentMenu} activeItem={studentSection} onSelect={setStudentSection} />

      <div className="min-w-0 space-y-4 xl:space-y-5">
        <Panel>
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#e4f1dc] text-xl font-black text-[#1c5c3f] sm:h-16 sm:w-16 sm:text-2xl">MF</div>
              <div className="min-w-0">
                <h2 className="truncate text-xl font-black text-[#1c5c3f] sm:text-2xl">Maria Fernanda Lopez</h2>
                <p className="line-clamp-2 text-xs font-bold text-[#3c594a] sm:text-sm">Matricula UVB-2026-0184 · Campus Reynosa · Marketing Digital</p>
              </div>
            </div>
            <Bell className="h-5 w-5 shrink-0 text-[#8ba63f]" />
          </div>
        </Panel>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {studentStats.map(([label, value]) => (
            <Panel key={label} className="p-4">
              <div className="text-xs font-bold uppercase text-[#60746a]">{label}</div>
              <div className="mt-1 text-2xl font-black text-[#1c5c3f]">{value}</div>
            </Panel>
          ))}
        </div>

        {studentSection === "Mi cuenta" && (
          <Panel>
            <h3 className="mb-4 text-xl font-black text-[#1c5c3f]">Mi cuenta</h3>
            <InfoGrid items={[
              ["Datos personales", "Maria Fernanda Lopez · UVB-2026-0184", "Activa"],
              ["Campus", "Reynosa · Marketing Digital", "Pagado"],
              ["Contacto", "maria.lopez@uvb.mx · +52 899 123 4567", "Aprobado"],
            ]} />
          </Panel>
        )}

        {studentSection === "Estado de cuenta" && (
          <Panel>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-black text-[#1c5c3f]">Estado de cuenta</h3>
              <div className="grid w-full gap-2 sm:w-auto sm:grid-flow-col">
                <button onClick={() => setModal({ title: "Solicitud CFDI enviada", text: "Solicitud CFDI enviada a administracion.", type: "success" })} className="rounded-lg bg-[#1c5c3f] px-4 py-2 text-sm font-bold text-white">Solicitar CFDI</button>
                <button onClick={() => setModal({ title: "Recibo generado", text: "Recibo generado para descarga.", type: "info" })} className="rounded-lg border border-[#1c5c3f]/15 px-4 py-2 text-sm font-bold text-[#1c5c3f]">Descargar recibo</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <tbody className="divide-y divide-[#1c5c3f]/10">
                  {accountRows.map(([concept, amount, status]) => (
                    <tr key={concept}>
                      <td className="py-3 font-bold">{concept}</td>
                      <td className="py-3 font-black text-[#1c5c3f]">{amount}</td>
                      <td className="py-3"><StatusBadge status={status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        )}

        {(studentSection === "Mi cuenta" || studentSection === "Mis cursos") && <Panel>
          <h3 className="mb-4 text-xl font-black text-[#1c5c3f]">Mis cursos</h3>
          <div className="grid gap-3 lg:grid-cols-3">
            {studentCourses.map(([name, mode, progress, teacher]) => (
              <div key={name} className="rounded-2xl border border-[#1c5c3f]/10 bg-[#f8fbf5] p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-black text-[#1c5c3f]">{name}</h4>
                    <p className="text-xs font-bold text-[#60746a]">{mode} · {teacher}</p>
                  </div>
                  <span className="text-sm font-black text-[#6b7f2b]">{progress}%</span>
                </div>
                <ProgressBar value={progress} />
                <button
                  onClick={() => {
                    setSelectedCourse(name);
                    setActiveView("online");
                  }}
                  className="mt-4 w-full rounded-xl bg-[#8ba63f] px-4 py-2 text-sm font-bold text-white"
                >
                  Entrar al curso
                </button>
              </div>
            ))}
          </div>
        </Panel>}

        {studentSection === "Calendario" && <Panel><h3 className="mb-4 text-xl font-black text-[#1c5c3f]">Calendario</h3><InfoGrid items={[["Hoy 18:00", "Marketing Digital · Salon virtual", "Activo"], ["Viernes 12:00", "Contabilidad Basica · Aula B", "Aprobado"], ["Lunes 10:00", "Administracion de Empresas · Campus Reynosa", "Aprobado"]]} /></Panel>}
        {studentSection === "Documentos" && <Panel><h3 className="mb-4 text-xl font-black text-[#1c5c3f]">Documentos</h3><InfoGrid items={[["Contrato academico", "Firmado y archivado", "Aprobado"], ["Identificacion", "Documento validado", "Aprobado"], ["Comprobante domicilio", "En revision por administracion", "Revision"]]} /></Panel>}
        {studentSection === "Mensajes" && <Panel><h3 className="mb-4 text-xl font-black text-[#1c5c3f]">Mensajes</h3><InfoGrid items={[["Nuevo material disponible", "Marketing Digital · Modulo 2", "Aprobado"], ["Pago pendiente", "Colegiatura mayo requiere seguimiento", "Pendiente"], ["Documento en revision", "Comprobante domicilio", "Revision"]]} /></Panel>}
      </div>

      <div className="space-y-4 lg:col-span-2 xl:col-span-1 xl:space-y-5">
        <Panel>
          <h3 className="mb-3 font-black text-[#1c5c3f]">Proxima clase</h3>
          <div className="rounded-2xl bg-[#f4f8f3] p-4">
            <div className="font-black text-[#123524]">Marketing Digital</div>
            <div className="text-sm text-[#3c594a]">Hoy 18:00 · Salon virtual</div>
          </div>
        </Panel>
        <Panel>
          <h3 className="mb-3 font-black text-[#1c5c3f]">Mensajes y alertas</h3>
          <div className="space-y-3 text-sm">
            <div className="rounded-xl bg-[#f4f8f3] p-3 font-bold">Nuevo material disponible</div>
            <div className="rounded-xl bg-[#f7eadf] p-3 font-bold text-[#8a4b18]">Colegiatura mayo pendiente</div>
            <div className="rounded-xl bg-[#f4f8f3] p-3 font-bold">Documento en revision</div>
          </div>
        </Panel>
        <AiAssistant compact />
      </div>
    </div>
  );
}

function AdminView() {
  const [adminSection, setAdminSection] = useState("Dashboard");
  const [adminAction, setAdminAction] = useState("Alta alumno");
  const adminCatalog = {
    Alumnos: [["Maria Fernanda", "Marketing Digital · Reynosa", "Activa"], ["Carlos Rivera", "Administracion · Tampico", "Activo"], ["Ana Torres", "Contabilidad · Reynosa", "Revision"]],
    Profesores: [["Mtra. Daniela Ramos", "Marketing Digital · 28 alumnos", "Activo"], ["Dr. Carlos Medina", "Administracion · 21 alumnos", "Activo"], ["Mtro. Luis Aguilar", "Contabilidad · 18 alumnos", "Activo"]],
    Prospectos: [["Laura Garcia", "Interes: Marketing Digital", "Pendiente"], ["Jorge Salinas", "Interes: Empresas", "Revision"], ["Paola Ruiz", "Interes: Finanzas", "Pendiente"]],
    Cursos: [["Marketing Digital", "Online · Mtra. Daniela Ramos", "Activo"], ["Administracion", "Presencial · Dr. Carlos Medina", "Activo"], ["Contabilidad Basica", "Hibrido · Mtro. Luis Aguilar", "Activo"]],
    Pagos: [["Colegiatura mayo", "$2,850 · Maria Fernanda", "Pendiente"], ["Inscripcion", "$1,200 · Carlos Rivera", "Pagado"], ["Curso online", "$950 · Ana Torres", "Pagado"]],
    CFDI: [["Maria Fernanda", "Solicitud de factura · mayo", "Pendiente"], ["Carlos Rivera", "CFDI emitido", "Aprobado"], ["Ana Torres", "Datos fiscales en revision", "Revision"]],
    Documentos: [["Identificaciones", "214 archivos validados", "Aprobado"], ["Comprobantes", "32 en revision", "Revision"], ["Expedientes", "96 completos", "Aprobado"]],
    Contratos: [["Contrato Maria Fernanda", "Firmado digitalmente", "Aprobado"], ["Contrato Carlos Rivera", "Pendiente de firma", "Pendiente"], ["Contrato Ana Torres", "Revision legal", "Revision"]],
    Backups: [["Respaldo diario", "Base academica y documentos", "Aprobado"], ["Ultimo backup", "Hoy 02:00", "Aprobado"], ["Retencion", "30 dias", "Activo"]],
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[200px_1fr] xl:grid-cols-[220px_1fr_280px] xl:gap-5">
      <Sidebar title="Admin" items={adminMenu} activeItem={adminSection} onSelect={setAdminSection} />

      <div className="min-w-0 space-y-4 xl:space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {adminStats.map(([label, value]) => (
            <Panel key={label} className="p-4">
              <div className="text-xs font-bold uppercase text-[#60746a]">{label}</div>
              <div className="mt-1 text-2xl font-black text-[#1c5c3f]">{value}</div>
            </Panel>
          ))}
        </div>

        {adminSection === "Dashboard" ? <Panel>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-[#1c5c3f]">Dashboard administrativo</h2>
              <p className="text-sm text-[#3c594a]">Operaciones academicas, pagos, documentos y cursos.</p>
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
        </Panel> : <Panel>
          <h2 className="mb-4 text-2xl font-black text-[#1c5c3f]">{adminSection}</h2>
          <InfoGrid items={adminCatalog[adminSection] ?? []} />
        </Panel>}

        <Panel>
          <h3 className="mb-4 text-xl font-black text-[#1c5c3f]">Documentos, contratos y respaldos</h3>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["Contratos", FileSignature, "96 expedientes"],
              ["Documentos", FileCheck2, "214 archivos"],
              ["Backups", DatabaseBackup, "Respaldo diario"],
            ].map(([label, Icon, note]) => (
              <div key={label} className="rounded-2xl bg-[#f4f8f3] p-4">
                <Icon className="mb-3 h-6 w-6 text-[#8ba63f]" />
                <div className="font-black text-[#1c5c3f]">{label}</div>
                <div className="text-sm text-[#3c594a]">{note}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="space-y-4 lg:col-span-2 xl:col-span-1 xl:space-y-5">
        <Panel>
          <h3 className="mb-4 font-black text-[#1c5c3f]">Acciones rapidas</h3>
          <div className="grid gap-2">
            {adminActions.map((action) => (
              <button
                key={action}
                onClick={() => setAdminAction(action)}
                className={cls("rounded-xl px-3 py-3 text-left text-sm font-bold", adminAction === action ? "bg-[#1c5c3f] text-white" : "bg-[#f4f8f3] text-[#1c5c3f] hover:bg-[#e4f1dc]")}
              >
                {action}
              </button>
            ))}
          </div>
        </Panel>
        <Panel>
          <h3 className="mb-2 font-black text-[#1c5c3f]">{adminAction}</h3>
          <p className="text-sm leading-relaxed text-[#3c594a]">{adminActionCopy[adminAction]}</p>
          <div className="mt-4 grid gap-2">
            {adminAction === "Alta alumno" && ["Nombre completo", "Campus", "Carrera", "Documentos"].map((item) => <div key={item} className="rounded-lg bg-[#f4f8f3] px-3 py-2 text-sm font-bold text-[#1c5c3f]">{item}</div>)}
            {adminAction !== "Alta alumno" && ["Configuracion", "Responsable", "Fecha limite"].map((item) => <div key={item} className="rounded-lg bg-[#f4f8f3] px-3 py-2 text-sm font-bold text-[#1c5c3f]">{item}</div>)}
          </div>
        </Panel>
        <AiAssistant compact />
      </div>
    </div>
  );
}

function TeacherView({ setModal, chatMessages, setChatMessages }) {
  const pendingMessages = Math.max(0, 6 - chatMessages.length);
  const [teacherModule, setTeacherModule] = useState("Mis grupos");
  const teacherContent = {
    "Mis grupos": [["Marketing Digital A", "28 alumnos · Reynosa", "Activo"], ["Marketing Digital B", "19 alumnos · Online", "Activo"], ["Emprendedores", "14 alumnos · Online", "Revision"]],
    "Calendario de clases": [["Hoy 18:00", "Marketing Digital A · Salon virtual", "Activo"], ["Jueves 17:00", "Finanzas · Online", "Aprobado"], ["Viernes 12:00", "Revision de actividad", "Aprobado"]],
    Materiales: [["Video modulo 2", "Publicado para alumnos", "Aprobado"], ["Rubrica actividad", "PDF disponible", "Aprobado"], ["Plantilla campana", "Archivo editable", "Aprobado"]],
    "Chat con alumnos": [["Maria Fernanda", "Pregunta sobre actividad", "Pendiente"], ["Carlos Rivera", "Confirmacion de entrega", "Aprobado"], ["Grupo A", "Aviso enviado", "Activo"]],
    "Salon virtual": [["Marketing Digital", "Sala abierta hoy 18:00", "Activo"], ["Grabacion clase 1", "Disponible", "Aprobado"], ["Asistencia", "24 de 28 confirmados", "Revision"]],
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <Panel>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-[#1c5c3f]">Mtra. Daniela Ramos</h2>
              <p className="font-bold text-[#123524]">Curso Marketing Digital · Campus Reynosa / Online</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setModal({ title: "Salon virtual", text: "Salon virtual programado: Marketing Digital · Hoy 18:00.", type: "success" })}
                className="rounded-xl bg-[#1c5c3f] px-4 py-2 text-sm font-bold text-white"
              >
                Abrir salon virtual
              </button>
              <button
                onClick={() => setModal({ title: "Material agregado", text: "En una version real, el profesor podria subir PDFs, videos o enlaces.", type: "info" })}
                className="rounded-xl border border-[#1c5c3f]/15 px-4 py-2 text-sm font-bold text-[#1c5c3f]"
              >
                Subir material
              </button>
              <button
                onClick={() => setChatMessages((messages) => [...messages, { from: "Profesor", text: "Gracias, revisamos la actividad en la proxima clase." }])}
                className="rounded-xl bg-[#8ba63f] px-4 py-2 text-sm font-bold text-white"
              >
                Enviar mensaje
              </button>
            </div>
          </div>
        </Panel>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Alumnos inscritos", "28"],
            ["Mensajes pendientes", String(pendingMessages)],
            ["Materiales subidos", "6"],
            ["Proxima clase", "Hoy 18:00"],
          ].map(([label, value]) => (
            <Panel key={label} className="p-4">
              <div className="text-xs font-bold uppercase text-[#60746a]">{label}</div>
              <div className="mt-1 text-2xl font-black text-[#1c5c3f]">{value}</div>
            </Panel>
          ))}
        </div>

        <Panel>
          <h3 className="mb-4 text-xl font-black text-[#1c5c3f]">Modulos profesor</h3>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {["Mis grupos", "Calendario de clases", "Materiales", "Chat con alumnos", "Salon virtual"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTeacherModule(item)}
                className={cls("rounded-2xl border border-[#1c5c3f]/10 p-4 text-left font-bold", teacherModule === item ? "bg-[#1c5c3f] text-white" : "bg-[#f8fbf5] text-[#1c5c3f] hover:bg-[#e4f1dc]")}
              >
                {item}
              </button>
            ))}
          </div>
        </Panel>

        <Panel>
          <h3 className="mb-4 text-xl font-black text-[#1c5c3f]">{teacherModule}</h3>
          <InfoGrid items={teacherContent[teacherModule]} />
        </Panel>
      </div>

      <Panel>
        <h3 className="mb-4 text-xl font-black text-[#1c5c3f]">Chat con alumnos</h3>
        <div className="space-y-3">
          {chatMessages.map((message, index) => (
            <motion.div
              key={`${message.from}-${message.text}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cls(
                "rounded-2xl p-3",
                message.from === "Profesor" ? "ml-8 bg-[#1c5c3f] text-white" : "bg-[#f4f8f3]",
              )}
            >
              <div className={cls("text-xs font-bold", message.from === "Profesor" ? "text-[#d7eaa0]" : "text-[#60746a]")}>{message.from}</div>
              <p className="text-sm">{message.text}</p>
            </motion.div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function OnlineView({ selectedCourse, setSelectedCourse, setModal }) {
  const selected = onlineCourses.find(([name]) => name === selectedCourse) ?? onlineCourses[0];
  const [name, mode, progress, teacher, nextSession] = selected;

  return (
    <div className="grid gap-4 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr_300px] xl:gap-5">
      <Panel className="p-3">
        <div className="px-3 py-2 text-xs font-black uppercase tracking-wide text-[#6b7f2b]">Catalogo online</div>
        <div className="flex gap-2 overflow-x-auto lg:block lg:space-y-2">
          {onlineCourses.map(([courseName, courseMode, courseProgress]) => (
            <button
              key={courseName}
              type="button"
              onClick={() => setSelectedCourse(courseName)}
              className={cls("w-52 shrink-0 rounded-lg p-3 text-left lg:w-full", selectedCourse === courseName ? "bg-[#1c5c3f] text-white" : "bg-[#f4f8f3] text-[#1c5c3f] hover:bg-[#e4f1dc]")}
            >
              <div className="font-black">{courseName}</div>
              <div className={cls("text-xs font-bold", selectedCourse === courseName ? "text-[#d7eaa0]" : "text-[#60746a]")}>{courseMode} · {courseProgress}%</div>
            </button>
          ))}
        </div>
      </Panel>

      <Panel className="min-w-0">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-[#1c5c3f]">{name}</h2>
            <p className="text-sm font-bold text-[#3c594a]">Profesor asignado: {teacher} · {mode}</p>
          </div>
          <span className="rounded-full bg-[#e4f1dc] px-3 py-1 text-sm font-black text-[#1c5c3f]">Avance {progress}%</span>
        </div>
        <div className="flex min-h-56 items-center justify-center rounded-lg bg-[#1c5c3f] p-4 text-white sm:h-72">
          <div className="text-center">
            <PlayCircle className="mx-auto mb-3 h-14 w-14 text-[#d7eaa0]" />
            <div className="text-xl font-black">Video principal / clase online</div>
            <div className="mt-1 text-sm text-green-50">{name}</div>
            <button
              type="button"
              onClick={() => setModal({ title: "Clase lista", text: `Reproduciendo clase online de ${name}.`, type: "success" })}
              className="mt-4 rounded-xl bg-[#8ba63f] px-5 py-2 text-sm font-black text-white"
            >
              Reproducir clase
            </button>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[`Proxima sesion: ${nextSession}`, "Salon virtual activo", "Chat del curso"].map((item) => (
            <div key={item} className="rounded-xl bg-[#f4f8f3] p-3 text-sm font-bold text-[#1c5c3f]">{item}</div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setModal({ title: "Salon virtual", text: `Salon virtual programado: ${name} · ${nextSession}.`, type: "success" })}
            className="rounded-xl bg-[#1c5c3f] px-4 py-2 text-sm font-bold text-white"
          >
            Abrir salon virtual
          </button>
          <button
            type="button"
            onClick={() => setModal({ title: "Materiales del curso", text: `Materiales disponibles para ${name}: guia, plantilla y rubrica.`, type: "info" })}
            className="rounded-xl border border-[#1c5c3f]/15 px-4 py-2 text-sm font-bold text-[#1c5c3f]"
          >
            Ver materiales
          </button>
        </div>
        <div className="mt-5 rounded-2xl border border-[#8ba63f]/30 bg-[#f4f8f3] p-4 text-sm font-bold text-[#3c594a]">
          Contenido compatible con videos externos, salones virtuales y materiales generados con herramientas como HeyGen.
        </div>
      </Panel>

      <div className="space-y-4 lg:col-span-2 xl:col-span-1 xl:space-y-5">
        <Panel>
          <h3 className="mb-4 font-black text-[#1c5c3f]">Materiales descargables</h3>
          <div className="space-y-2">
            {["Guia modulo 1.pdf", "Plantilla campana.xlsx", "Rubrica actividad.pdf"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setModal({ title: "Material descargable", text: `${item} estaria disponible para descarga en la version real.`, type: "info" })}
                className="flex w-full items-center gap-2 rounded-xl bg-[#f4f8f3] px-3 py-3 text-left text-sm font-bold text-[#1c5c3f]"
              >
                <Download className="h-4 w-4 text-[#8ba63f]" />
                {item}
              </button>
            ))}
          </div>
        </Panel>
        <Panel>
          <h3 className="mb-3 font-black text-[#1c5c3f]">Chat del curso</h3>
          <div className="rounded-2xl bg-[#f4f8f3] p-3 text-sm">Actividad abierta hasta viernes.</div>
        </Panel>
        <AiAssistant compact />
      </div>
    </div>
  );
}

function PhoneScreen({ platform, screen }) {
  const rows = {
    "Login UVB Online": ["Matricula", "Contrasena", "Entrar"],
    "Mi cuenta": ["Maria Fernanda", "Campus Reynosa", "Marketing Digital"],
    "Estado de cuenta": ["Colegiatura mayo", "$2,850", "Solicitar CFDI"],
    "Mis cursos": ["Marketing Digital", "Administracion", "Contabilidad"],
    "Calendario / Salon virtual": ["Hoy 18:00", "Marketing Digital", "Abrir salon"],
  };

  return (
    <div className="rounded-[2.2rem] border border-[#1c5c3f]/15 bg-[#123524] p-3 shadow-xl">
      <div className="min-h-[520px] rounded-[1.7rem] bg-[#f4f8f3] p-4">
        <div className="mb-4 rounded-2xl bg-[#1c5c3f] p-4 text-white">
          <div className="text-xs text-[#d7eaa0]">{platform}</div>
          <div className="text-xl font-black">{screen}</div>
        </div>
        <div className="space-y-2">
          {rows[screen].map((row) => (
            <div key={`${platform}-${screen}-${row}`} className="rounded-xl bg-white p-3 text-sm font-bold text-[#1c5c3f] shadow-sm">{row}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileAppView({ mobileScreen, setMobileScreen }) {
  const screens = ["Login UVB Online", "Mi cuenta", "Estado de cuenta", "Mis cursos", "Calendario / Salon virtual"];

  return (
    <div className="grid gap-4 lg:grid-cols-[220px_1fr_1fr] xl:grid-cols-[220px_1fr_1fr_320px] xl:gap-5">
      <Panel className="p-3">
        <div className="px-3 py-2 text-xs font-black uppercase tracking-wide text-[#6b7f2b]">Pantallas</div>
        <div className="flex gap-2 overflow-x-auto lg:block lg:space-y-2">
          {screens.map((item) => (
            <button
              key={item}
              onClick={() => setMobileScreen(item)}
              className={cls("w-44 shrink-0 rounded-lg px-3 py-3 text-left text-sm font-bold lg:w-full", mobileScreen === item ? "bg-[#1c5c3f] text-white" : "bg-[#f4f8f3] text-[#1c5c3f]")}
            >
              {item}
            </button>
          ))}
        </div>
      </Panel>
      <PhoneScreen platform="iOS" screen={mobileScreen} />
      <PhoneScreen platform="Android" screen={mobileScreen} />
      <Panel className="lg:col-span-3 xl:col-span-1">
        <Smartphone className="mb-4 h-8 w-8 text-[#8ba63f]" />
        <h2 className="text-2xl font-black text-[#1c5c3f]">App movil iOS / Android</h2>
        <p className="mt-3 text-sm leading-relaxed text-[#3c594a]">
          La WebApp puede convertirse en app movil iOS y Android mediante Capacitor, evitando desarrollar dos apps nativas separadas desde cero.
        </p>
        <div className="mt-5 space-y-2">
          {["Login", "Mi cuenta", "Estado de cuenta", "Mis cursos", "Calendario", "Salon virtual"].map((item) => (
            <div key={item} className="rounded-xl bg-[#f4f8f3] px-3 py-2 text-sm font-bold text-[#1c5c3f]">{item}</div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function Modal({ modal, setModal }) {
  return (
    <AnimatePresence>
      {modal && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-[#123524]/35 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(null)}>
          <motion.div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl" initial={{ scale: 0.96, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 10 }} onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className={cls("mb-2 inline-flex rounded-full px-3 py-1 text-xs font-black", modal.type === "success" ? "bg-[#e4f1dc] text-[#1c5c3f]" : "bg-[#f4f8f3] text-[#6b7f2b]")}>
                  UVB Online
                </div>
                <h3 className="text-xl font-black text-[#1c5c3f]">{modal.title}</h3>
              </div>
              <button onClick={() => setModal(null)} className="rounded-xl bg-[#f4f8f3] p-2 text-[#1c5c3f]" aria-label="Cerrar modal">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-5 leading-relaxed text-[#3c594a]">{modal.text}</p>
            <button onClick={() => setModal(null)} className="w-full rounded-xl bg-[#1c5c3f] px-4 py-3 text-sm font-bold text-white">Cerrar</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function UVBOnlineAppDemo() {
  const [activeView, setActiveView] = useState("alumno");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("Marketing Digital");
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [mobileScreen, setMobileScreen] = useState("Mi cuenta");

  const activeLabel = useMemo(() => views.find((view) => view.id === activeView)?.label ?? "Alumno", [activeView]);
  const selectView = (id) => {
    setActiveView(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f8f3] text-[#123524]">
      <header className="sticky top-0 z-40 border-b border-[#1c5c3f]/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1c5c3f] font-black text-white">UVB</div>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-[#6b7f2b]">El sitio actual presenta UVB. UVB Online permite operar la experiencia digital.</div>
              <div className="font-black text-[#1c5c3f]">UVB Online · {activeLabel}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-lg bg-[#1c5c3f] p-3 text-white lg:hidden"
            aria-expanded={mobileMenuOpen}
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <nav className="hidden gap-2 lg:flex">
            {views.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                data-view={id}
                onClick={() => selectView(id)}
                className={cls(
                  "flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition",
                  activeView === id ? "bg-[#1c5c3f] text-white shadow-lg shadow-green-950/15" : "bg-[#f4f8f3] text-[#1c5c3f] hover:bg-[#e4f1dc]",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-[#1c5c3f]/10 bg-white px-4 pb-4 lg:hidden"
            >
              <div className="grid gap-2 pt-3">
                {views.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => selectView(id)}
                    className={cls(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-black",
                      activeView === id ? "bg-[#1c5c3f] text-white" : "bg-[#f4f8f3] text-[#1c5c3f]",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-5">
        <AnimatePresence mode="wait">
          <motion.section key={activeView} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22 }}>
            {activeView === "alumno" && <StudentView setActiveView={setActiveView} setModal={setModal} setSelectedCourse={setSelectedCourse} />}
            {activeView === "admin" && <AdminView setModal={setModal} />}
            {activeView === "profesor" && <TeacherView setModal={setModal} chatMessages={chatMessages} setChatMessages={setChatMessages} />}
            {activeView === "online" && <OnlineView selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} setModal={setModal} />}
            {activeView === "app" && <MobileAppView mobileScreen={mobileScreen} setMobileScreen={setMobileScreen} />}
          </motion.section>
        </AnimatePresence>
      </main>

      <Modal modal={modal} setModal={setModal} />
    </div>
  );
}
