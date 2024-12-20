"use client";

import React, { useEffect } from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { Controller } from "react-hook-form";
import { FormControl, Grid } from "@mui/material";
import DynamicFormInput from "@/component/stepper/DynamicFormInput";
import { useState } from "react";

const DateTimePickerController = ({ name, control, slot, subfield, errors, validation }) => {

    const [isSelected, setIsSelected] = useState(false)

    // console.log("mySubfield", JSON.parse(formattedData))
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
        <>
            <FormControl fullWidth>
                <Controller
                    name={name}
                    control={control}
                    rules={validation} // Apply validation rules
                    error={!!errors?.[name]}
                    helperText={errors?.[name]?.message} // Display validation error message

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
                                const selectedDateTime = `${date}, ${time}`;
                                console.log(`Selected Date: ${date}, Selected Time: ${time}`);
                                setIsSelected(true)
                                onChange(selectedDateTime); // Update form state
                            }}
                        />
                    )}

                />
                {errors?.[name] && (
                    <p style={{ color: "#c22626" }}>{errors[name]?.message}</p>
                )}
            </FormControl>
            {
                isSelected &&
                subfield.map((field, index) => (<>
                    <Grid key={index} className="mt-4 !mb-4">
                        <DynamicFormInput
                            control={control}
                            field={field}
                            errors={errors}
                        />
                    </Grid>
                </>

                ))}
        </>
    );
};

export default DateTimePickerController;
