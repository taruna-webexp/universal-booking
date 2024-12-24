"use client";

import React from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { Controller } from "react-hook-form";
import { FormControl } from "@mui/material";

const DateTimePickerController = ({ name, control, slot, errors, validation }) => {
    console.log("Slot data received:", slot);

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];  // e.g., "2024-12-20"

    // Helper function to convert time string to full date-time
    const convertToDateTime = (time) => {
        const [hours, minutes] = time.split(":");
        const date = new Date(today);  // Set to today's date
        date.setHours(hours, minutes, 0, 0);  // Set the hours and minutes
        return date.toISOString();  // Convert to ISO string
    };

    // Handle slot data, ensuring valid startTime and endTime are set
    const availableTimeslots = slot
        .filter((s) => s.enable) // Only include enabled slots
        .map((s) => {
            // Convert start and end times using the provided slot times
            const startTime = convertToDateTime(s.startTime);
            const endTime = convertToDateTime(s.endTime);

            // Generate a unique ID for each slot based on today's date and start time
            const slotId = `${today}-${s.startTime}`;

            // Return the slot in the correct format
            return {
                id: slotId,
                startTime: startTime,  // Full ISO 8601 start time
                endTime: endTime       // Full ISO 8601 end time
            };
        });

    console.log("Valid timeslots:", availableTimeslots);

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
                        availableTimeslots={availableTimeslots} // Pass the valid timeslots here
                        onStartTimeSelect={(selectedSlot) => {
                            console.log("Selected Slot:", selectedSlot);  // Log the entire selectedSlot object

                            let startTime = selectedSlot.startTime;

                            // If startTime is a Date object, convert it to a string
                            if (startTime instanceof Date) {
                                startTime = startTime.toISOString(); // Convert Date object to ISO string
                            }

                            if (typeof startTime === "string") {
                                const date = startTime.split("T")[0];  // Extract date part
                                const time = startTime.split("T")[1].substring(0, 5);  // Extract time part
                                const selectedDateTime = { date, time };  // Create a structured object
                                console.log(`Selected Date: ${date}, Selected Time: ${time}`);
                                onChange(selectedDateTime);  // Send the selected date and time to the parent
                            } else {
                                console.error("startTime is not a string", startTime);  // Log if it's not a string
                            }
                        }}
                    />
                )}
            />
            {/* {errors?.[name] && <p style={{ color: "#c22626" }}>{errors[name]?.message}</p>} */}
        </FormControl>
    );
};

export default DateTimePickerController;
