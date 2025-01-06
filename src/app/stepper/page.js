"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import DynamicFormInput from "@/component/stepper/DynamicFormInput";
import { successMsg, errorMsg } from "@/component/toaster/msg/toaster";
import { FormData } from "@/service/formData";
import CheckIcon from "@mui/icons-material/Check";
import Link from "next/link";

export default function StepperPage() {
    const [currentStep, setCurrentStep] = useState(0); // Active step
    const [formValues, setFormValues] = useState({}); // Form data for all steps
    const [formStep, setFormStep] = useState(FormData); // Steps configuration
    const [isPayment, setPayment] = useState(false);
    const [bookingLink, setBookingLink] = useState("");

    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
        trigger,
    } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
    });

    //payment mode
    const hasPaymentMode = formStep.some((step) =>
        step.fields.some((field) => field.type === "paymentMode")
    );

    useEffect(() => {
        setFormStep((prev) => [...prev]);
    }, []);

    //
    const handleStipperNext = async () => {
        const isValid = await trigger();
        if (isValid) {
            const currentStepData = watch();
            console.log("Current step data:", currentStepData); // Log here
            setFormValues((prev) => ({
                ...prev,
                [currentStep]: currentStepData,
            }));
            setCurrentStep((prev) => prev + 1);
            setTimeout(() => reset(formValues[currentStep + 1] || {}), 0);
        }
    };

    const handleStipperBack = () => {
        const currentStepData = watch();
        setFormValues((prev) => ({
            ...prev,
            [currentStep]: currentStepData,
        }));
        setCurrentStep((prev) => prev - 1);
        setTimeout(() => reset(formValues[currentStep - 1] || {}), 0);
    };

    const handleStipperSkip = () => {
        if (!isStepOptional(currentStep)) {
            errorMsg("You can't skip a step that isn't optional.");
            return;
        }
        setCurrentStep((prev) => prev + 1);
    };

    //Form submit handler
    const onSubmit = (data) => {
        const finalData = { ...formValues, [currentStep]: data };
        const { textField, email, selectField, address } = finalData[0];
        const { title, phone, selectSeat, description } = finalData[1];
        const { dateTime } = finalData[2];

        // Function to parse and adjust date-time to IST
        const parseToIST = (dateTimeStr) => {
            const [datePart, timePart] = dateTimeStr.split(", ");
            const date = new Date(`${datePart}T${timePart}`);
            if (isNaN(date)) {
                throw new Error("Invalid date-time format.");
            }
            // Convert to IST directly
            const istDate = new Date(
                date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
            );
            return istDate;
        };

        // Get local start time in IST
        const startIST = parseToIST(dateTime);

        // Calculate the end time by adding 30 minutes
        const endIST = new Date(startIST);
        endIST.setMinutes(startIST.getMinutes() + 30);

        // Format date-time for Google Calendar (YYYYMMDDTHHmmssZ)
        const formatForCalendar = (date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            return `${year}${month}${day}T${hours}${minutes}00`;
        };

        const startCalendar = formatForCalendar(startIST);
        const endCalendar = formatForCalendar(endIST);

        // Construct the event details
        const eventTitle = `${title} - Service by ${textField}`;
        const eventDetails = `
            Name: ${textField}
            Email: ${email}
            Phone: ${phone}
            Description: ${description}
            Address: ${address}
          
        `;

        // Generate the google calendar link
        const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
            eventTitle
        )}&dates=${startCalendar}/${endCalendar}&details=${encodeURIComponent(
            eventDetails
        )}&location=${encodeURIComponent(address)}`;

        setCurrentStep(formStep.length);
        setBookingLink(calendarLink);
        successMsg("Your booking has been successfully completed");
    };

    const handleReset = () => {
        setCurrentStep(0);
        setFormValues({});
        reset({});
    };
    const handlePaymentSuccess = () => {
        // If payment mode is enabled, trigger form submission automatically after payment success
        if (hasPaymentMode) {
            handleSubmit(onSubmit)(); // Submit form automatically
        } else {
            setPayment(true); // Otherwise, allow manual form submission
        }
    };

    //Optional step
    const isStepOptional = (step) => step === 1;

    return (
        <Container maxWidth="xl" className="mt-12">
            <Box sx={{ width: "100%" }}>
                <Stepper activeStep={currentStep}>
                    {formStep?.map((step, index) => (
                        <Step key={step.heading}>
                            <StepLabel>{step.heading}</StepLabel>
                        </Step>
                    ))}
                    <Step>
                        <StepLabel>Booking Success</StepLabel>
                    </Step>
                </Stepper>

                {currentStep === formStep.length ? (
                    <Box textAlign="center" mt={4}>
                        <Box
                            sx={{ margin: "0 auto", width: "60px", padding: "5px" }}
                            className="rounded-full bg-green-400"
                        >
                            <CheckIcon
                                className="text-green-700 !font-black !text-5xl"
                                fontSize="large"
                            />
                        </Box>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            Booking Completed - Your reservation is confirmed!
                        </Typography>

                        <Typography sx={{ mt: 2, mb: 1 }}>
                            <strong className="!text-2xl">
                                Your booking has been successfully completed.
                                <br />
                                <span className="text-green-600 text-3xl">Thank you </span>for
                                choosing our service!
                            </strong>
                        </Typography>

                        <div className="flex justify-center items-center">
                            <Link
                                href={bookingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3 px-6 py-3 border border-gray-300 rounded-lg shadow-md text-blue-600 hover:bg-gray-100 hover:border-blue-400 transition-all duration-200"
                            >
                                <img
                                    src="/calendar.webp"
                                    alt="Calendar Icon"
                                    className="w-7 h-6"
                                />
                                <span className="font-medium text-sm md:text-base">
                                    Schedule Booking in Calendar
                                </span>
                            </Link>
                        </div>

                        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <Box sx={{ flex: "1 1 auto" }} />
                            <Button
                                style={{ backgroundColor: "#1976d2", color: "white" }}
                                onClick={handleReset}
                            >
                                Back to home
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="my-12">
                        {currentStep === formStep.length - 1 && (
                            <Box>
                                <Typography
                                    variant="h4"
                                    gutterBottom
                                    className="text-blue-500 text-center"
                                >
                                    Confirm your Details
                                </Typography>
                                <Grid container spacing={2} className="relative">
                                    <Grid item xs={12} sm={12} className="previewFormDiv">
                                        <Card sx={{ p: 2 }}>
                                            <CardContent>
                                                {Object.entries(formValues).map(
                                                    ([step, values], idx) => {
                                                        //remove the last index if length big 3
                                                        if (Object.keys(formValues).length > 3) {
                                                            const keys = Object.keys(formValues);
                                                            const lastKey = keys[keys.length - 1];
                                                            delete formValues[lastKey]; // Remove the last key
                                                        }

                                                        return (
                                                            <Box key={idx}>
                                                                <Divider sx={{ mb: 3 }} />
                                                                <Grid container spacing={2}>
                                                                    {Object.entries(values).map(
                                                                        ([fieldName, fieldValue], fieldIdx) => {
                                                                            const fieldDefinition = formStep[
                                                                                step
                                                                            ]?.fields?.find(
                                                                                (field) => field.name === fieldName
                                                                            );
                                                                            const label =
                                                                                fieldDefinition?.label || fieldName;
                                                                            return (
                                                                                <Grid item xs={6} sm={6} key={fieldIdx}>
                                                                                    <Typography variant="body1">
                                                                                        <strong>{label}:</strong>{" "}
                                                                                        {fieldValue}
                                                                                    </Typography>
                                                                                </Grid>
                                                                            );
                                                                        }
                                                                    )}
                                                                </Grid>
                                                            </Box>
                                                        );
                                                    }
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                        <Grid container spacing={4}>
                            {formStep[currentStep]?.fields?.map((field, index) => (
                                <Grid
                                    item
                                    xs={currentStep === 2 || currentStep === 3 ? 12 : 6}
                                    sm={currentStep === 2 || currentStep === 3 ? 12 : 6}
                                    key={index}
                                    // className="mt-4"
                                    className={`${currentStep == 3 ? "paymentMethodDiv" : "mt-4"
                                        }`}
                                >
                                    <DynamicFormInput
                                        control={control}
                                        field={field}
                                        errors={errors}
                                        handlePaymentSuccess={handlePaymentSuccess}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <Button
                                style={{
                                    backgroundColor: currentStep !== 0 ? "#1976d2" : "",
                                    color: currentStep !== 0 ? "white" : "",
                                }}
                                color="inherit"
                                disabled={currentStep === 0}
                                onClick={handleStipperBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: "1 1 auto" }} />
                            {isStepOptional(currentStep) && (
                                <Button
                                    color="inherit"
                                    onClick={handleStipperSkip}
                                    sx={{ mr: 1 }}
                                    style={{ backgroundColor: "#1976d2", color: "white" }}
                                >
                                    Skip
                                </Button>
                            )}
                            {currentStep < formStep.length - 1 && (
                                <Button
                                    style={{ backgroundColor: "#1976d2", color: "white" }}
                                    onClick={handleStipperNext}
                                >
                                    Next
                                </Button>
                            )}
                            {currentStep === formStep.length - 1 &&
                                (isPayment ||
                                    (!hasPaymentMode && (
                                        <Button type="submit" variant="contained">
                                            Submit
                                        </Button>
                                    )))}
                        </Box>
                    </form>
                )}
            </Box>
        </Container>
    );
}
