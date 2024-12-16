"use client";

import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormData } from "@/service/formData";
import { Container, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from "@/component/share/form/FormInput";
import DynamicFormInput from "@/component/stepper/DynamicFormInput";

export default function StepperPage() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    console.log("activeStep", activeStep)
    const { control, handleSubmit, watch } = useForm();

    const isStepOptional = (step) => step === 1;

    const isStepSkipped = (step) => skipped.has(step);

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const onSubmit = (data) => {
        console.log("Form Submitted:", data);
    };
    console.log("data1", watch("textFiled"))
    console.log("data2", watch("selectFiled"))
    console.log("data3", watch("textFiled2"))

    console.log("data4", watch("selectFiled2"))



    return (
        <Container maxWidth="md">
            <Box sx={{ width: "100%" }}>
                <Stepper activeStep={activeStep}>
                    {FormData.map((step, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={step.heading} {...stepProps}>
                                <StepLabel {...labelProps}>{step.heading}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === FormData.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
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
                                {/* <Grid item xs={8}> */}
                                {FormData[activeStep].fields.map((field, index) => (
                                    <Grid item xs={12} sm={6} key={index} className="mt-4">
                                        <DynamicFormInput control={control} field={field} />
                                    </Grid>
                                ))}

                                {activeStep === FormData.length - 1 &&
                                    <Grid item xs={12} sm={12} className="mt-4 flex justify-center">
                                        <Button type="submit" variant="contained">
                                            Submit
                                        </Button>
                                    </Grid>
                                }

                            </Grid>
                            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: "1 1 auto" }} />
                                {isStepOptional(activeStep) && (
                                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                )}

                                {activeStep === FormData.length - 1 ? <Button onClick={handleNext}>
                                    Finish
                                </Button> : <Button onClick={handleNext}>
                                    Next
                                </Button>}

                            </Box>
                        </form>
                    </React.Fragment>
                )}
            </Box>
        </Container>
    );
}
