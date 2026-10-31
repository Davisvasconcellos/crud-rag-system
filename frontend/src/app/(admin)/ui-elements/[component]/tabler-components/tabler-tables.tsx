"use client";

import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  Search,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
  Download,
  Check,
  Copy,
  Building,
  Sparkles,
  Filter,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

// ============================================================================
// DATA SETS (VERBATIM FROM TABLER PREVIEW)
// ============================================================================

const BASIC_TABLE_ROWS = [
  { name: "Paweł Kuna", title: "UI Designer, Training", email: "paweluna@howstuffworks.com", role: "User" },
  { name: "Jeffie Lewzey", title: "Chemical Engineer, Support", email: "jlewzey1@seesaa.net", role: "User" },
  { name: "Mallory Hulme", title: "Geologist IV, Support", email: "mhulme2@domainmarket.com", role: "User" },
  { name: "Dunn Slane", title: "Research Nurse, Sales", email: "dslane3@epa.gov", role: "Owner" },
  { name: "Emmy Levet", title: "VP Product Management, Accounting", email: "elevet4@senate.gov", role: "User" },
  { name: "Maryjo Lebarree", title: "Civil Engineer, Product Management", email: "mlebarree5@unc.edu", role: "User" },
  { name: "Egan Poetz", title: "Research Nurse, Engineering", email: "epoetz6@free.fr", role: "Admin" },
  { name: "Kellie Skingley", title: "Teacher, Services", email: "kskingley7@columbia.edu", role: "Owner" },
];

const TOP_PAGES_DATA = [
  { page: "/", percentage: 82.54, visitors: "4,896" },
  { page: "/form-elements.html", percentage: 76.29, visitors: "3,652" },
  { page: "/index.html", percentage: 72.65, visitors: "3,256" },
  { page: "/icons.html", percentage: 44.89, visitors: "986" },
  { page: "/docs/", percentage: 41.12, visitors: "912" },
  { page: "/accordion.html", percentage: 32.65, visitors: "855" },
  { page: "/datagrid.html", percentage: 16.22, visitors: "764" },
  { page: "/datatables.html", percentage: 8.69, visitors: "686" },
];

const STRIPED_TABLE_ROWS = [
  { name: "Maryjo Lebarree", title: "Civil Engineer, Product Management", email: "mlebarree5@unc.edu", role: "User" },
  { name: "Egan Poetz", title: "Research Nurse, Engineering", email: "epoetz6@free.fr", role: "User" },
  { name: "Kellie Skingley", title: "Teacher, Services", email: "kskingley7@columbia.edu", role: "User" },
  { name: "Christabel Charlwood", title: "Tax Accountant, Engineering", email: "ccharlwood8@nifty.com", role: "Owner" },
  { name: "Haskel Shelper", title: "Staff Scientist, Legal", email: "hshelper9@woothemes.com", role: "User" },
];

const AVATAR_TABLE_ROWS = [
  {
    name: "Lorry Mion",
    email: "lmiona@livejournal.com",
    title: "User",
    role: "User",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
    initials: "LM",
  },
  {
    name: "Leesa Beaty",
    email: "lbeatyb@alibaba.com",
    title: "User",
    role: "User",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80",
    initials: "LB",
  },
  {
    name: "Perren Keemar",
    email: "pkeemarc@yahoo.com",
    title: "User",
    role: "User",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
    initials: "PK",
  },
  {
    name: "Sunny Airey",
    email: "saireyd@prlog.org",
    title: "Owner",
    role: "Owner",
    avatar: null,
    initials: "SA",
  },
  {
    name: "Geoffry Flaunders",
    email: "gflaunderse@loc.gov",
    title: "User",
    role: "User",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
    initials: "GF",
  },
];

const RESPONSIVE_TABLE_ROWS = [
  {
    name: "Thatcher Keel",
    title: "Business Development",
    role: "User",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80",
  },
  {
    name: "Dyann Escala",
    title: "Sales",
    role: "User",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  },
  {
    name: "Avivah Mugleston",
    title: "Sales",
    role: "User",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80",
  },
  {
    name: "Arlie Armstead",
    title: "Accounting",
    role: "User",
    avatar: null,
  },
  {
    name: "Tessie Curzon",
    title: "Product Management",
    role: "User",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
  },
];

const INVOICES_DATA = [
  { id: "001401", subject: "Design Works", country: "US", flag: "🇺🇸", client: "Carlson Limited", vat: "87956621", date: "15 Dec 2017", statusColor: "success", status: "Paid", price: "$887" },
  { id: "001402", subject: "UX Wireframes", country: "GB", flag: "🇬🇧", client: "Adobe", vat: "87956421", date: "12 Apr 2017", statusColor: "warning", status: "Pending", price: "$1,200" },
  { id: "001403", subject: "New Dashboard", country: "DE", flag: "🇩🇪", client: "Bluewolf", vat: "87952621", date: "23 Oct 2017", statusColor: "warning", status: "Pending", price: "$534" },
  { id: "001404", subject: "Landing Page", country: "BR", flag: "🇧🇷", client: "Salesforce", vat: "87953421", date: "2 Sep 2017", statusColor: "secondary", status: "Due in 2 Weeks", price: "$1,500" },
  { id: "001405", subject: "Marketing Templates", country: "PL", flag: "🇵🇱", client: "Printic", vat: "87956621", date: "29 Jan 2018", statusColor: "danger", status: "Paid Today", price: "$648" },
  { id: "001406", subject: "Sales Presentation", country: "BR", flag: "🇧🇷", client: "Tabdaq", vat: "87956621", date: "4 Feb 2018", statusColor: "secondary", status: "Due in 3 Weeks", price: "$300" },
  { id: "001407", subject: "Logo & Print", country: "US", flag: "🇺🇸", client: "Apple", vat: "87956621", date: "22 Mar 2018", statusColor: "success", status: "Paid Today", price: "$2,500" },
  { id: "001408", subject: "Icons Pack", country: "PL", flag: "🇵🇱", client: "Tookapic", vat: "87956621", date: "13 May 2018", statusColor: "success", status: "Paid Today", price: "$940" },
];

const EMPLOYEE_TABLE_DATA = [
  { id: 1, name: "Paweł Kuna", city: "Peimei, China", status: "Active", date: "Dec 08, 2024", tags: ["Event", "Tickets"], avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" },
  { id: 2, name: "Jeffie Lewzey", city: "Indaial, Brazil", status: "Inactive", date: "Jan 01, 2024", tags: ["QTA", "Event"], avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" },
  { id: 3, name: "Mallory Hulme", city: "Cimuncang, Indonesia", status: "Requested", date: "Jan 01, 2024", tags: ["Tickets"], avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" },
  { id: 4, name: "Dunn Slane", city: "Liutang, China", status: "Active", date: "Sep 01, 2024", tags: ["QTA", "TODO"], avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80" },
  { id: 5, name: "Emmy Levet", city: "Kaliprak, Indonesia", status: "Active", date: "Jan 01, 2024", tags: ["Event", "TODO"], avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80" },
  { id: 6, name: "Maryjo Lebarree", city: "Denver, USA", status: "Active", date: "Mar 14, 2024", tags: ["Engineering"], avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" },
  { id: 7, name: "Egan Poetz", city: "Paris, France", status: "Inactive", date: "Jun 20, 2024", tags: ["Support", "QTA"], avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" },
  { id: 8, name: "Kellie Skingley", city: "London, UK", status: "Active", date: "Nov 02, 2024", tags: ["Tickets"], avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80" },
];

export function TablerTables() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Invoices Table state
  const [invoiceSearch, setInvoiceSearch] = useState("");
  const [selectedInvoices, setSelectedInvoices] = useState<Record<string, boolean>>({
    "001401": true,
  });
  const [invoiceSortAsc, setInvoiceSortAsc] = useState(true);

  // Employee Table state
  const [empSearch, setEmpSearch] = useState("");
  const [empSortField, setEmpSortField] = useState<"name" | "city" | "status" | "date">("name");
  const [empSortAsc, setEmpSortAsc] = useState(true);
  const [selectedEmployees, setSelectedEmployees] = useState<Record<number, boolean>>({});

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success("Snippet copiado!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Filtered & Sorted Invoices
  const filteredInvoices = useMemo(() => {
    return INVOICES_DATA.filter((inv) =>
      inv.subject.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
      inv.client.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
      inv.id.includes(invoiceSearch)
    ).sort((a, b) => {
      return invoiceSortAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
    });
  }, [invoiceSearch, invoiceSortAsc]);

  const toggleSelectAllInvoices = () => {
    if (Object.keys(selectedInvoices).length === filteredInvoices.length) {
      setSelectedInvoices({});
    } else {
      const all: Record<string, boolean> = {};
      filteredInvoices.forEach((inv) => (all[inv.id] = true));
      setSelectedInvoices(all);
    }
  };

  const toggleInvoiceRow = (id: string) => {
    setSelectedInvoices((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  };

  // Filtered & Sorted Employees
  const filteredEmployees = useMemo(() => {
    return EMPLOYEE_TABLE_DATA.filter((emp) =>
      emp.name.toLowerCase().includes(empSearch.toLowerCase()) ||
      emp.city.toLowerCase().includes(empSearch.toLowerCase()) ||
      emp.status.toLowerCase().includes(empSearch.toLowerCase())
    ).sort((a, b) => {
      const valA = a[empSortField];
      const valB = b[empSortField];
      return empSortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }, [empSearch, empSortField, empSortAsc]);

  const toggleSelectAllEmployees = () => {
    if (Object.keys(selectedEmployees).length === filteredEmployees.length) {
      setSelectedEmployees({});
    } else {
      const all: Record<number, boolean> = {};
      filteredEmployees.forEach((emp) => (all[emp.id] = true));
      setSelectedEmployees(all);
    }
  };

  const toggleEmployeeRow = (id: number) => {
    setSelectedEmployees((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  };

  const handleEmpSort = (field: "name" | "city" | "status" | "date") => {
    if (empSortField === field) {
      setEmpSortAsc(!empSortAsc);
    } else {
      setEmpSortField(field);
      setEmpSortAsc(true);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            <span>Tabler UI</span>
            <span>•</span>
            <span className="text-primary font-bold">Data Tables</span>
            <span>•</span>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">1:1 Replica</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Tables</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-3xl">
            Tabelas versáteis com suporte a zebra-striping, avatares, progress bars integradas, ordenação, seleção em massa e responsividade.
            Réplica 100% fiel de <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">https://preview.tabler.io/tables.html</code>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://preview.tabler.io/tables.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shadow-sm"
          >
            <span>Ver Oficial Tabler</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Row 1: Basic table (col-lg-8) + Top Pages (col-lg-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ======================================================== */}
        {/* CARD 1: Basic table (col-lg-8)                            */}
        {/* ======================================================== */}
        <div className="lg:col-span-8">
          <Card className="h-full flex flex-col justify-between shadow-sm hover:shadow transition-shadow overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/40 bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">Basic table</CardTitle>
                  <CardDescription className="text-xs">
                    A clean list of rows and columns, ready to drop into any card.
                  </CardDescription>
                </div>
                <button
                  onClick={() => handleCopy('<table class="table table-vcenter card-table">...</table>', 'basic')}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                  title="Copiar snippet"
                >
                  {copiedKey === 'basic' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </CardHeader>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-muted/40 text-muted-foreground font-semibold border-b border-border">
                  <tr>
                    <th className="px-4 py-2.5">Name</th>
                    <th className="px-4 py-2.5">Title</th>
                    <th className="px-4 py-2.5">Email</th>
                    <th className="px-4 py-2.5">Role</th>
                    <th className="px-4 py-2.5 text-right w-16">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {BASIC_TABLE_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2.5 font-medium">{row.name}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{row.title}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        <a href={`mailto:${row.email}`} className="text-primary hover:underline">
                          {row.email}
                        </a>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          row.role === 'Owner'
                            ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                            : row.role === 'Admin'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {row.role}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium">
                        <button
                          onClick={() => toast.info(`Editar: ${row.name}`)}
                          className="text-primary hover:underline text-xs"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* ======================================================== */}
        {/* CARD 2: Top Pages with Tabler progressbg (col-lg-4)       */}
        {/* ======================================================== */}
        <div className="lg:col-span-4">
          <Card className="h-full flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-foreground">Top Pages</h2>
                <button
                  onClick={() => handleCopy('<div class="progressbg"><div class="progress progressbg-progress"><div class="progress-bar bg-primary-lt" style="width: 82.54%"></div></div><div class="progressbg-text">/</div></div>', 'toppages')}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                  title="Copiar snippet"
                >
                  {copiedKey === 'toppages' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="overflow-x-auto flex-1">
                <table className="w-full text-xs text-left border-collapse border-0">
                  <thead>
                    <tr className="border-0">
                      <th className="pb-2.5 font-semibold text-muted-foreground px-1">Page</th>
                      <th className="pb-2.5 font-semibold text-muted-foreground text-right w-16 px-1">Visitors</th>
                    </tr>
                  </thead>
                  <tbody className="border-0 space-y-1">
                    {TOP_PAGES_DATA.map((item, idx) => (
                      <tr key={idx} className="border-0 group">
                        <td className="py-1 px-0">
                          {/* Tabler .progressbg component */}
                          <div
                            className="relative flex items-center py-1.5 px-3 rounded-md overflow-hidden bg-muted/20 dark:bg-muted/10 group-hover:bg-muted/30 transition-colors"
                            title={`${item.page} — ${item.percentage}% dos acessos`}
                          >
                            {/* Proportional Background Fill (.progressbg-progress > .progress-bar.bg-primary-lt) */}
                            <div
                              className="absolute inset-y-0 left-0 bg-blue-500/20 dark:bg-blue-400/30 transition-all duration-500 rounded-md"
                              style={{ width: `${item.percentage}%` }}
                            />
                            {/* Text overlay (.progressbg-text) */}
                            <span className="relative z-10 font-mono text-[11px] font-medium text-foreground truncate select-none">
                              {item.page}
                            </span>
                          </div>
                        </td>
                        <td className="py-1 px-1 text-right font-mono font-bold text-muted-foreground group-hover:text-foreground transition-colors w-1 whitespace-nowrap">
                          {item.visitors}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>

      </div>

      {/* ======================================================== */}
      {/* CARD 3: Striped rows (col-12)                             */}
      {/* ======================================================== */}
      <Card className="shadow-sm hover:shadow transition-shadow overflow-hidden">
        <CardHeader className="pb-3 border-b border-border/40 bg-card">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">Striped rows</CardTitle>
              <CardDescription className="text-xs">
                Alternate row shading with <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">table-striped</code> to make wide tables easier to scan.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<table class="table table-vcenter card-table table-striped">...</table>', 'striped')}
              className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
            >
              {copiedKey === 'striped' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/40 text-muted-foreground font-semibold border-b border-border">
              <tr>
                <th className="px-4 py-2.5">Name</th>
                <th className="px-4 py-2.5">Title</th>
                <th className="px-4 py-2.5">Email</th>
                <th className="px-4 py-2.5">Role</th>
                <th className="px-4 py-2.5 text-right w-16">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {STRIPED_TABLE_ROWS.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-border transition-colors ${
                    idx % 2 === 1 ? 'bg-muted/40 dark:bg-muted/20' : 'bg-card'
                  }`}
                >
                  <td className="px-4 py-2.5 font-medium">{row.name}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{row.title}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    <a href={`mailto:${row.email}`} className="text-primary hover:underline">
                      {row.email}
                    </a>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                      row.role === 'Owner'
                        ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {row.role}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium">
                    <button
                      onClick={() => toast.info(`Editar: ${row.name}`)}
                      className="text-primary hover:underline text-xs"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ======================================================== */}
      {/* CARD 4: With avatars (col-12)                             */}
      {/* ======================================================== */}
      <Card className="shadow-sm hover:shadow transition-shadow overflow-hidden">
        <CardHeader className="pb-3 border-b border-border/40 bg-card">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">With avatars</CardTitle>
              <CardDescription className="text-xs">
                Swap the plain name column for an avatar, title, and department.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<div class="d-flex align-items-center"><span class="avatar">...</span></div>', 'avatars')}
              className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
            >
              {copiedKey === 'avatars' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/40 text-muted-foreground font-semibold border-b border-border">
              <tr>
                <th className="px-4 py-2.5">Name</th>
                <th className="px-4 py-2.5">Title</th>
                <th className="px-4 py-2.5">Role</th>
                <th className="px-4 py-2.5 text-right w-16">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {AVATAR_TABLE_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-3">
                      {row.avatar ? (
                        <img
                          src={row.avatar}
                          alt={row.name}
                          className="w-8 h-8 rounded-full object-cover shrink-0 border border-border shadow-xs"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 border border-primary/20">
                          {row.initials}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-foreground">{row.name}</div>
                        <div className="text-[11px] text-muted-foreground">
                          <a href={`mailto:${row.email}`} className="hover:text-primary transition-colors">
                            {row.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground font-medium">{row.title}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                      row.role === 'Owner'
                        ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {row.role}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium">
                    <button
                      onClick={() => toast.info(`Editar: ${row.name}`)}
                      className="text-primary hover:underline text-xs"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ======================================================== */}
      {/* CARD 5: Responsive with actions (col-12)                  */}
      {/* ======================================================== */}
      <Card className="shadow-sm hover:shadow transition-shadow overflow-hidden">
        <CardHeader className="pb-3 border-b border-border/40 bg-card">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">Responsive with actions</CardTitle>
              <CardDescription className="text-xs">
                Collapses to stacked rows on mobile and adds an actions button per row.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<table class="table table-vcenter table-mobile-md card-table">...</table>', 'resp')}
              className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
            >
              {copiedKey === 'resp' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/40 text-muted-foreground font-semibold border-b border-border">
              <tr>
                <th className="px-4 py-2.5">Name</th>
                <th className="px-4 py-2.5">Title</th>
                <th className="px-4 py-2.5">Role</th>
                <th className="px-4 py-2.5 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {RESPONSIVE_TABLE_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-3">
                      {row.avatar ? (
                        <img
                          src={row.avatar}
                          alt={row.name}
                          className="w-8 h-8 rounded-full object-cover shrink-0 border border-border"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-muted font-bold text-xs flex items-center justify-center shrink-0 border border-border">
                          {row.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-foreground">{row.name}</div>
                        <div className="text-[11px] text-muted-foreground md:hidden">{row.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground font-medium">{row.title}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold bg-muted text-muted-foreground">
                      {row.role}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => toast.success(`Ação executada para ${row.name}`)}
                        className="px-2.5 py-1 text-xs border border-border rounded-md hover:bg-muted transition-colors font-medium text-foreground shadow-2xs"
                      >
                        Actions
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ======================================================== */}
      {/* CARD 6: Invoices (Full Data Table with Filters) (col-12)  */}
      {/* ======================================================== */}
      <Card className="shadow-sm hover:shadow transition-shadow overflow-hidden">
        <CardHeader className="pb-3 border-b border-border/40 bg-card">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">Invoices</CardTitle>
              <CardDescription className="text-xs">
                Data table com seleção em lote, busca dinâmica, status com ponto colorido e países com bandeiras.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<table id="invoices-table" class="table table-selectable card-table">...</table>', 'invoices')}
              className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
            >
              {copiedKey === 'invoices' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </CardHeader>

        {/* Invoices Toolbar */}
        <div className="p-4 border-b border-border/40 bg-muted/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <span className="px-2 py-1 bg-background border border-border rounded font-mono font-semibold text-foreground">
              {filteredInvoices.length}
            </span>
            <span>entries</span>
            {Object.keys(selectedInvoices).length > 0 && (
              <span className="ml-3 px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold text-[11px]">
                {Object.keys(selectedInvoices).length} selecionado(s)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span>Search:</span>
            <div className="relative w-full sm:w-56">
              <input
                type="text"
                value={invoiceSearch}
                onChange={(e) => setInvoiceSearch(e.target.value)}
                placeholder="Buscar fatura ou cliente..."
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-background border border-border rounded-md focus:outline-hidden focus:ring-1 focus:ring-primary"
              />
              <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-2" />
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/40 text-muted-foreground font-semibold border-b border-border">
              <tr>
                <th className="px-4 py-2.5 w-10">
                  <input
                    type="checkbox"
                    checked={filteredInvoices.length > 0 && Object.keys(selectedInvoices).length === filteredInvoices.length}
                    onChange={toggleSelectAllInvoices}
                    className="rounded border-border text-primary cursor-pointer accent-primary"
                  />
                </th>
                <th className="px-4 py-2.5 w-24">
                  <button
                    onClick={() => setInvoiceSortAsc(!invoiceSortAsc)}
                    className="inline-flex items-center gap-1 hover:text-foreground font-semibold"
                  >
                    No.
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-4 py-2.5">Invoice Subject</th>
                <th className="px-4 py-2.5">Client</th>
                <th className="px-4 py-2.5">VAT No.</th>
                <th className="px-4 py-2.5">Created</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5 text-right">Price</th>
                <th className="px-4 py-2.5 text-right w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-muted-foreground">
                    Nenhuma fatura encontrada para "{invoiceSearch}".
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => {
                  const isSelected = !!selectedInvoices[inv.id];
                  return (
                    <tr
                      key={inv.id}
                      className={`transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-primary/5 hover:bg-primary/10"
                          : "hover:bg-muted/20"
                      }`}
                      onClick={() => toggleInvoiceRow(inv.id)}
                    >
                      <td className="px-4 py-2.5" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleInvoiceRow(inv.id)}
                          className="rounded border-border text-primary cursor-pointer accent-primary"
                        />
                      </td>
                      <td className="px-4 py-2.5 font-mono text-muted-foreground font-medium">
                        {inv.id}
                      </td>
                      <td className="px-4 py-2.5 font-semibold text-foreground">
                        {inv.subject}
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1.5 font-medium">
                          <span className="text-sm leading-none" title={inv.country}>{inv.flag}</span>
                          <span>{inv.client}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-muted-foreground">{inv.vat}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{inv.date}</td>
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              inv.statusColor === 'success'
                                ? 'bg-emerald-500'
                                : inv.statusColor === 'warning'
                                ? 'bg-amber-500'
                                : inv.statusColor === 'danger'
                                ? 'bg-rose-500'
                                : 'bg-zinc-400'
                            }`}
                          />
                          <span className="text-foreground">{inv.status}</span>
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono font-bold text-foreground">
                        {inv.price}
                      </td>
                      <td className="px-4 py-2.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toast.info(`Ações para fatura #${inv.id}`)}
                          className="px-2 py-0.5 text-xs border border-border rounded hover:bg-muted font-medium"
                        >
                          Actions
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Invoices Footer Pagination */}
        <div className="p-3 border-t border-border/40 bg-card flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>
            Showing <span className="font-semibold text-foreground">1</span> to{" "}
            <span className="font-semibold text-foreground">{filteredInvoices.length}</span> of{" "}
            <span className="font-semibold text-foreground">16</span> entries
          </div>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 border border-border rounded text-xs hover:bg-muted disabled:opacity-50" disabled>
              Prev
            </button>
            <button className="px-2.5 py-1 bg-primary text-primary-foreground font-bold rounded text-xs">
              1
            </button>
            <button className="px-2.5 py-1 border border-border rounded text-xs hover:bg-muted">
              2
            </button>
            <button className="px-2.5 py-1 border border-border rounded text-xs hover:bg-muted">
              Next
            </button>
          </div>
        </div>
      </Card>

      {/* ======================================================== */}
      {/* CARD 7: Advanced Employee Table (Sortable & Filterable)   */}
      {/* ======================================================== */}
      <Card className="shadow-sm hover:shadow transition-shadow overflow-hidden">
        <CardHeader className="pb-3 border-b border-border/40 bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-bold">Employee</CardTitle>
              <CardDescription className="text-xs">
                Tabela interativa avançada com atalho de busca <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono text-[10px]">ctrl + K</kbd>, tags e ordenação dinâmica.
              </CardDescription>
            </div>

            {/* Toolbar Buttons */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  value={empSearch}
                  onChange={(e) => setEmpSearch(e.target.value)}
                  placeholder="Buscar colaborador..."
                  className="text-xs pl-8 pr-14 py-1.5 bg-background border border-border rounded-md focus:outline-hidden focus:ring-1 focus:ring-primary w-52"
                />
                <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-2" />
                <span className="absolute right-2 top-1.5 text-[9px] font-mono text-muted-foreground bg-muted px-1 rounded">
                  ctrl+K
                </span>
              </div>

              <button
                onClick={() => toast.success("Exportando dados em CSV...")}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 border border-border rounded-md hover:bg-muted transition-colors font-medium shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </CardHeader>

        {/* Employee Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/40 text-muted-foreground font-semibold border-b border-border">
              <tr>
                <th className="px-4 py-2.5 w-10">
                  <input
                    type="checkbox"
                    checked={filteredEmployees.length > 0 && Object.keys(selectedEmployees).length === filteredEmployees.length}
                    onChange={toggleSelectAllEmployees}
                    className="rounded border-border text-primary cursor-pointer accent-primary"
                  />
                </th>
                <th className="px-4 py-2.5 cursor-pointer hover:text-foreground" onClick={() => handleEmpSort("name")}>
                  <div className="flex items-center justify-between gap-1">
                    <span>Name</span>
                    <ArrowUpDown className="w-3 h-3 text-muted-foreground" />
                  </div>
                </th>
                <th className="px-4 py-2.5 cursor-pointer hover:text-foreground" onClick={() => handleEmpSort("city")}>
                  <div className="flex items-center justify-between gap-1">
                    <span>City</span>
                    <ArrowUpDown className="w-3 h-3 text-muted-foreground" />
                  </div>
                </th>
                <th className="px-4 py-2.5 cursor-pointer hover:text-foreground" onClick={() => handleEmpSort("status")}>
                  <div className="flex items-center justify-between gap-1">
                    <span>Status</span>
                    <ArrowUpDown className="w-3 h-3 text-muted-foreground" />
                  </div>
                </th>
                <th className="px-4 py-2.5 cursor-pointer hover:text-foreground" onClick={() => handleEmpSort("date")}>
                  <div className="flex items-center justify-between gap-1">
                    <span>Start date</span>
                    <ArrowUpDown className="w-3 h-3 text-muted-foreground" />
                  </div>
                </th>
                <th className="px-4 py-2.5">Tags</th>
                <th className="px-4 py-2.5 text-right w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredEmployees.map((emp) => {
                const isSelected = !!selectedEmployees[emp.id];
                return (
                  <tr
                    key={emp.id}
                    className={`transition-colors cursor-pointer ${
                      isSelected ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/20"
                    }`}
                    onClick={() => toggleEmployeeRow(emp.id)}
                  >
                    <td className="px-4 py-2.5" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleEmployeeRow(emp.id)}
                        className="rounded border-border text-primary cursor-pointer accent-primary"
                      />
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-6 h-6 rounded-full object-cover shrink-0 border border-border"
                        />
                        <span className="font-semibold text-foreground">{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">{emp.city}</td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                          emp.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : emp.status === "Inactive"
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground font-mono">{emp.date}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {emp.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-[10px] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toast.info(`Ações para ${emp.name}`)}
                        className="p-1 text-muted-foreground hover:text-foreground rounded hover:bg-muted"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ======================================================== */}
      {/* BONUS: Real Estate Portfolio Table                        */}
      {/* ======================================================== */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card shadow-sm overflow-hidden">
        <CardHeader className="pb-3 border-b border-border/40">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-primary/10 text-primary">
              <Building className="w-4 h-4" />
            </span>
            <div>
              <CardTitle className="text-base font-bold">Unidades Imobiliárias em Negociação</CardTitle>
              <CardDescription className="text-xs">
                Exemplo prático de data table aplicada ao funil de contratos e unidades de alto padrão.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/40 text-muted-foreground font-semibold border-b border-border">
              <tr>
                <th className="px-4 py-2.5">Empreendimento / Imóvel</th>
                <th className="px-4 py-2.5">Localização</th>
                <th className="px-4 py-2.5">Tipologia</th>
                <th className="px-4 py-2.5">Status Contrato</th>
                <th className="px-4 py-2.5 text-right">Valor Negociado</th>
                <th className="px-4 py-2.5 text-right w-24">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                {
                  id: "IMB-902",
                  title: "Horizonte Beira Mar - Apto 1402",
                  photo: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=80&q=80",
                  city: "Balneário Camboriú, SC",
                  specs: "240m² • 4 Suítes • 3 Vagas",
                  status: "Proposta em Análise",
                  statusColor: "bg-amber-500/10 text-amber-600",
                  value: "R$ 4.850.000",
                },
                {
                  id: "IMB-514",
                  title: "Mansão Alphaville Reserva",
                  photo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=80&q=80",
                  city: "Barueri, SP",
                  specs: "580m² • 5 Suítes • 6 Vagas",
                  status: "Escriturado / Vendido",
                  statusColor: "bg-emerald-500/10 text-emerald-600",
                  value: "R$ 8.900.000",
                },
                {
                  id: "IMB-208",
                  title: "Vila Nova Design Penthouse",
                  photo: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=80&q=80",
                  city: "Vila Nova Conceição, SP",
                  specs: "310m² • 3 Suítes • 4 Vagas",
                  status: "Contrato em Minuta",
                  statusColor: "bg-blue-500/10 text-blue-600",
                  value: "R$ 6.200.000",
                },
              ].map((prop, idx) => (
                <tr key={idx} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={prop.photo}
                        alt={prop.title}
                        className="w-10 h-10 rounded-lg object-cover shrink-0 border border-border shadow-2xs"
                      />
                      <div>
                        <div className="font-bold text-foreground">{prop.title}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">{prop.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-medium">{prop.city}</td>
                  <td className="px-4 py-3 text-muted-foreground">{prop.specs}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${prop.statusColor}`}>
                      {prop.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-foreground text-sm">
                    {prop.value}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => toast.info(`Visualizar imóvel ${prop.id}`)}
                        className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted"
                        title="Ver ficha"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toast.info(`Editar unidade ${prop.id}`)}
                        className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted"
                        title="Editar"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
