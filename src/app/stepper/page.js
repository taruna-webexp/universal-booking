"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card, CardContent, Container, Divider, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import DynamicFormInput from "@/component/stepper/DynamicFormInput";
import { errorMsg, successMsg } from "@/component/toaster/msg/toaster";
import { FormData } from "@/service/formData";


export default function StepperPage() {
    const [activeStep, setActiveStep] = useState(0); // Track the current active step
    const [formValues, setFormValues] = useState({}); // Store form data for all steps

    const { control, handleSubmit, watch, reset, formState: { errors }, trigger } = useForm();

    const [formStep, setFormStep] = useState(FormData);

    useEffect(() => {
        const updateStepData = {
            heading: "Step 3",
            description: "Step 3 description",
            fields: [{ name: "summary", label: "Summary", type: "textarea" }],
        };
        setFormStep((prev) => [...prev, updateStepData]);
    }, []);

    const isStepOptional = (step) => step === 1;

    const handleNext = async () => {

        const currentStepData = watch(); // Get current step's form data
        setFormValues((prev) => ({ ...prev, [activeStep]: currentStepData })); // Save data for the current step
        setActiveStep((prev) => prev + 1); // Move to the next step
        reset(formValues[activeStep + 1] || {}); // Reset form with the next step's data

    };

    const handleBack = () => {
        const currentStepData = watch();
        setFormValues((prev) => ({ ...prev, [activeStep]: currentStepData }));
        setActiveStep((prev) => prev - 1);
        reset(formValues[activeStep - 1] || {});
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            errorMsg("You can't skip a step that isn't optional.");
        }
        setActiveStep((prev) => prev + 1);
    };

    const onSubmit = (data) => {
        console.log("Final Form Data:", { ...formValues, [activeStep]: data });
        successMsg("Your form was successfully submitted!");
    };

    const handleReset = () => {
        setActiveStep(0);
        setFormValues({});
        reset({});
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ width: "100%" }}>
                <Stepper activeStep={activeStep}>
                    {formStep?.map((step, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = <Typography variant="caption">Optional</Typography>;
                        }

                        return (
                            <Step key={step.heading} {...stepProps}>
                                <StepLabel {...labelProps}>{step.heading}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                {activeStep === formStep.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you are finished
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
                                {formStep[activeStep]?.fields?.map((field, index) => (
                                    <Grid item xs={12} sm={6} key={index} className="mt-4">
                                        <DynamicFormInput control={control} field={field} errors={errors} />
                                    </Grid>
                                ))}

                                {activeStep === formStep.length - 1 && (
                                    <Grid item xs={12}>
                                        <Typography variant="h4" gutterBottom className="text-blue-500 text-center">
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
                                                            {Object.entries(values).map(
                                                                ([fieldName, fieldValue], fieldIdx) => (
                                                                    <Grid item xs={12} sm={6} key={fieldIdx}>
                                                                        <Typography variant="body1">
                                                                            <strong>{fieldName}:</strong>{" "}
                                                                            {fieldValue}
                                                                        </Typography>
                                                                    </Grid>
                                                                )
                                                            )}
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Box>
                                        ))}
                                    </Grid>
                                )}
                            </Grid>

                            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                                    Back
                                </Button>
                                <Box sx={{ flex: "1 1 auto" }} />
                                {isStepOptional(activeStep) && (
                                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                )}
                                {activeStep < formStep.length - 1 && (
                                    <Button onClick={handleNext}>Next</Button>
                                )}
                                {activeStep === formStep.length - 1 && (
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
