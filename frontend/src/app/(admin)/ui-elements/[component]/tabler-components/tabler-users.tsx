"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  User,
  Shield,
  Check,
  X,
  LayoutGrid,
  List,
  Building2,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Award,
  MoreVertical,
  Briefcase,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserProfile {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string | null;
  avatarText?: string;
  badge?: {
    text: string;
    variant: "purple" | "green" | "blue" | "amber" | "neutral";
  } | null;
  email: string;
  phone: string;
  status: "online" | "offline" | "busy" | "away";
  creci?: string;
  portfolioValue?: string;
}

const INITIAL_USERS: UserProfile[] = [
  {
    id: "user-1",
    name: "Paweł Kuna",
    role: "UI Designer",
    department: "Design & Product",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    badge: { text: "Owner", variant: "purple" },
    email: "pawel.kuna@tabler.io",
    phone: "+55 (11) 98765-4321",
    status: "online",
    creci: "CRECI 240.119-F",
    portfolioValue: "R$ 42M",
  },
  {
    id: "user-2",
    name: "Jeffie Lewzey",
    role: "Chemical Engineer",
    department: "Engineering",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    badge: { text: "Admin", variant: "green" },
    email: "jeffie.lewzey@tabler.io",
    phone: "+55 (11) 98765-1122",
    status: "online",
    creci: "CRECI 198.432-F",
    portfolioValue: "R$ 28M",
  },
  {
    id: "user-3",
    name: "Mallory Hulme",
    role: "Geologist IV",
    department: "Geosciences",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    badge: { text: "Admin", variant: "green" },
    email: "mallory.hulme@tabler.io",
    phone: "+55 (11) 98765-3344",
    status: "away",
    creci: "CRECI 215.890-F",
    portfolioValue: "R$ 35M",
  },
  {
    id: "user-4",
    name: "Dunn Slane",
    role: "Research Nurse",
    department: "Healthcare & Labs",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
    badge: { text: "Admin", variant: "green" },
    email: "dunn.slane@tabler.io",
    phone: "+55 (11) 98765-5566",
    status: "offline",
    creci: "CRECI 187.654-F",
    portfolioValue: "R$ 19M",
  },
  {
    id: "user-5",
    name: "Emmy Levet",
    role: "VP Product Management",
    department: "Executive & Growth",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    badge: null,
    email: "emmy.levet@tabler.io",
    phone: "+55 (11) 98765-7788",
    status: "online",
    creci: "CRECI 260.412-F",
    portfolioValue: "R$ 64M",
  },
  {
    id: "user-6",
    name: "Maryjo Lebarree",
    role: "Civil Engineer",
    department: "Infrastructure",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    badge: null,
    email: "maryjo.lebarree@tabler.io",
    phone: "+55 (11) 98765-9900",
    status: "busy",
    creci: "CRECI 230.155-F",
    portfolioValue: "R$ 31M",
  },
  {
    id: "user-7",
    name: "Egan Poetz",
    role: "Research Nurse",
    department: "Clinical Operations",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
    badge: null,
    email: "egan.poetz@tabler.io",
    phone: "+55 (11) 98765-1234",
    status: "online",
    creci: "CRECI 209.778-F",
    portfolioValue: "R$ 22M",
  },
  {
    id: "user-8",
    name: "Kellie Skingley",
    role: "Teacher",
    department: "Education & Academy",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=160&q=80",
    badge: null,
    email: "kellie.skingley@tabler.io",
    phone: "+55 (11) 98765-2345",
    status: "offline",
    creci: "CRECI 195.334-F",
    portfolioValue: "R$ 15M",
  },
  {
    id: "user-9",
    name: "Christabel Charlwood",
    role: "Tax Accountant",
    department: "Finance & Fiscal",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80",
    badge: null,
    email: "christabel.charlwood@tabler.io",
    phone: "+55 (11) 98765-3456",
    status: "online",
    creci: "CRECI 244.901-F",
    portfolioValue: "R$ 48M",
  },
  {
    id: "user-10",
    name: "Haskel Shelper",
    role: "Staff Scientist",
    department: "R&D Research",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=160&q=80",
    badge: null,
    email: "haskel.shelper@tabler.io",
    phone: "+55 (11) 98765-4567",
    status: "busy",
    creci: "CRECI 211.233-F",
    portfolioValue: "R$ 27M",
  },
  {
    id: "user-11",
    name: "Lorry Mion",
    role: "Automation Specialist IV",
    department: "Robotics & AI",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=160&q=80",
    badge: null,
    email: "lorry.mion@tabler.io",
    phone: "+55 (11) 98765-5678",
    status: "online",
    creci: "CRECI 252.889-F",
    portfolioValue: "R$ 39M",
  },
  {
    id: "user-12",
    name: "Leesa Beaty",
    role: "Editor",
    department: "Editorial & Media",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80",
    badge: null,
    email: "leesa.beaty@tabler.io",
    phone: "+55 (11) 98765-6789",
    status: "offline",
    creci: "CRECI 199.112-F",
    portfolioValue: "R$ 18M",
  },
  {
    id: "user-13",
    name: "Perren Keemar",
    role: "Analog Circuit Design manager",
    department: "Hardware Engineering",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=80",
    badge: null,
    email: "perren.keemar@tabler.io",
    phone: "+55 (11) 98765-7890",
    status: "away",
    creci: "CRECI 267.001-F",
    portfolioValue: "R$ 53M",
  },
  {
    id: "user-14",
    name: "Sunny Airey",
    role: "Nuclear Power Engineer",
    department: "Energy & Infrastructure",
    avatar: null,
    avatarText: "SA",
    badge: null,
    email: "sunny.airey@tabler.io",
    phone: "+55 (11) 98765-8901",
    status: "online",
    creci: "CRECI 223.456-F",
    portfolioValue: "R$ 33M",
  },
  {
    id: "user-15",
    name: "Geoffry Flaunders",
    role: "Software Test Engineer II",
    department: "Quality Assurance",
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=160&q=80",
    badge: null,
    email: "geoffry.flaunders@tabler.io",
    phone: "+55 (11) 98765-9012",
    status: "online",
    creci: "CRECI 208.777-F",
    portfolioValue: "R$ 25M",
  },
  {
    id: "user-16",
    name: "Thatcher Keel",
    role: "VP Sales",
    department: "Commercial & Sales",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80",
    badge: null,
    email: "thatcher.keel@tabler.io",
    phone: "+55 (11) 98765-0123",
    status: "busy",
    creci: "CRECI 270.890-F",
    portfolioValue: "R$ 82M",
  },
  {
    id: "user-17",
    name: "Dyann Escala",
    role: "Mechanical Systems Engineer",
    department: "Industrial Engineering",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80",
    badge: null,
    email: "dyann.escala@tabler.io",
    phone: "+55 (11) 98765-1235",
    status: "online",
    creci: "CRECI 241.654-F",
    portfolioValue: "R$ 41M",
  },
  {
    id: "user-18",
    name: "Avivah Mugleston",
    role: "Actuary",
    department: "Risk Management",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=160&q=80",
    badge: null,
    email: "avivah.mugleston@tabler.io",
    phone: "+55 (11) 98765-2346",
    status: "online",
    creci: "CRECI 218.990-F",
    portfolioValue: "R$ 36M",
  },
];

export function TablerUsers() {
  const [usersList, setUsersList] = useState<UserProfile[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "owner" | "admin" | "member">("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [currentPage, setCurrentPage] = useState(3); // In official preview, page 3 is selected by default
  const [showRealEstateMeta, setShowRealEstateMeta] = useState(false);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);

  // New user form state
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [newBadge, setNewBadge] = useState<"Owner" | "Admin" | "Member">("Member");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  // Filtering
  const filteredUsers = useMemo(() => {
    return usersList.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === "owner") return user.badge?.text === "Owner";
      if (activeFilter === "admin") return user.badge?.text === "Admin";
      if (activeFilter === "member") return !user.badge;
      return true;
    });
  }, [usersList, searchQuery, activeFilter]);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newRole.trim()) {
      toast.error("Por favor, preencha o nome e o cargo do usuário.");
      return;
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: newName.trim(),
      role: newRole.trim(),
      department: newDepartment.trim() || "Geral",
      avatar: null,
      avatarText: newName
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase(),
      badge:
        newBadge === "Owner"
          ? { text: "Owner", variant: "purple" }
          : newBadge === "Admin"
          ? { text: "Admin", variant: "green" }
          : null,
      email: newEmail.trim() || `${newName.toLowerCase().replace(/\s+/g, ".")}@tabler.io`,
      phone: newPhone.trim() || "+55 (11) 98765-0000",
      status: "online",
      creci: `CRECI ${Math.floor(100000 + Math.random() * 900000)}-F`,
      portfolioValue: `R$ ${Math.floor(15 + Math.random() * 50)}M`,
    };

    setUsersList([newUser, ...usersList]);
    setIsNewUserModalOpen(false);
    setNewName("");
    setNewRole("");
    setNewDepartment("");
    setNewEmail("");
    setNewPhone("");
    toast.success(`Usuário "${newUser.name}" cadastrado com sucesso!`);
  };

  const handleSendEmail = (user: UserProfile) => {
    toast(`Email para ${user.name}`, {
      description: `Abrindo cliente de email para ${user.email}`,
      action: {
        label: "Copiar",
        onClick: () => {
          navigator.clipboard.writeText(user.email);
          toast.success("Email copiado!");
        },
      },
    });
  };

  const handleCallUser = (user: UserProfile) => {
    toast(`Ligando para ${user.name}`, {
      description: `Discando ${user.phone}`,
    });
  };

  const getStatusColor = (status: UserProfile["status"]) => {
    switch (status) {
      case "online":
        return "bg-emerald-500 ring-2 ring-white dark:ring-zinc-900";
      case "busy":
        return "bg-rose-500 ring-2 ring-white dark:ring-zinc-900";
      case "away":
        return "bg-amber-500 ring-2 ring-white dark:ring-zinc-900";
      default:
        return "bg-zinc-400 ring-2 ring-white dark:ring-zinc-900";
    }
  };

  return (
    <div className="space-y-6">
      {/* ================= PAGE HEADER (Oficial Tabler) ================= */}
      <div className="bg-card border border-border/70 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Users</h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                Tabler Official
              </span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              1-{filteredUsers.length} of {usersList.length === 18 ? "413 people" : `${usersList.length} people`}
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search user…"
                className="h-10 pl-9 pr-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-full sm:w-56"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <Button
              onClick={() => setIsNewUserModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm gap-1.5"
            >
              <Plus className="w-4 h-4" />
              New user
            </Button>
          </div>
        </div>

        {/* Toolbar: Filters & View Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-5 border-t border-border/60">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeFilter === "all"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              All ({usersList.length})
            </button>
            <button
              onClick={() => setActiveFilter("owner")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeFilter === "owner"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Owners ({usersList.filter((u) => u.badge?.text === "Owner").length})
            </button>
            <button
              onClick={() => setActiveFilter("admin")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeFilter === "admin"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Admins ({usersList.filter((u) => u.badge?.text === "Admin").length})
            </button>
            <button
              onClick={() => setActiveFilter("member")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeFilter === "member"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Members ({usersList.filter((u) => !u.badge).length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRealEstateMeta(!showRealEstateMeta)}
              className={`h-8 text-xs gap-1.5 ${
                showRealEstateMeta ? "border-amber-500/50 bg-amber-50/50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300" : ""
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              {showRealEstateMeta ? "Modo Imobiliário Ativo" : "Modo Imobiliário"}
            </Button>

            <div className="flex items-center border border-border/80 rounded-lg p-0.5 bg-muted/40">
              <button
                onClick={() => setViewMode("grid")}
                title="Visualização em Grade (Oficial Tabler)"
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewMode === "grid"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                title="Visualização em Lista / Tabela"
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewMode === "table"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= USERS GRID / TABLE ================= */}
      {filteredUsers.length === 0 ? (
        <div className="bg-card border border-border/70 rounded-xl p-12 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">Nenhum usuário encontrado</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            Não encontramos nenhum usuário correspondente à pesquisa &quot;{searchQuery}&quot;.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setActiveFilter("all");
            }}
            className="mt-4"
          >
            Limpar filtros
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        /* OFFICIAL TABLER 4-COLUMN CARDS GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-card border border-border/80 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Body p-4 text-center */}
              <div className="p-5 text-center flex flex-col items-center flex-1">
                {/* Avatar with status indicator */}
                <div className="relative mb-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-border shadow-xs group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-bold text-lg flex items-center justify-center border-2 border-border shadow-xs group-hover:scale-105 transition-transform duration-200">
                      {user.avatarText || user.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  {/* Status Indicator Dot */}
                  <span
                    className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ${getStatusColor(
                      user.status
                    )}`}
                    title={`Status: ${user.status}`}
                  />
                </div>

                {/* User Name */}
                <h2 className="text-base font-bold text-foreground leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    {user.name}
                  </a>
                </h2>

                {/* Role / Job Title */}
                <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{user.role}</div>

                {/* Department or CRECI */}
                <div className="text-[11px] text-muted-foreground/80 mt-1">
                  {showRealEstateMeta ? user.creci : user.department}
                </div>

                {/* Real Estate Portfolio Meta */}
                {showRealEstateMeta && (
                  <div className="mt-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                    Carteira: {user.portfolioValue}
                  </div>
                )}

                {/* Badge (Owner / Admin) */}
                <div className="mt-3 min-h-[22px]">
                  {user.badge ? (
                    <span
                      className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-md ${
                        user.badge.variant === "purple"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
                          : user.badge.variant === "green"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                      }`}
                    >
                      {user.badge.text}
                    </span>
                  ) : (
                    <span className="opacity-0 text-[11px] select-none">—</span>
                  )}
                </div>
              </div>

              {/* Card Split Actions Footer */}
              <div className="grid grid-cols-2 border-t border-border/80 divide-x divide-border/80 bg-muted/20">
                <button
                  type="button"
                  onClick={() => handleSendEmail(user)}
                  className="py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => handleCallUser(user)}
                  className="py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                  Call
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE LIST VIEW */
        <div className="bg-card border border-border/80 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground">
                  <th className="py-3 px-4">Usuário</th>
                  <th className="py-3 px-4">Cargo & Área</th>
                  <th className="py-3 px-4">Nível de Acesso</th>
                  <th className="py-3 px-4">Contato</th>
                  {showRealEstateMeta && <th className="py-3 px-4">Carteira VGV</th>}
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-9 h-9 rounded-full object-cover border border-border"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-bold text-xs flex items-center justify-center border border-border">
                              {user.avatarText || user.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <span
                            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${getStatusColor(
                              user.status
                            )}`}
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-sm">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-foreground text-xs">{user.role}</div>
                      <div className="text-xs text-muted-foreground">
                        {showRealEstateMeta ? user.creci : user.department}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {user.badge ? (
                        <span
                          className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded ${
                            user.badge.variant === "purple"
                              ? "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                          }`}
                        >
                          {user.badge.text}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Membro</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-xs text-foreground font-mono">{user.phone}</div>
                    </td>
                    {showRealEstateMeta && (
                      <td className="py-3 px-4">
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          {user.portfolioValue}
                        </span>
                      </td>
                    )}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSendEmail(user)}
                          className="h-8 w-8 p-0"
                          title="Enviar Email"
                        >
                          <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCallUser(user)}
                          className="h-8 w-8 p-0"
                          title="Ligar"
                        >
                          <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= OFFICIAL TABLER PAGINATION ================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="text-xs text-muted-foreground">
          Showing <span className="font-semibold text-foreground">1</span> to{" "}
          <span className="font-semibold text-foreground">{filteredUsers.length}</span> of{" "}
          <span className="font-semibold text-foreground">413</span> entries
        </div>

        <nav aria-label="Pagination">
          <ul className="flex items-center gap-1">
            {/* Previous */}
            <li>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={`p-2 rounded-lg border border-border/80 text-xs flex items-center justify-center transition-colors ${
                  currentPage === 1
                    ? "opacity-40 cursor-not-allowed bg-muted/30 text-muted-foreground"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </li>

            {/* Page 1 */}
            <li>
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className={`w-8 h-8 rounded-lg text-xs font-medium border transition-colors ${
                  currentPage === 1
                    ? "bg-blue-600 border-blue-600 text-white font-semibold shadow-xs"
                    : "border-border/80 text-foreground hover:bg-muted"
                }`}
              >
                1
              </button>
            </li>

            {/* Page 2 */}
            <li>
              <button
                type="button"
                onClick={() => setCurrentPage(2)}
                className={`w-8 h-8 rounded-lg text-xs font-medium border transition-colors ${
                  currentPage === 2
                    ? "bg-blue-600 border-blue-600 text-white font-semibold shadow-xs"
                    : "border-border/80 text-foreground hover:bg-muted"
                }`}
              >
                2
              </button>
            </li>

            {/* Page 3 (Active in official Tabler demo) */}
            <li>
              <button
                type="button"
                onClick={() => setCurrentPage(3)}
                className={`w-8 h-8 rounded-lg text-xs font-medium border transition-colors ${
                  currentPage === 3
                    ? "bg-blue-600 border-blue-600 text-white font-semibold shadow-xs"
                    : "border-border/80 text-foreground hover:bg-muted"
                }`}
              >
                3
              </button>
            </li>

            {/* Page 4 */}
            <li>
              <button
                type="button"
                onClick={() => setCurrentPage(4)}
                className={`w-8 h-8 rounded-lg text-xs font-medium border transition-colors ${
                  currentPage === 4
                    ? "bg-blue-600 border-blue-600 text-white font-semibold shadow-xs"
                    : "border-border/80 text-foreground hover:bg-muted"
                }`}
              >
                4
              </button>
            </li>

            {/* Page 5 */}
            <li>
              <button
                type="button"
                onClick={() => setCurrentPage(5)}
                className={`w-8 h-8 rounded-lg text-xs font-medium border transition-colors ${
                  currentPage === 5
                    ? "bg-blue-600 border-blue-600 text-white font-semibold shadow-xs"
                    : "border-border/80 text-foreground hover:bg-muted"
                }`}
              >
                5
              </button>
            </li>

            {/* Next */}
            <li>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                disabled={currentPage === 5}
                aria-label="Next page"
                className={`p-2 rounded-lg border border-border/80 text-xs flex items-center justify-center transition-colors ${
                  currentPage === 5
                    ? "opacity-40 cursor-not-allowed bg-muted/30 text-muted-foreground"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* ================= MODAL: NEW USER ================= */}
      {isNewUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-5 border-b border-border bg-muted/20">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Criar Novo Usuário</h3>
                  <p className="text-xs text-muted-foreground">Adicione um novo membro à equipe Tabler</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewUserModalOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Nome Completo <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Eduardo Silveira"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Cargo <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Lead Broker"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Departamento</label>
                  <input
                    type="text"
                    placeholder="Ex: Vendas Alto Padrão"
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Nível de Acesso (Badge)</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Member", "Admin", "Owner"] as const).map((role) => (
                    <button
                      type="button"
                      key={role}
                      onClick={() => setNewBadge(role)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                        newBadge === role
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="usuario@tabler.io"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Telefone</label>
                  <input
                    type="text"
                    placeholder="+55 (11) 98765-4321"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsNewUserModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Cadastrar Usuário
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
