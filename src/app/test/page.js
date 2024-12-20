"use client";
import React from "react";
import { ScheduleMeeting } from "react-schedule-meeting";

export default function Example() {
    const formData = {
        heading: "Step 3",
        description: "Step 3 description",
        fields: [
            {
                name: "dateTime",
                type: "calendar",
                step: 3,
                label: "Pick date & time",
                value: "",
                slot: {
                    "2024-12-18": {
                        fullDayBooked: false,
                        slots: [
                            { time: "09:00", available: true },
                            { time: "10:00", available: false },
                            { time: "11:00", available: true },
                            { time: "12:00", available: true },
                        ],
                    },
                    "2024-12-19": {
                        fullDayBooked: true,
                        slots: [],
                    },
                    "2024-12-20": {
                        fullDayBooked: false,
                        slots: [
                            { time: "03:00", available: true },
                            { time: "04:00", available: true },
                            { time: "07:00", available: false },
                        ],
                    },
                    "2024-12-21": {
                        fullDayBooked: false,
                        slots: [
                            { time: "09:00", available: true },
                            { time: "10:00", available: true },
                            { time: "11:00", available: true },
                            { time: "16:00", available: true },
                            { time: "17:00", available: true },
                        ],
                    },
                    "2024-12-22": {
                        fullDayBooked: true,
                        slots: [],
                    },
                    "2024-12-25": {
                        fullDayBooked: false,
                        slots: [
                            { time: "09:00", available: true },
                            { time: "10:00", available: true },
                            { time: "11:00", available: true },
                            { time: "16:00", available: true },
                            { time: "17:00", available: true },
                        ],
                    },
                },
                required: true,
            },
        ],
    };

    // Transform slot data into availableTimeslots based on the slot key
    const slotData = formData.fields[0].slot;
    const availableTimeslots = Object.entries(slotData).flatMap(([date, { fullDayBooked, slots }]) => {
        if (fullDayBooked) return []; // Skip fully booked dates
        return slots
            .filter((slot) => slot.available) // Include only available slots
            .map((slot) => ({
                id: `${date}-${slot.time}`, // Unique ID for the timeslot
                startTime: new Date(`${date}T${slot.time}:00Z`), // Parse start time
                endTime: new Date(new Date(`${date}T${slot.time}:00Z`).getTime() + 30 * 60000), // Add 30 minutes
            }));
    });


    // Handle selected time slot
    const handleTimeSelect = (selectedSlot) => {
        const date = selectedSlot.startTime.toISOString().split("T")[0]; // Extract date
        const time = selectedSlot.startTime.toISOString().split("T")[1].substring(0, 5); // Extract time (HH:mm)
    };

    return (
        <ScheduleMeeting
            borderRadius={10}
            primaryColor="#3f5b85"
            eventDurationInMinutes={30}
            availableTimeslots={availableTimeslots}
            onStartTimeSelect={handleTimeSelect}
        />
    );
}
