"use client";

import React from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { Controller } from "react-hook-form";

const DateTimePickerController = ({ name, control, slot }) => {
    // Transform slot data into availableTimeslots
    const availableTimeslots = Object.entries(slot).flatMap(([date, { fullDayBooked, slots }]) => {
        if (fullDayBooked) return []; // Skip fully booked dates
        return slots
            .filter((slot) => slot.available) // Include only available slots
            .map((slot) => ({
                id: `${date}-${slot.time}`, // Unique ID for the timeslot
                startTime: new Date(`${date}T${slot.time}:00Z`), // Parse start time
                endTime: new Date(new Date(`${date}T${slot.time}:00Z`).getTime() + 30 * 60000), // Add 30 minutes
            }));
    });

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange } }) => (
                <ScheduleMeeting
                    borderRadius={10}
                    primaryColor="#3f5b85"
                    eventDurationInMinutes={30}
                    availableTimeslots={availableTimeslots}
                    onStartTimeSelect={(selectedSlot) => {
                        // Extract and format the selected date and time
                        const date = selectedSlot.startTime.toISOString().split("T")[0]; // YYYY-MM-DD
                        const time = selectedSlot.startTime.toISOString().split("T")[1].substring(0, 5); // HH:mm
                        const selectedDateTime = { date, time };
                        console.log(`Selected Date: ${date}, Selected Time: ${time}`);
                        onChange(selectedDateTime); // Update form state
                    }}
                />
            )}
        />
    );
};

export default DateTimePickerController;
