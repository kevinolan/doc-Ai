 "use client";

import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, Bot, Building2, CalendarCheck,
  CalendarDays, Check, ChevronDown, CircleAlert, Clock3, HeartPulse, LayoutDashboard,
  Menu, Plus, Search, Send, Sparkles, Stethoscope, Users, X,
} from "lucide-react";

type AppointmentStatus = "Confirmed" | "Pending" | "Checked in";
type Appointment = {
  id: string; patient: string; initials: string; doctor: string; department: string;
  time: string; date: string; status: AppointmentStatus; color: string;
};

const initialAppointments: Appointment[] = [
  { id: "APT-1042", patient: "Sarah Namusoke", initials: "SN", doctor: "Dr. James Okello", department: "Cardiology", time: "08:30 AM", date: "Today", status: "Checked in", color: "violet" },
  { id: "APT-1043", patient: "Daniel Kato", initials: "DK", doctor: "Dr. Amina N.", department: "Pediatrics", time: "09:00 AM", date: "Today", status: "Confirmed", color: "blue" },
  { id: "APT-1044", patient: "Grace Atim", initials: "GA", doctor: "Dr. Peter Ssemanda", department: "Neurology", time: "09:30 AM", date: "Today", status: "Pending", color: "orange" },
  { id: "APT-1045", patient: "Michael Ochieng", initials: "MO", doctor: "Dr. James Okello", department: "Cardiology", time: "10:00 AM", date: "Today", status: "Confirmed", color: "green" },
  { id: "APT-1046", patient: "Esther Nakato", initials: "EN", doctor: "Dr. Lydia K.", department: "Dermatology", time: "10:30 AM", date: "Today", status: "Confirmed", color: "pink" },
];

const doctors = [
  { name: "Dr. James Okello", specialty: "Cardiology", initials: "JO", patients: 18, availability: "Available", color: "violet" },
  { name: "Dr. Amina N.", specialty: "Pediatrics", initials: "AN", patients: 14, availability: "In consultation", color: "blue" },
  { name: "Dr. Peter Ssemanda", specialty: "Neurology", initials: "PS", patients: 11, availability: "Available", color: "orange" },
  { name: "Dr. Lydia K.", specialty: "Dermatology", initials: "LK", patients: 9, availability: "Available", color: "pink" },
];

const departments = ["Cardiology", "Pediatrics", "Neurology", "Dermatology", "General Medicine", "Orthopedics"];
const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Appointments", icon: CalendarDays },
  { label: "Patients", icon: Users },
  { label: "Doctors", icon: Stethoscope },
  { label: "Departments", icon: Building2 },
  { label: "AI insights", icon: Sparkles },
];

function StatusBadge({ status }: { status: AppointmentStatus }) {
  return <span className={`status-badge ${status.toLowerCase().replaceAll(" ", "-")}`}><span />{status}</span>;
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [appointments, setAppointments] = useState(initialAppointments);
  const [showBooking, setShowBooking] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [patient, setPatient] = useState("");
  const [department, setDepartment] = useState("Cardiology");
  const [doctor, setDoctor] = useState("Dr. James Okello");
  const [date, setDate] = useState("2026-11-12");
  const [time, setTime] = useState("09:00 AM");
  const [bookingMessage, setBookingMessage] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "Hello! I can help you find a department, explore doctor availability, and prepare an appointment. What would you like help with?" },
  ]);

  const filteredAppointments = useMemo(() => appointments.filter((item) =>
    [item.patient, item.doctor, item.department, item.id].some((value) => value.toLowerCase().includes(search.toLowerCase()))
  ), [appointments, search]);

  function bookAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!patient.trim()) return;
    const initials = patient.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
    const newAppointment: Appointment = {
      id: `APT-${1047 + appointments.length - initialAppointments.length}`,
      patient: patient.trim(), initials, doctor, department, time, date: "Upcoming",
      status: "Confirmed", color: "teal",
    };
    setAppointments((current) => [newAppointment, ...current]);
    setBookingMessage(`Appointment confirmed for ${patient.trim()} with ${doctor}.`);
    setPatient("");
    setShowBooking(false);
    setActiveNav("Appointments");
  }

  function sendChat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = chatInput.trim();
    if (!prompt) return;
    const lower = prompt.toLowerCase();
    const foundDepartment = departments.find((item) => lower.includes(item.toLowerCase()));
    const reply = foundDepartment
      ? `I can help with ${foundDepartment}. In this preview, the next step is to choose a clinician and confirm an available slot. Select “Book appointment” to create a demo booking. Live availability and AI provider integration are the next implementation step.`
      : lower.includes("book") || lower.includes("appointment") || lower.includes("doctor")
        ? "I can guide you through booking. Tell me the department or type of care you need (for example, Cardiology or Pediatrics), then we can select a clinician and time."
        : "Thanks for sharing that. I can help route appointment requests to a hospital department and guide you through scheduling. For urgent or severe symptoms, contact emergency services or go to the nearest emergency department.";
    setChatMessages((items) => [...items, { role: "user", text: prompt }, { role: "assistant", text: reply }]);
    setChatInput("");
  }

  const pageTitle = activeNav === "Overview" ? "Good morning, Admin" : activeNav;
  const pageSubtitle = activeNav === "Overview"
    ? "Here’s what’s happening at your hospital today."
    : `Manage your hospital's ${activeNav.toLowerCase()} in one place.`;

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><HeartPulse size={23} strokeWidth={2.4} /></div>
          <div><strong>MediFlow<span>AI</span></strong><small>HOSPITAL PLATFORM</small></div>
          <button className="icon-button mobile-close" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={19} /></button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="main-nav">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-item ${activeNav === label ? "active" : ""}`} onClick={() => { setActiveNav(label); setMobileNav(false); }}>
              <Icon size={18} strokeWidth={1.9} /><span>{label}</span>{label === "AI insights" && <span className="new-pill">NEW</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><Sparkles size={17} /></div><strong>Need a hand?</strong><p>Ask the MediFlow assistant to help with scheduling.</p><button onClick={() => setActiveNav("AI insights")}>Open assistant <ArrowUpRight size={14} /></button></div>
          <div className="profile-row"><div className="avatar avatar-admin">AK</div><div className="profile-copy"><strong>Alex Kim</strong><span>Hospital administrator</span></div><ChevronDown size={16} className="profile-chevron" /></div>
        </div>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={21} /></button>
          <div className="breadcrumb">Workspace <span>/</span> <strong>{activeNav}</strong></div>
          <div className="topbar-actions">
            <div className="hospital-switch"><span className="hospital-dot" />Kampala Central Hospital <ChevronDown size={14} /></div>
            <button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button>
            <div className="avatar avatar-admin top-avatar">AK</div>
          </div>
        </header>

        <div className="content-wrap">
          <div className="page-heading">
            <div><div className="eyebrow"><span className="live-dot" /> TUESDAY, NOVEMBER 11, 2026</div><h1>{pageTitle}</h1><p>{pageSubtitle}</p></div>
            <button className="primary-button" onClick={() => { setBookingMessage(""); setShowBooking(true); }}><Plus size={17} /> New appointment</button>
          </div>

          {bookingMessage && <div className="success-banner"><Check size={17} />{bookingMessage}<button onClick={() => setBookingMessage("")} aria-label="Dismiss"><X size={16} /></button></div>}

          {activeNav === "AI insights" ? (
            <div className="ai-page-grid">
              <section className="panel ai-chat-panel">
                <div className="panel-heading"><div className="heading-icon ai-icon"><Bot size={19} /></div><div><h2>MediFlow assistant</h2><p>Scheduling support · Preview mode</p></div><span className="preview-tag">PREVIEW</span></div>
                <div className="chat-history">{chatMessages.map((message, index) => <div key={index} className={`chat-message ${message.role}`}><div className="chat-avatar">{message.role === "assistant" ? <Sparkles size={15} /> : "AK"}</div><p>{message.text}</p></div>)}</div>
                <form className="chat-form" onSubmit={sendChat}><input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Ask about appointments or departments..." /><button type="submit" aria-label="Send message"><Send size={17} /></button></form>
                <p className="disclaimer">Preview responses are rule-based and do not provide medical advice. Live AI integration is not enabled yet.</p>
              </section>
              <section className="panel insight-panel"><div className="panel-heading"><div className="heading-icon"><Activity size={18} /></div><div><h2>Operational signals</h2><p>Illustrative demo data</p></div></div><div className="insight-item"><span className="insight-symbol amber"><CircleAlert size={17} /></span><div><strong>Cardiology demand is elevated</strong><p>Consider reviewing clinician capacity for the afternoon.</p></div></div><div className="insight-item"><span className="insight-symbol green"><CalendarCheck size={17} /></span><div><strong>Open slots detected</strong><p>There are unfilled appointment windows in the sample schedule.</p></div></div><div className="insight-item"><span className="insight-symbol blue"><Users size={17} /></span><div><strong>Waitlist review</strong><p>Connect a patient waitlist to offer cancelled slots.</p></div></div></section>
            </div>
          ) : activeNav === "Doctors" ? (
            <section className="panel directory-panel"><div className="section-heading"><div><h2>Medical team</h2><p>Clinician directory and current availability</p></div><button className="outline-button"><Plus size={15} /> Add doctor</button></div><div className="doctor-grid">{doctors.map((item) => <div className="doctor-card" key={item.name}><div className={`avatar doctor-avatar ${item.color}`}>{item.initials}</div><strong>{item.name}</strong><span>{item.specialty}</span><div className="doctor-meta"><span><Users size={14} />{item.patients} appointments</span><em className={item.availability === "Available" ? "available" : "busy"}>{item.availability}</em></div></div>)}</div></section>
          ) : activeNav === "Departments" ? (
            <section className="panel directory-panel"><div className="section-heading"><div><h2>Hospital departments</h2><p>Services available at Kampala Central Hospital</p></div><button className="outline-button"><Plus size={15} /> Add department</button></div><div className="department-grid">{departments.map((item, index) => <div className="department-card" key={item}><div className="department-icon"><Activity size={19} /></div><div><strong>{item}</strong><span>{[8, 12, 6, 5, 14, 7][index]} clinicians listed</span></div><ArrowUpRight size={16} /></div>)}</div></section>
          ) : activeNav === "Patients" ? (
            <section className="panel table-panel"><div className="section-heading"><div><h2>Patient directory</h2><p>Patients with appointments in this demo schedule</p></div><div className="search-box"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search patients..." /></div></div><AppointmentTable appointments={filteredAppointments} /></section>
          ) : (
            <>
              <div className="stats-grid">
                <StatCard label="Total appointments" value="342" change="+12.8%" icon={<CalendarCheck size={19} />} tone="blue" foot="vs. last week" />
                <StatCard label="Registered patients" value="1,284" change="+8.2%" icon={<Users size={19} />} tone="violet" foot="vs. last month" />
                <StatCard label="Available doctors" value="24" change="of 32" icon={<Stethoscope size={19} />} tone="green" foot="currently on duty" />
                <StatCard label="Average wait time" value="18 min" change="-4.3%" icon={<Clock3 size={19} />} tone="orange" foot="vs. yesterday" down />
              </div>
              <div className="dashboard-grid">
                <section className="panel schedule-panel">
                  <div className="section-heading"><div><h2>{activeNav === "Appointments" ? "Appointment schedule" : "Today's appointments"}</h2><p>Tuesday, November 11 · All departments</p></div><button className="text-button" onClick={() => setActiveNav("Appointments")}>View all <ArrowUpRight size={15} /></button></div>
                  <div className="table-toolbar"><div className="search-box"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search appointments..." /></div><button className="filter-button">Today <ChevronDown size={14} /></button></div>
                  <AppointmentTable appointments={filteredAppointments} />
                  <button className="table-footer" onClick={() => setActiveNav("Appointments")}>View complete schedule <ArrowUpRight size={14} /></button>
                </section>
                <div className="right-column">
                  <section className="panel capacity-panel"><div className="section-heading"><div><h2>Department capacity</h2><p>Today's utilization</p></div><button className="more-button">···</button></div><CapacityRow name="Cardiology" value={86} count="43 / 50" color="violet" /><CapacityRow name="Pediatrics" value={72} count="36 / 50" color="blue" /><CapacityRow name="Neurology" value={58} count="23 / 40" color="orange" /><CapacityRow name="Dermatology" value={41} count="16 / 39" color="green" /><div className="capacity-note"><CircleAlert size={15} /> Capacity values are sample data for this preview.</div></section>
                  <section className="panel team-panel"><div className="section-heading"><div><h2>On-duty doctors</h2><p>Today's medical team</p></div><button className="text-button" onClick={() => setActiveNav("Doctors")}>See all <ArrowUpRight size={14} /></button></div>{doctors.slice(0, 3).map((item) => <div className="team-row" key={item.name}><div className={`avatar team-avatar ${item.color}`}>{item.initials}</div><div className="team-info"><strong>{item.name}</strong><span>{item.specialty}</span></div><span className={`presence ${item.availability === "Available" ? "online" : "busy-dot"}`} /></div>)}</section>
                </div>
              </div>
            </>
          )}
          <footer className="page-footer"><span>© 2026 MediFlow AI</span><span>Designed for smarter hospital operations <HeartPulse size={13} /></span><span className="demo-label">DEMO DATA · NOT A LIVE HOSPITAL SYSTEM</span></footer>
        </div>
      </section>

      {showBooking && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowBooking(false); }}><section className="booking-modal"><div className="modal-heading"><div><span className="eyebrow">SCHEDULING</span><h2>Book an appointment</h2><p>Create a new appointment in the demo schedule.</p></div><button className="icon-button" onClick={() => setShowBooking(false)} aria-label="Close"><X size={19} /></button></div><form onSubmit={bookAppointment}><label>Patient full name<input required value={patient} onChange={(event) => setPatient(event.target.value)} placeholder="e.g. Sarah Namusoke" /></label><label>Department<select value={department} onChange={(event) => setDepartment(event.target.value)}>{departments.map((item) => <option key={item}>{item}</option>)}</select></label><label>Doctor<select value={doctor} onChange={(event) => setDoctor(event.target.value)}>{doctors.map((item) => <option key={item.name}>{item.name}</option>)}</select></label><div className="form-row"><label>Date<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label><label>Time<select value={time} onChange={(event) => setTime(event.target.value)}>{["08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "02:00 PM", "02:30 PM", "03:00 PM"].map((item) => <option key={item}>{item}</option>)}</select></label></div><div className="modal-note"><CircleAlert size={15} /> Demo booking only. Live slot validation and database persistence are not connected yet.</div><div className="modal-actions"><button type="button" className="outline-button" onClick={() => setShowBooking(false)}>Cancel</button><button type="submit" className="primary-button"><Check size={16} /> Confirm appointment</button></div></form></section></div>}
    </main>
  );
}

function StatCard({ label, value, change, icon, tone, foot, down = false }: { label: string; value: string; change: string; icon: ReactNode; tone: string; foot: string; down?: boolean }) {
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><div className={`stat-icon ${tone}`}>{icon}</div></div><div className="stat-value">{value}</div><div className="stat-foot"><span className={down ? "change-good" : "change-up"}>{down ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}{change}</span><span>{foot}</span></div></div>;
}

function CapacityRow({ name, value, count, color }: { name: string; value: number; count: string; color: string }) {
  return <div className="capacity-row"><div className="capacity-label"><strong>{name}</strong><span>{count}</span></div><div className="progress-track"><span className={color} style={{ width: `${value}%` }} /></div><div className="capacity-percent">{value}%</div></div>;
}

function AppointmentTable({ appointments }: { appointments: Appointment[] }) {
  return <div className="table-scroll"><table className="appointment-table"><thead><tr><th>Patient</th><th>Doctor / department</th><th>Time</th><th>Status</th></tr></thead><tbody>{appointments.length ? appointments.map((item) => <tr key={item.id}><td><div className="patient-cell"><div className={`avatar patient-avatar ${item.color}`}>{item.initials}</div><div><strong>{item.patient}</strong><span>{item.id}</span></div></div></td><td><div className="doctor-cell"><strong>{item.doctor}</strong><span>{item.department}</span></div></td><td className="time-cell"><Clock3 size={14} />{item.time}</td><td><StatusBadge status={item.status} /></td></tr>) : <tr><td colSpan={4} className="empty-state">No matching appointments found.</td></tr>}</tbody></table></div>;
}
