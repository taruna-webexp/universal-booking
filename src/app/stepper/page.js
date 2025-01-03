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
    Tooltip,
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
    const [bookingLink, setBookingLink] = useState("")
    console.log("currentStep", currentStep);
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

    const hasPaymentMode = formStep.some((step) =>
        step.fields.some((field) => field.type === "paymentMode")
    );

    useEffect(() => {
        setFormStep((prev) => [...prev]);
    }, []);

    const handleNext = async () => {
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

    const handleBack = () => {
        const currentStepData = watch();
        setFormValues((prev) => ({
            ...prev,
            [currentStep]: currentStepData,
        }));
        setCurrentStep((prev) => prev - 1);
        setTimeout(() => reset(formValues[currentStep - 1] || {}), 0);
    };

    const handleSkip = () => {
        if (!isStepOptional(currentStep)) {
            errorMsg("You can't skip a step that isn't optional.");
            return;
        }
        setCurrentStep((prev) => prev + 1);
    };

    const onSubmit = (data) => {
        const finalData = { ...formValues, [currentStep]: data };
        console.log("myyyy", finalData);

        // Remove the last step data from finalData
        delete finalData[Object.keys(finalData).length - 1];

        // Extracting the data from finalData
        const { textField, email, selectField, address } = finalData[0];
        const { title, phone, selectSeat, description } = finalData[1];
        const { dateTime } = finalData[2];

        // Function to convert dateTime from string to Date object (handling AM/PM and converting to 24-hour format)
        const convertTo24HourFormat = (dateStr) => {
            const [date, time] = dateStr.split(", ");
            const [hour, minute] = time.split(":");
            const parsedHour = parseInt(hour, 10);

            // If the time is in the PM, adjust it to 24-hour format
            const hourIn24 = parsedHour >= 12 ? parsedHour : parsedHour + 12; // 12 PM and beyond should not change, else add 12 for PM
            const formattedDateStr = `${date}T${hourIn24}:${minute}:00`;

            return new Date(formattedDateStr); // Convert to a Date object
        };

        // Parse local start time from dateTime
        const localStartTime = convertTo24HourFormat(dateTime);
        console.log("localStartTime", localStartTime);

        // Calculate the end time by adding 30 minutes
        const localEndTime = new Date(localStartTime);
        localEndTime.setMinutes(localStartTime.getMinutes() + 30); // Add 30 minutes for the end time

        // Adjust time to IST (Indian Standard Time: UTC +5:30)
        const adjustToIST = (date) => {
            const istDate = new Date(date);
            istDate.setHours(istDate.getHours() + 5);
            istDate.setMinutes(istDate.getMinutes() + 30); // IST is UTC +5:30
            return istDate;
        };

        // Adjust both start and end time to IST
        const startDateIST = adjustToIST(localStartTime);
        const endDateIST = adjustToIST(localEndTime);
        console.log("start IST", startDateIST);
        console.log("end IST", endDateIST);

        // Format IST date to Google Calendar's required format (YYYYMMDDTHHmmssZ)
        const formatToGoogleCalendar = (date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero for single digit months
            const day = date.getDate().toString().padStart(2, "0"); // Add leading zero for single digit days
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            return `${year}${month}${day}T${hours}${minutes}00`;
        };

        const startDateForGoogle = formatToGoogleCalendar(startDateIST);
        const endDateForGoogle = formatToGoogleCalendar(endDateIST);

        // Construct the event title and details
        const eventTitle = `${title} - Service by ${textField}`;
        const eventDetails = `
            Name: ${textField}
            Email: ${email}
            Phone: ${phone}
            Description: ${description}
            Address: ${address}
            date:${dateTime}
        `;

        // Generate the Google Calendar link
        const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
            eventTitle
        )}&dates=${startDateForGoogle}/${endDateForGoogle}&details=${encodeURIComponent(
            eventDetails
        )}&location=${encodeURIComponent(address)}`;
        setCurrentStep(formStep.length);
        // Set the generated booking link
        setBookingLink(calendarLink);

        // Display success message
        successMsg("Your booking has been successfully completed");
        // setCurrentStep(0);
        // setFormValues({});
        // reset({});


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
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            You can view, edit, or manage your booking directly through the link below:
                            <Link className="text-blue-500" href={bookingLink}> View your booking</Link>
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <Box sx={{ flex: "1 1 auto" }} />
                            <Button
                                style={{ backgroundColor: "#1976d2", color: "white" }}
                                onClick={handleReset}
                            >
                                Reset
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
                                                {Object.entries(formValues).map(([step, values], idx) => {
                                                    //remove the last index if length big 3
                                                    if (Object.keys(formValues).length > 3) {
                                                        const keys = Object.keys(formValues);
                                                        const lastKey = keys[keys.length - 1];
                                                        delete formValues[lastKey]; // Remove the last key
                                                    }

                                                    console.log("Updated formValues:", formValues);
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
                                                                                    <strong>{label}:</strong> {fieldValue}
                                                                                </Typography>
                                                                            </Grid>
                                                                        );
                                                                    }
                                                                )}
                                                            </Grid>
                                                        </Box>
                                                    )
                                                })}
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
                                    color: currentStep !== 0 ? "white" : ""
                                }}

                                color="inherit"
                                disabled={currentStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: "1 1 auto" }} />
                            {isStepOptional(currentStep) && (
                                <Button
                                    color="inherit"
                                    onClick={handleSkip}
                                    sx={{ mr: 1 }}
                                    style={{ backgroundColor: "#1976d2", color: "white" }}
                                >
                                    Skip
                                </Button>
                            )}
                            {currentStep < formStep.length - 1 && (
                                <Button
                                    style={{ backgroundColor: "#1976d2", color: "white" }}
                                    onClick={handleNext}
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
        </Container >
    );
}
