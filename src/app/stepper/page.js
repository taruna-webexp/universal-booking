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
import CheckIcon from '@mui/icons-material/Check';
export default function StepperPage() {
    const [currentStep, setCurrentStep] = useState(0); // Active step
    const [formValues, setFormValues] = useState({}); // Form data for all steps
    const [formStep, setFormStep] = useState(FormData); // Steps configuration
    console.log("formStep", formStep);
    const [isPayment, setPayment] = useState(false)
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
    const hasPaymentMode = formStep.some(step =>
        step.fields.some(field => field.type === "paymentMode")
    );
    // Add a new dynamic step
    useEffect(() => {

        setFormStep((prev) => [...prev]);
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

    //back step  handler
    const handleBack = () => {
        const currentStepData = watch();
        setFormValues((prev) => ({
            ...prev,
            [currentStep]: currentStepData,
        }));
        setCurrentStep((prev) => prev - 1);
        setTimeout(() => reset(formValues[currentStep - 1] || {}), 0); // Reset form for previous step
    };

    //skip step  handler
    const handleSkip = () => {
        if (!isStepOptional(currentStep)) {
            errorMsg("You can't skip a step that isn't optional.");
            return;
        }
        setCurrentStep((prev) => prev + 1);
    };

    //form 
    const onSubmit = (data) => {
        const finalData = { ...formValues, [currentStep]: data };
        delete finalData[Object.keys(finalData).length - 1]; // Remove extra empty key
        successMsg("Your booking has been successfully completed");
        setCurrentStep(formStep.length); // Go to the success step after submission
    };

    //reset step handler
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
                        <div style={{ textAlign: "center", marginTop: "40px" }}>
                            <p style={{ margin: "0 auto", width: "60px", padding: "5px" }} className="rounded-full bg-green-400"><CheckIcon className="text-green-700 !font-black !text-5xl" fontSize="large" /></p>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                Booking Completed - Your reservation is confirmed!
                            </Typography>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                <strong className="!text-2xl"> Your booking has been successfully completed.<br />
                                    <span className="text-green-600 text-3xl">Thank you </span>for choosing our service!</strong>
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                <Box sx={{ flex: "1 1 auto" }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <form onSubmit={handleSubmit(onSubmit)} className="my-12">
                            {currentStep === formStep.length - 1 && (
                                <Grid item xs={12}>
                                    <Typography
                                        variant="h4"
                                        gutterBottom
                                        className="text-blue-500 text-center"
                                    >
                                        Confirm your Details
                                    </Typography>
                                    {Object.entries(formValues).map(([step, values], idx) => {
                                        //remove the last index if length big 3
                                        if (Object.keys(formValues).length > 3) {
                                            const keys = Object.keys(formValues);
                                            const lastKey = keys[keys.length - 1];
                                            delete formValues[lastKey]; // Remove the last key
                                        }

                                        console.log("Updated formValues:", formValues); // This will now log the modified formValues

                                        return (
                                            <Box key={idx} sx={{ my: 4 }}>
                                                <Card elevation={3} sx={{ p: 2 }}>
                                                    <CardContent>
                                                        <Typography variant="h6" sx={{ mb: 1 }}>
                                                            Booking {parseInt(step) + 1} Details
                                                        </Typography>
                                                        <Divider sx={{ mb: 3 }} />
                                                        <Grid container spacing={2}>
                                                            {Object.entries(values).map(([fieldName, fieldValue], fieldIdx) => {
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
                                        );
                                    })}



                                </Grid>
                            )}
                            <Grid container maxWidth="lg" spacing={4}>
                                {formStep[currentStep]?.fields?.map((field, index) => (

                                    <Grid item xs={currentStep == 2 ? 12 : 6} sm={currentStep == 2 ? 12 : 6} key={index} className="mt-4">
                                        <DynamicFormInput control={control} field={field} errors={errors} setPayment={setPayment} />
                                    </Grid>
                                ))}
                            </Grid>



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
                                    isPayment || !hasPaymentMode ? (
                                        <Button type="submit" variant="contained">
                                            Submit
                                        </Button>
                                    ) : (
                                        <Button type="submit" variant="contained" disabled>
                                            Submit
                                        </Button>
                                    )
                                )}

                            </Box>
                        </form>
                    </React.Fragment>
                )}
            </Box>
        </Container >
    );
}
