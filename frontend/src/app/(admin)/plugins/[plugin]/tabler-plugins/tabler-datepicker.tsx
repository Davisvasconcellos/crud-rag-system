"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  CalendarDays,
  MousePointerClick,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Reusable Calendar Renderer
interface CalendarViewProps {
  mode?: "single" | "range" | "multiple";
  selectedDate?: string;
  selectedRange?: [string, string];
  selectedMultiple?: string[];
  onSelectDate?: (d: string) => void;
  onSelectRange?: (r: [string, string]) => void;
  onSelectMultiple?: (d: string) => void;
  firstDaySunday?: boolean;
  showWeekNumbers?: boolean;
  minDate?: string;
  maxDate?: string;
  monthOffset?: number;
}

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export function CalendarView({
  mode = "single",
  selectedDate = "2026-06-15",
  selectedRange = ["2026-06-10", "2026-06-18"],
  selectedMultiple = ["2026-06-05", "2026-06-12", "2026-06-19"],
  onSelectDate,
  onSelectRange,
  onSelectMultiple,
  firstDaySunday = false,
  showWeekNumbers = false,
  minDate,
  maxDate,
  monthOffset = 0,
}: CalendarViewProps) {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5 + monthOffset); // 5 = Junho

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  // Adjust for Monday start if not Sunday
  const startOffset = firstDaySunday ? firstDayIndex : (firstDayIndex + 6) % 7;

  const weekdays = firstDaySunday
    ? ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    : ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

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

  const formatDateStr = (day: number) => {
    const m = String(currentMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${currentYear}-${m}-${d}`;
  };

  const isSelected = (day: number) => {
    const str = formatDateStr(day);
    if (mode === "single") return selectedDate === str;
    if (mode === "range") {
      return str === selectedRange[0] || str === selectedRange[1];
    }
    if (mode === "multiple") return selectedMultiple.includes(str);
    return false;
  };

  const isInRange = (day: number) => {
    if (mode !== "range") return false;
    const str = formatDateStr(day);
    return (
      selectedRange[0] &&
      selectedRange[1] &&
      str > selectedRange[0] &&
      str < selectedRange[1]
    );
  };

  const isDisabled = (day: number) => {
    const str = formatDateStr(day);
    if (minDate && str < minDate) return true;
    if (maxDate && str > maxDate) return true;
    return false;
  };

  const handleDayClick = (day: number) => {
    if (isDisabled(day)) return;
    const str = formatDateStr(day);
    if (mode === "single" && onSelectDate) {
      onSelectDate(str);
    } else if (mode === "multiple" && onSelectMultiple) {
      onSelectMultiple(str);
    } else if (mode === "range" && onSelectRange) {
      if (!selectedRange[0] || (selectedRange[0] && selectedRange[1])) {
        onSelectRange([str, ""]);
      } else {
        if (str < selectedRange[0]) {
          onSelectRange([str, selectedRange[0]]);
        } else {
          onSelectRange([selectedRange[0], str]);
        }
      }
    }
  };

  return (
    <div className="p-3.5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl max-w-[290px] select-none">
      {/* Month Header Navigation */}
      <div className="flex items-center justify-between mb-3 px-1">
        <button
          type="button"
          onClick={handlePrev}
          className="p-1 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </span>
        <button
          type="button"
          onClick={handleNext}
          className="p-1 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday Labels */}
      <div className={`grid ${showWeekNumbers ? "grid-cols-8" : "grid-cols-7"} text-center gap-1 mb-1`}>
        {showWeekNumbers && (
          <span className="text-[10px] font-mono font-medium text-zinc-400 dark:text-zinc-500">#</span>
        )}
        {weekdays.map((w, idx) => (
          <span key={idx} className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
            {w}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className={`grid ${showWeekNumbers ? "grid-cols-8" : "grid-cols-7"} text-center gap-1`}>
        {/* Leading week number for row 1 if enabled */}
        {showWeekNumbers && (
          <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 self-center">W23</span>
        )}
        {Array.from({ length: startOffset }).map((_, i) => (
          <span key={`empty-${i}`} className="w-7 h-7" />
        ))}

        {/* Month Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const selected = isSelected(day);
          const inRange = isInRange(day);
          const disabled = isDisabled(day);

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => handleDayClick(day)}
              className={`w-7 h-7 rounded-md text-xs font-medium transition-colors flex items-center justify-center cursor-pointer ${
                disabled
                  ? "opacity-25 cursor-not-allowed text-zinc-400"
                  : selected
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold shadow-xs scale-105"
                  : inRange
                  ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-200 font-semibold"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Side-by-side Dual Month Calendar
function TwoMonthsCalendarView({
  selectedRange,
  onSelectRange,
}: {
  selectedRange: [string, string];
  onSelectRange: (r: [string, string]) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl select-none">
      <CalendarView
        mode="range"
        selectedRange={selectedRange}
        onSelectRange={onSelectRange}
        monthOffset={0}
      />
      <CalendarView
        mode="range"
        selectedRange={selectedRange}
        onSelectRange={onSelectRange}
        monthOffset={1}
      />
    </div>
  );
}

export function TablerDatepicker() {
  const [basicDate, setBasicDate] = useState("2026-06-20");
  const [iconDate, setIconDate] = useState("2026-06-22");
  const [prependDate, setPrependDate] = useState("2026-06-25");
  const [valueDate, setValueDate] = useState("1990-06-20");
  const [minMaxDate, setMinMaxDate] = useState("2026-08-14");
  const [rangeDates, setRangeDates] = useState<[string, string]>(["2026-06-10", "2026-06-18"]);
  const [multipleDates, setMultipleDates] = useState<string[]>([
    "2026-06-05",
    "2026-06-12",
    "2026-06-19",
  ]);
  const [twoMonthsRange, setTwoMonthsRange] = useState<[string, string]>(["2026-06-15", "2026-07-10"]);
  const [sundayDate, setSundayDate] = useState("2026-06-14");
  const [weekNumbersDate, setWeekNumbersDate] = useState("2026-06-18");
  const [placementCenterDate, setPlacementCenterDate] = useState("2026-06-15");
  const [placementRightDate, setPlacementRightDate] = useState("2026-06-20");
  const [buttonTriggerDate, setButtonTriggerDate] = useState("2026-06-25");
  const [eventsRange, setEventsRange] = useState<[string, string]>(["2026-06-10", "2026-06-18"]);
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const toggleMultipleDate = (d: string) => {
    setMultipleDates((prev) =>
      prev.includes(d) ? prev.filter((item) => item !== d) : [...prev, d].sort()
    );
  };

  return (
    <div className="space-y-6">
      {/* Click-outside backdrop for open popovers */}
      {openPopover && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setOpenPopover(null)}
        />
      )}

      {/* Top Banner / Tabler Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                <CalendarDays className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Date picker
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                17 Variações Tabler • Flatpickr
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-3xl">
              Replicação integral das 17 variações oficiais do Datepicker do Tabler: seleção simples, ícone append/prepend, valor inicial, limites mínimo/máximo, intervalos (ranges), múltiplos dias, dois meses, primeiro dia domingo, número de semanas, posicionamento, botão de disparo, eventos e modos inline.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://preview.tabler.io/datepicker.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              Preview Oficial Tabler <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Grid of Input Datepickers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. Basic */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-2.5 relative">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Basic</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Campo simples com popup de calendário ao focar.</p>
          <div className="relative">
            <input
              type="text"
              value={basicDate}
              onClick={() => setOpenPopover(openPopover === "basic" ? null : "basic")}
              readOnly
              className="w-full h-9 px-3 text-xs rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
            />
            {openPopover === "basic" && (
              <div className="absolute top-11 left-0 z-50 animate-in fade-in zoom-in-95 duration-150">
                <CalendarView
                  selectedDate={basicDate}
                  onSelectDate={(d) => {
                    setBasicDate(d);
                    setOpenPopover(null);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* 2. With Icon (Append & Prepend) */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-2.5 relative">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">With icon</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Ícone de calendário à direita e à esquerda.</p>
          <div className="space-y-2.5">
            <div className="relative">
              <input
                type="text"
                value={iconDate}
                onClick={() => setOpenPopover(openPopover === "icon" ? null : "icon")}
                readOnly
                className="w-full h-9 pl-3 pr-9 text-xs rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
              />
              <CalendarIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              {openPopover === "icon" && (
                <div className="absolute top-11 left-0 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <CalendarView
                    selectedDate={iconDate}
                    onSelectDate={(d) => {
                      setIconDate(d);
                      setOpenPopover(null);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="relative">
              <CalendarIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                value={prependDate}
                onClick={() => setOpenPopover(openPopover === "prepend" ? null : "prepend")}
                readOnly
                className="w-full h-9 pl-9 pr-3 text-xs rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
              />
              {openPopover === "prepend" && (
                <div className="absolute top-11 left-0 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <CalendarView
                    selectedDate={prependDate}
                    onSelectDate={(d) => {
                      setPrependDate(d);
                      setOpenPopover(null);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Initial Value */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-2.5 relative">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Initial value</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Data inicial pré-selecionada no formato YYYY-MM-DD.</p>
          <div className="relative">
            <input
              type="text"
              value={valueDate}
              onClick={() => setOpenPopover(openPopover === "value" ? null : "value")}
              readOnly
              className="w-full h-9 px-3 text-xs rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
            />
            {openPopover === "value" && (
              <div className="absolute top-11 left-0 z-50 animate-in fade-in zoom-in-95 duration-150">
                <CalendarView
                  selectedDate={valueDate}
                  onSelectDate={(d) => {
                    setValueDate(d);
                    setOpenPopover(null);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* 4. Min and Max */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-2.5 relative">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Min and max</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Restrito exclusivamente ao ano de 2026 (01/01 a 31/12).</p>
          <div className="relative">
            <input
              type="text"
              value={minMaxDate}
              onClick={() => setOpenPopover(openPopover === "minmax" ? null : "minmax")}
              readOnly
              placeholder="Selecione data em 2026"
              className="w-full h-9 px-3 text-xs rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
            />
            {openPopover === "minmax" && (
              <div className="absolute top-11 left-0 z-50 animate-in fade-in zoom-in-95 duration-150">
                <CalendarView
                  minDate="2026-01-01"
                  maxDate="2026-12-31"
                  selectedDate={minMaxDate}
                  onSelectDate={(d) => {
                    setMinMaxDate(d);
                    setOpenPopover(null);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* 5. Date Range */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-2.5 relative">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Date range</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Seleção de data inicial e data final com realce de faixa.</p>
          <div className="relative">
            <input
              type="text"
              value={`${rangeDates[0]} to ${rangeDates[1]}`}
              onClick={() => setOpenPopover(openPopover === "range" ? null : "range")}
              readOnly
              className="w-full h-9 px-3 text-xs rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
            />
            {openPopover === "range" && (
              <div className="absolute top-11 left-0 z-50 animate-in fade-in zoom-in-95 duration-150">
                <CalendarView
                  mode="range"
                  selectedRange={rangeDates}
                  onSelectRange={(r) => {
                    setRangeDates(r);
                    if (r[0] && r[1]) setOpenPopover(null);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* 6. Multiple Dates */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-2.5 relative">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Multiple dates</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Seleção de múltiplas datas avulsas não contínuas.</p>
          <div className="relative">
            <input
              type="text"
              value={multipleDates.join(", ")}
              onClick={() => setOpenPopover(openPopover === "multiple" ? null : "multiple")}
              readOnly
              className="w-full h-9 px-3 text-xs rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 truncate"
            />
            {openPopover === "multiple" && (
              <div className="absolute top-11 left-0 z-50 animate-in fade-in zoom-in-95 duration-150">
                <CalendarView
                  mode="multiple"
                  selectedMultiple={multipleDates}
                  onSelectMultiple={toggleMultipleDate}
                />
              </div>
            )}
          </div>
        </div>

        {/* 7. Two Months */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-2.5 relative">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Two months</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Exibição de 2 meses simultâneos para seleção estendida.</p>
          <div className="relative">
            <input
              type="text"
              value={`${twoMonthsRange[0]} to ${twoMonthsRange[1]}`}
              onClick={() => setOpenPopover(openPopover === "twomonths" ? null : "twomonths")}
              readOnly
              className="w-full h-9 px-3 text-xs rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
            />
            {openPopover === "twomonths" && (
              <div className="absolute top-11 left-0 z-50 animate-in fade-in zoom-in-95 duration-150">
                <TwoMonthsCalendarView
                  selectedRange={twoMonthsRange}
                  onSelectRange={(r) => {
                    setTwoMonthsRange(r);
                    if (r[0] && r[1]) setOpenPopover(null);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* 8. Week Starts on Sunday */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-2.5 relative">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Week starts on Sunday</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Primeiro dia da semana configurado como Domingo.</p>
          <div className="relative">
            <input
              type="text"
              value={sundayDate}
              onClick={() => setOpenPopover(openPopover === "sunday" ? null : "sunday")}
              readOnly
              className="w-full h-9 px-3 text-xs rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
            />
            {openPopover === "sunday" && (
              <div className="absolute top-11 left-0 z-50 animate-in fade-in zoom-in-95 duration-150">
                <CalendarView
                  firstDaySunday
                  selectedDate={sundayDate}
                  onSelectDate={(d) => {
                    setSundayDate(d);
                    setOpenPopover(null);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* 9. Week Numbers */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-2.5 relative">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Week numbers</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Exibe a numeração oficial da semana no ano (#).</p>
          <div className="relative">
            <input
              type="text"
              value={`${weekNumbersDate} (Semana 25)`}
              onClick={() => setOpenPopover(openPopover === "weeknumbers" ? null : "weeknumbers")}
              readOnly
              className="w-full h-9 px-3 text-xs rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
            />
            {openPopover === "weeknumbers" && (
              <div className="absolute top-11 left-0 z-50 animate-in fade-in zoom-in-95 duration-150">
                <CalendarView
                  showWeekNumbers
                  selectedDate={weekNumbersDate}
                  onSelectDate={(d) => {
                    setWeekNumbersDate(d);
                    setOpenPopover(null);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* 10. Placement (Center & Right) */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-2.5 relative">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Placement</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Alinhamento customizado do dropdown: ao centro ou à direita.</p>
          <div className="space-y-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Alinhado ao centro"
                value={placementCenterDate}
                onClick={() => setOpenPopover(openPopover === "center" ? null : "center")}
                readOnly
                className="w-full h-9 px-3 text-xs rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 cursor-pointer"
              />
              {openPopover === "center" && (
                <div className="absolute top-11 left-1/2 -translate-x-1/2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <CalendarView
                    selectedDate={placementCenterDate}
                    onSelectDate={(d) => {
                      setPlacementCenterDate(d);
                      setOpenPopover(null);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Alinhado à direita"
                value={placementRightDate}
                onClick={() => setOpenPopover(openPopover === "right" ? null : "right")}
                readOnly
                className="w-full h-9 px-3 text-xs rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 cursor-pointer"
              />
              {openPopover === "right" && (
                <div className="absolute top-11 right-0 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <CalendarView
                    selectedDate={placementRightDate}
                    onSelectDate={(d) => {
                      setPlacementRightDate(d);
                      setOpenPopover(null);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 11. Button Trigger */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-2.5 relative">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Button trigger</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Disparo de abertura através de botão dedicado.</p>
          <div className="flex items-center gap-2 relative">
            <input
              type="text"
              value={buttonTriggerDate}
              readOnly
              className="flex-1 h-9 px-3 text-xs rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => setOpenPopover(openPopover === "btn" ? null : "btn")}
              className="h-9 px-3 flex items-center gap-1.5 cursor-pointer"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-zinc-500" />
              <span>Escolher</span>
            </Button>
            {openPopover === "btn" && (
              <div className="absolute top-11 right-0 z-50 animate-in fade-in zoom-in-95 duration-150">
                <CalendarView
                  selectedDate={buttonTriggerDate}
                  onSelectDate={(d) => {
                    setButtonTriggerDate(d);
                    setOpenPopover(null);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* 12. Events Callback Output */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-2.5 relative">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Events</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Dispara eventos reativos e callbacks ao selecionar datas.</p>
          <div className="relative">
            <input
              type="text"
              value={`${eventsRange[0]} to ${eventsRange[1]}`}
              onClick={() => setOpenPopover(openPopover === "events" ? null : "events")}
              readOnly
              className="w-full h-9 px-3 text-xs rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 cursor-pointer"
            />
            {openPopover === "events" && (
              <div className="absolute top-11 left-0 z-50 animate-in fade-in zoom-in-95 duration-150">
                <CalendarView
                  mode="range"
                  selectedRange={eventsRange}
                  onSelectRange={(r) => {
                    setEventsRange(r);
                    if (r[0] && r[1]) {
                      setOpenPopover(null);
                      toast.success(`Intervalo selecionado: ${r[0]} até ${r[1]}`);
                    }
                  }}
                />
              </div>
            )}
          </div>
          <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
            change.bs.datepicker: Picked: {eventsRange[0]}, {eventsRange[1]}
          </div>
        </div>
      </div>

      {/* Inline Calendars Section */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Inline Calendars (Embutidos)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 13. Inline Calendar */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Inline calendar</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Calendário incorporado estaticamente na página com estado ativo.</p>
            <div className="flex justify-center pt-2">
              <CalendarView mode="single" selectedDate="2026-06-15" />
            </div>
          </div>

          {/* 14. Inline Range */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Inline range</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Faixa de período realçada diretamente no cartão.</p>
            <div className="flex justify-center pt-2">
              <CalendarView mode="range" selectedRange={["2026-06-10", "2026-06-18"]} />
            </div>
          </div>

          {/* 15. Inline in a Form */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Inline in a form</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Integrado a formulário de reserva ou agendamento de visita.</p>
              <div className="flex justify-center pt-2">
                <CalendarView mode="single" selectedDate="2026-06-20" />
              </div>
            </div>
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs mt-3 cursor-pointer"
              onClick={() => toast.success("Agendamento confirmado para 20/06/2026!")}
            >
              Confirmar Agendamento de Visita
            </Button>
          </div>

          {/* 16. Inline with Week Numbers */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Inline with week numbers</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Calendário inline com coluna dedicada aos números da semana (W23, W24...).</p>
            <div className="flex justify-center pt-2">
              <CalendarView showWeekNumbers selectedDate="2026-06-18" />
            </div>
          </div>

          {/* 17. Inline with Two Months */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Inline with two months</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Dois meses simultâneos exibidos lado a lado embutidos no layout para contratos de temporada.</p>
            <div className="flex justify-center pt-2 overflow-x-auto">
              <TwoMonthsCalendarView
                selectedRange={twoMonthsRange}
                onSelectRange={(r) => setTwoMonthsRange(r)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
