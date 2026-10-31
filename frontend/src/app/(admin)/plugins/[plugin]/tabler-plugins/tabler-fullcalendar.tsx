"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  ExternalLink,
  Sparkles,
  Layers,
  X,
  Check,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface CalendarEvent {
  id: string;
  title: string;
  day: number;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  endDay?: number;
  color: string;
  bgColor: string;
  category: "work" | "marketing" | "design" | "retreat" | "sales";
}

const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: "e1",
    title: "Offsite Retreat",
    day: 2,
    endDay: 4,
    startHour: 9,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    color: "text-rose-700 dark:text-rose-300",
    bgColor: "bg-rose-100 dark:bg-rose-950/60 border-rose-200 dark:border-rose-900",
    category: "retreat",
  },
  {
    id: "e2",
    title: "Monthly Planning",
    day: 1,
    startHour: 10,
    startMinute: 0,
    endHour: 11,
    endMinute: 30,
    color: "text-blue-700 dark:text-blue-300",
    bgColor: "bg-blue-100 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900",
    category: "work",
  },
  {
    id: "e3",
    title: "Marketing Strategy Call",
    day: 4,
    startHour: 14,
    startMinute: 0,
    endHour: 15,
    endMinute: 0,
    color: "text-purple-700 dark:text-purple-300",
    bgColor: "bg-purple-100 dark:bg-purple-950/60 border-purple-200 dark:border-purple-900",
    category: "marketing",
  },
  {
    id: "e4",
    title: "Design Sprint",
    day: 7,
    startHour: 9,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    color: "text-amber-700 dark:text-amber-300",
    bgColor: "bg-amber-100 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900",
    category: "design",
  },
  {
    id: "e5",
    title: "Dev Team Check-in",
    day: 10,
    startHour: 11,
    startMinute: 0,
    endHour: 11,
    endMinute: 30,
    color: "text-emerald-700 dark:text-emerald-300",
    bgColor: "bg-emerald-100 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900",
    category: "work",
  },
  {
    id: "e6",
    title: "Customer Feedback Review",
    day: 13,
    startHour: 13,
    startMinute: 0,
    endHour: 14,
    endMinute: 0,
    color: "text-cyan-700 dark:text-cyan-300",
    bgColor: "bg-cyan-100 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-900",
    category: "work",
  },
  {
    id: "e7",
    title: "Mid-Month Review",
    day: 15,
    startHour: 10,
    startMinute: 30,
    endHour: 11,
    endMinute: 30,
    color: "text-blue-700 dark:text-blue-300",
    bgColor: "bg-blue-100 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900",
    category: "work",
  },
  {
    id: "e8",
    title: "Webinar: Product Update",
    day: 18,
    startHour: 16,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    color: "text-indigo-700 dark:text-indigo-300",
    bgColor: "bg-indigo-100 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-900",
    category: "marketing",
  },
  {
    id: "e9",
    title: "Sales Training",
    day: 21,
    startHour: 9,
    startMinute: 30,
    endHour: 11,
    endMinute: 0,
    color: "text-orange-700 dark:text-orange-300",
    bgColor: "bg-orange-100 dark:bg-orange-950/60 border-orange-200 dark:border-orange-900",
    category: "sales",
  },
  {
    id: "e10",
    title: "Company All-Hands",
    day: 25,
    startHour: 15,
    startMinute: 0,
    endHour: 16,
    endMinute: 0,
    color: "text-blue-700 dark:text-blue-300",
    bgColor: "bg-blue-100 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900",
    category: "work",
  },
  {
    id: "e11",
    title: "End-of-Month Wrap-up",
    day: 31,
    startHour: 10,
    startMinute: 0,
    endHour: 11,
    endMinute: 0,
    color: "text-emerald-700 dark:text-emerald-300",
    bgColor: "bg-emerald-100 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900",
    category: "work",
  },
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function TablerFullcalendar() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // June 2026
  const [viewMode, setViewMode] = useState<"month" | "week" | "list">("month");
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);

  // New Event Form State
  const [newTitle, setNewTitle] = useState("");
  const [newDay, setNewDay] = useState(15);
  const [newCategory, setNewCategory] = useState<CalendarEvent["category"]>("work");

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
  // Monday start
  const startOffset = (firstDayIndex + 6) % 7;

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleToday = () => {
    const now = new Date();
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error("Informe o título do evento");
      return;
    }

    const created: CalendarEvent = {
      id: Math.random().toString(36).substring(2, 9),
      title: newTitle.trim(),
      day: newDay,
      startHour: 10,
      startMinute: 0,
      endHour: 11,
      endMinute: 30,
      category: newCategory,
      color: "text-blue-700 dark:text-blue-300",
      bgColor: "bg-blue-100 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900",
    };

    setEvents((prev) => [...prev, created]);
    setIsNewEventModalOpen(false);
    setNewTitle("");
    toast.success(`Evento "${created.title}" criado para o dia ${created.day}!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border/70 rounded-xl p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-foreground">Fullcalendar Plugin</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              FullCalendar 6.x
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Visualizador de agenda e eventos corporativos com suporte a múltiplos dias, horários precisos, modos mês, semana e lista.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsNewEventModalOpen(true)}
            className="text-xs h-9 gap-1.5 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-3.5 h-3.5" />
            Novo Evento
          </Button>

          <a
            href="https://preview.tabler.io/fullcalendar.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-border hover:bg-muted text-foreground transition-colors shadow-xs"
          >
            Preview Tabler
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Calendar Card */}
      <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden">
        {/* Calendar Header Controls */}
        <div className="p-4 sm:p-5 border-b border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-foreground tracking-tight">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </h2>

            <div className="flex items-center gap-1 bg-muted/60 p-0.5 rounded-lg border border-border/60">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-md hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleToday}
                className="px-2.5 py-1 text-xs font-semibold rounded-md hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
              >
                Today
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-md hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* View switcher buttons */}
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/60 text-xs">
            <button
              onClick={() => setViewMode("month")}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                viewMode === "month"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                viewMode === "week"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                viewMode === "list"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* View Mode: Month Grid */}
        {viewMode === "month" && (
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Day Headers */}
              <div className="grid grid-cols-7 border-b border-border/70 bg-muted/30 text-center text-xs font-semibold text-muted-foreground py-2.5">
                {weekdays.map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-border/60 border-b border-border/70">
                {/* Empty cells before day 1 */}
                {Array.from({ length: startOffset }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="h-28 bg-muted/10 p-1.5" />
                ))}

                {/* Days of Month */}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const day = idx + 1;
                  const dayEvents = events.filter(
                    (e) => (e.endDay ? day >= e.day && day <= e.endDay : e.day === day)
                  );
                  const isToday =
                    day === 15 && currentMonth === 5 && currentYear === 2026;

                  return (
                    <div
                      key={`day-${day}`}
                      className="h-28 p-1.5 flex flex-col justify-between hover:bg-muted/20 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-semibold w-6 h-6 rounded-full flex items-center justify-center ${
                            isToday
                              ? "bg-blue-600 text-white shadow-xs font-bold"
                              : "text-foreground"
                          }`}
                        >
                          {day}
                        </span>
                        {dayEvents.length > 2 && (
                          <span className="text-[10px] text-muted-foreground font-medium">
                            +{dayEvents.length - 2}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 overflow-y-auto max-h-20 mt-1">
                        {dayEvents.slice(0, 2).map((ev) => (
                          <button
                            key={ev.id}
                            onClick={() => setSelectedEvent(ev)}
                            className={`w-full text-left px-1.5 py-0.5 rounded text-[11px] font-medium border truncate transition-all block ${ev.bgColor} ${ev.color}`}
                          >
                            {ev.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* View Mode: Week */}
        {viewMode === "week" && (
          <div className="p-5 space-y-3">
            <div className="text-xs text-muted-foreground font-medium mb-3">
              Semana atual de {MONTH_NAMES[currentMonth]} {currentYear}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-3">
              {weekdays.map((dayName, idx) => {
                const dayNum = idx + 8; // Days 8 - 14 demo week
                const dayEvents = events.filter((e) => e.day === dayNum);
                return (
                  <div key={dayName} className="p-3 rounded-xl border border-border bg-muted/20 min-h-[160px] flex flex-col">
                    <div className="text-xs font-bold text-foreground mb-2 flex items-center justify-between">
                      <span>{dayName}</span>
                      <span className="text-muted-foreground font-normal">{dayNum}</span>
                    </div>
                    <div className="space-y-1.5 flex-1">
                      {dayEvents.length === 0 ? (
                        <div className="text-[11px] text-muted-foreground/60 italic pt-2">
                          Sem eventos
                        </div>
                      ) : (
                        dayEvents.map((ev) => (
                          <div
                            key={ev.id}
                            onClick={() => setSelectedEvent(ev)}
                            className={`p-1.5 rounded text-[11px] font-medium border cursor-pointer ${ev.bgColor} ${ev.color}`}
                          >
                            <div className="font-semibold truncate">{ev.title}</div>
                            <div className="text-[10px] opacity-80">
                              {ev.startHour}:00 - {ev.endHour}:00
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* View Mode: List */}
        {viewMode === "list" && (
          <div className="p-5">
            <div className="divide-y divide-border/60">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => setSelectedEvent(ev)}
                  className="py-3 px-2 flex items-center justify-between hover:bg-muted/40 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-center w-12 py-1 px-2 rounded-lg bg-muted border border-border text-xs">
                      <div className="text-[10px] uppercase font-bold text-muted-foreground">
                        {MONTH_NAMES[currentMonth].slice(0, 3)}
                      </div>
                      <div className="text-sm font-bold text-foreground">{ev.day}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-foreground">{ev.title}</div>
                      <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {ev.startHour.toString().padStart(2, "0")}:{ev.startMinute.toString().padStart(2, "0")} -{" "}
                        {ev.endHour.toString().padStart(2, "0")}:{ev.endMinute.toString().padStart(2, "0")}
                      </div>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded text-xs font-medium border ${ev.bgColor} ${ev.color}`}>
                    {ev.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Selected Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${selectedEvent.bgColor} ${selectedEvent.color}`}>
                {selectedEvent.category}
              </span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-muted-foreground hover:text-foreground p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground">{selectedEvent.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
                Dia {selectedEvent.day} de {MONTH_NAMES[currentMonth]} de {currentYear}
                {selectedEvent.endDay && ` até dia ${selectedEvent.endDay}`}
              </p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                {selectedEvent.startHour.toString().padStart(2, "0")}:{selectedEvent.startMinute.toString().padStart(2, "0")} às{" "}
                {selectedEvent.endHour.toString().padStart(2, "0")}:{selectedEvent.endMinute.toString().padStart(2, "0")}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border/70">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEvents((prev) => prev.filter((e) => e.id !== selectedEvent.id));
                  setSelectedEvent(null);
                  toast.success("Evento excluído!");
                }}
                className="text-xs text-destructive hover:bg-destructive/10"
              >
                Excluir
              </Button>
              <Button
                size="sm"
                onClick={() => setSelectedEvent(null)}
                className="text-xs"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* New Event Modal */}
      {isNewEventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateEvent}
            className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">Novo Evento</h3>
              <button
                type="button"
                onClick={() => setIsNewEventModalOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-foreground block mb-1">Título do Evento</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Reunião de Alinhamento Trimestral"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Dia do Mês</label>
                  <input
                    type="number"
                    min={1}
                    max={daysInMonth}
                    value={newDay}
                    onChange={(e) => setNewDay(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Categoria</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="work">Work</option>
                    <option value="marketing">Marketing</option>
                    <option value="design">Design</option>
                    <option value="retreat">Retreat</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border/70">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsNewEventModalOpen(false)}
                className="text-xs"
              >
                Cancelar
              </Button>
              <Button type="submit" size="sm" className="text-xs bg-blue-600 hover:bg-blue-700 text-white">
                Salvar Evento
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
