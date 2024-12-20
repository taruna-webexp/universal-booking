"use client";

import React from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { Controller } from "react-hook-form";
import { FormControl } from "@mui/material";

const DateTimePickerController = ({ name, control, slot, errors, validation }) => {
    // Generate default slots for dates not in the API data
    const generateDefaultSlots = (date) => {
        return Array.from({ length: 12 }, (_, i) => {
            const hour = i + 1;
            const time = hour < 10 ? `0${hour}:00` : `${hour}:00`;
            const start = new Date(`${date}T${time}:00`);
            const end = new Date(start.getTime() + 60 * 60000); // Add 1 hour
            return { id: `${date}-${time}`, startTime: start, endTime: end, available: true };
        });
    };

    // Transform slot data into available timeslots
    const availableTimeslots = Object.entries(slot).flatMap(([date, { fullDayBooked, slots }]) => {
        if (fullDayBooked) return [];
        return slots
            .filter((s) => s.available)
            .map((s) => {
                const start = new Date(`${date}T${s.time}:00Z`);
                return { id: `${date}-${s.time}`, startTime: start, endTime: new Date(start.getTime() + 30 * 60000) };
            });
    });

    // Add future dates with default slots for the next 1 year
    const today = new Date();
    const futureDatesWithDefaults = Array.from({ length: 365 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateString = date.toISOString().split("T")[0];
        return slot[dateString] ? [] : generateDefaultSlots(dateString);
    }).flat();

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
                            const date = selectedSlot.startTime.toISOString().split("T")[0];
                            const time = selectedSlot.startTime.toISOString().split("T")[1].substring(0, 5);
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
