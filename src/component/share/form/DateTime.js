"use client";

import React from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { Controller } from "react-hook-form";
import { FormControl } from "@mui/material";

const DateTimePickerController = ({ name, control, slots, errors, validation }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight for comparison
    const currentTime = new Date();

    const combineDateAndTime = (date, time) => {
        const [hours, minutes] = time.split(":").map(Number);
        const combined = new Date(date);
        combined.setHours(hours, minutes, 0, 0);
        return combined;
    };

    const transformSlots = (slots) =>
        slots
            ?.filter((slot) => slot.enable)
            ?.map((slot) => {
                const start = combineDateAndTime(today, slot.startTime);
                const end = combineDateAndTime(today, slot.endTime);
                if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                    console.error(`Invalid time value: start=${slot.startTime}, end=${slot.endTime}`);
                    return null;
                }
                return {
                    id: `${today.toISOString().split("T")[0]}-${slot.slotId}`,
                    startTime: start,
                    endTime: end,
                };
            })
            .filter(Boolean) || [];

    const generateDefaultSlots = (date) => {
        return Array.from({ length: 1 }, (_, i) => {
            const hour = i + 1;
            const time = hour < 10 ? `0${hour}:00` : `${hour}:00`;
            const start = combineDateAndTime(date, time);
            const end = new Date(start.getTime() + 60 * 60000); // Add 1 hour
            return { id: `${date.toISOString().split("T")[0]}-${time}`, startTime: start, endTime: end, available: true };
        });
    };

    const futureDatesWithDefaults = Array.from({ length: 30 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return i === 0 ? [] : generateDefaultSlots(date); // Exclude today's default slots
    }).flat();

    const availableTimeslots = transformSlots(slots).filter(
        (slot) =>
            slot.startTime > currentTime || // Exclude past slots today
            slot.startTime.toISOString().split("T")[0] !== today.toISOString().split("T")[0]
    );

    const allTimeslots = [...availableTimeslots, ...futureDatesWithDefaults];

    return (
        <FormControl fullWidth>
            <Controller
                name={name}
                control={control}
                rules={validation}
                render={({ field: { onChange } }) => (
                    <ScheduleMeeting
                        borderRadius={10}
                        primaryColor="#4199f0"
                        eventDurationInMinutes={30}
                        availableTimeslots={allTimeslots}
                        onStartTimeSelect={(selectedSlot) => {
                            const istDate = new Date(selectedSlot.startTime);
                            istDate.setMinutes(istDate.getMinutes() + istDate.getTimezoneOffset() + 330); // Convert to IST (+5:30)

                            const date = istDate.toISOString().split("T")[0]; // Extract date in YYYY-MM-DD format
                            const time = istDate.toTimeString().split(" ")[0].substring(0, 5); // Extract time in HH:MM format

                            console.log("datetime (IST):", `${date}, ${time}`);
                            onChange(`${date}, ${time}`);
                        }}
                    />
                )}
            />
            {errors?.[name] && <p style={{ color: "#c22626" }}>{errors[name]?.message}</p>}
        </FormControl>
    );
};

export default DateTimePickerController;
