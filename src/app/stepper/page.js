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
import { useRouter } from "next/navigation";

export default function StepperPage() {
    const [currentStep, setCurrentStep] = useState(0); // Active step
    const [formValues, setFormValues] = useState({}); // Form data for all steps
    const [formStep, setFormStep] = useState(FormData); // Steps configuration
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

    // Add a new dynamic step
    useEffect(() => {
        const updateStepData = {
            heading: "Step 4",
            description: "Step 4 description",
            fields: [{ name: "summary", label: "Summary", type: "textarea" }],
        };
        setFormStep((prev) => [...prev, updateStepData]);
    }, []);

    // Add Step 5 for success message
    const handleNext = async () => {
        const isValid = await trigger(); // Validate current step fields
        if (isValid) {
            const currentStepData = watch(); // Get data from the current step

            setFormValues((prev) => ({
                ...prev,
                [currentStep]: currentStepData, // Store current step data
            }));
            setCurrentStep((prev) => prev + 1); // Go to the next step
            setTimeout(() => reset(formValues[currentStep + 1] || {}), 0); // Reset form for next step
        }
    };

    const handleBack = () => {
        const currentStepData = watch();
        setFormValues((prev) => ({
            ...prev,
            [currentStep]: currentStepData,
        }));
        setCurrentStep((prev) => prev - 1);
        setTimeout(() => reset(formValues[currentStep - 1] || {}), 0); // Reset form for previous step
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
        delete finalData[Object.keys(finalData).length - 1]; // Remove extra empty key
        successMsg("Your form was successfully submitted!");
        setCurrentStep(formStep.length); // Go to the success step after submission
    };

    const handleReset = () => {
        setCurrentStep(0);
        setFormValues({});
        reset({});
    };

    const isStepOptional = (step) => step === 1; // Example: Step 2 is optional

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
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            Booking Completed - Your reservation is confirmed!
                        </Typography>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            <strong className="!text-2xl"> Your booking has been successfully completed. Thank you for choosing our service!</strong>
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <Box sx={{ flex: "1 1 auto" }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <form onSubmit={handleSubmit(onSubmit)} className="my-12">
                            <Grid container maxWidth="lg" spacing={4}>
                                {formStep[currentStep]?.fields?.map((field, index) => (

                                    <Grid item xs={currentStep == 2 ? 12 : 6} sm={currentStep == 2 ? 12 : 6} key={index} className="mt-4">
                                        <DynamicFormInput control={control} field={field} errors={errors} />
                                    </Grid>
                                ))}
                            </Grid>

                            {currentStep === formStep.length - 1 && (
                                <Grid item xs={12}>
                                    <Typography
                                        variant="h4"
                                        gutterBottom
                                        className="text-blue-500 text-center"
                                    >
                                        Confirm your Details
                                    </Typography>
                                    {Object.entries(formValues).map(([step, values], idx) => (
                                        <Box key={idx} sx={{ my: 4 }}>
                                            <Card elevation={3} sx={{ p: 2 }}>
                                                <CardContent>
                                                    <Typography variant="h6" sx={{ mb: 1 }}>
                                                        Step {parseInt(step) + 1} Data
                                                    </Typography>
                                                    <Divider sx={{ mb: 3 }} />
                                                    <Grid container spacing={2}>
                                                        {Object.entries(values).map(([fieldName, fieldValue], fieldIdx) => {
                                                            // Find the field definition to get the label
                                                            const fieldDefinition = formStep[step]?.fields?.find(
                                                                (field) => field.name === fieldName
                                                            );
                                                            const label = fieldDefinition?.label || fieldName; // Fallback to fieldName if label is not found

                                                            return (
                                                                <Grid item xs={12} sm={6} key={fieldIdx}>
                                                                    <Typography variant="body1">
                                                                        <strong>{label}:</strong> {fieldValue}
                                                                    </Typography>
                                                                </Grid>
                                                            );
                                                        })}
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    ))}

                                </Grid>
                            )}

                            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={currentStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: "1 1 auto" }} />
                                {isStepOptional(currentStep) && (
                                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                )}
                                {currentStep < formStep.length - 1 && (
                                    <Button onClick={handleNext}>Next</Button>
                                )}
                                {currentStep === formStep.length - 1 && (
                                    <Button type="submit" variant="contained">
                                        Submit
                                    </Button>
                                )}
                            </Box>
                        </form>
                    </React.Fragment>
                )}
            </Box>
        </Container>
    );
}
