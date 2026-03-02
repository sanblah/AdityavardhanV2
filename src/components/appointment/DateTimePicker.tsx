"use client";

import { useState, useMemo } from "react";

const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
];

interface DateTimePickerProps {
    selectedDate: string | null;
    selectedTime: string | null;
    onDateSelect: (date: string) => void;
    onTimeSelect: (time: string) => void;
}

export function DateTimePicker({
    selectedDate,
    selectedTime,
    onDateSelect,
    onTimeSelect,
}: DateTimePickerProps) {
    const [currentMonth, setCurrentMonth] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });

    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    const daysInMonth = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        return { firstDay, totalDays };
    }, [currentMonth]);

    const monthLabel = currentMonth.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    const navigateMonth = (dir: number) => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() + dir, 1)
        );
    };

    const formatDate = (day: number) => {
        const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        return d.toISOString().split("T")[0];
    };

    const isDatePast = (day: number) => {
        const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        return d < today;
    };

    return (
        <div className="grid gap-12 md:grid-cols-2">
            {/* Calendar */}
            <div>
                <div className="mb-6 flex items-center justify-between">
                    <button
                        onClick={() => navigateMonth(-1)}
                        className="font-heading text-sm text-brand-white/50 transition-colors hover:text-brand-white"
                    >
                        ←
                    </button>
                    <span className="font-heading text-sm uppercase tracking-[0.2em] text-brand-white">
                        {monthLabel}
                    </span>
                    <button
                        onClick={() => navigateMonth(1)}
                        className="font-heading text-sm text-brand-white/50 transition-colors hover:text-brand-white"
                    >
                        →
                    </button>
                </div>

                {/* Day headers */}
                <div className="mb-2 grid grid-cols-7 gap-1">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                        <div
                            key={d}
                            className="py-2 text-center font-body text-[10px] uppercase tracking-widest text-brand-white/30"
                        >
                            {d}
                        </div>
                    ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: daysInMonth.firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: daysInMonth.totalDays }).map((_, i) => {
                        const day = i + 1;
                        const dateStr = formatDate(day);
                        const isPast = isDatePast(day);
                        const isSelected = selectedDate === dateStr;

                        return (
                            <button
                                key={day}
                                disabled={isPast}
                                onClick={() => onDateSelect(dateStr)}
                                className={`aspect-square flex items-center justify-center font-body text-sm transition-all duration-200 ${
                                    isPast
                                        ? "text-brand-white/15 cursor-not-allowed"
                                        : isSelected
                                          ? "bg-brand-gold text-brand-black"
                                          : "text-brand-white/70 hover:bg-brand-white/10"
                                }`}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Time Slots */}
            <div>
                <p className="mb-6 font-heading text-sm uppercase tracking-[0.2em] text-brand-white">
                    Available Times
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((time) => (
                        <button
                            key={time}
                            onClick={() => onTimeSelect(time)}
                            className={`py-3 text-center font-body text-sm transition-all duration-200 border ${
                                selectedTime === time
                                    ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                                    : "border-brand-white/10 text-brand-white/60 hover:border-brand-white/20"
                            }`}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
