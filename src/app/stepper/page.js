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
import { useRouter } from "next/navigation";

export default function StepperPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0);  //  current active step
    const [formValues, setFormValues] = useState({}); //  form data Store for all steps
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

    const [formStep, setFormStep] = useState(FormData);
    useEffect(() => {

    }, [formValues])
    useEffect(() => {
        const updateStepData = {
            heading: "Step 4",
            description: "Step 4 description",
            fields: [{ name: "summary", label: "Summary", type: "textarea" }],
        };
        setFormStep((prev) => [...prev, updateStepData]);
    }, []);

    const isStepOptional = (step) => step === 1;



    useEffect(() => {
    }, [formValues]); // This will trigger when formValues is updated


    const handleNext = async () => {
        const isValid = await trigger(); // Validate current step field
        if (isValid) {
            const currentStepData = watch(); //   current steps data
            setFormValues((prev) => ({
                ...prev,
                [currentStep]: currentStepData, // store current steps data
            }));
            setCurrentStep((prev) => prev + 1); //  next step

            // Restore data for the next step, and clear the form if  data not exists
            setTimeout(() => reset(formValues[currentStep + 1] || {}), 0);
        }
    };

    const handleBack = () => {
        const currentStepData = watch(); // Current step data

        setFormValues((prev) => ({
            ...prev,
            [currentStep]: currentStepData,
        }));
        setCurrentStep((prev) => prev - 1); // Navigate to the previous step

        // Restore data for the previous step
        setTimeout(() => reset(formValues[currentStep - 1] || {}), 0);
    };


    const handleSkip = () => {
        if (!isStepOptional(currentStep)) {
            errorMsg("You can't skip a step that isn't optional.");
        }
        setCurrentStep((prev) => prev + 1);
    };

    /// on submit handler
    const onSubmit = (data) => {
        const dataForm = { ...formValues, [currentStep]: data }
        const lastKey = Math.max(...Object.keys(dataForm).map(Number)).toString();
        // Delete the last index
        delete dataForm[lastKey];
        successMsg("Your form was successfully submitted!");
        router.push("/stepper")
    };

    const handleReset = () => {
        setCurrentStep(0);
        setFormValues({});
        reset({});
    };
    return (
        <Container maxWidth="xl" className="mt-12" >
            <Box sx={{ width: "100%" }}>
                <Stepper activeStep={currentStep}>
                    {formStep?.map((step, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        // if (isStepOptional(index)) {
                        //     labelProps.optional = (
                        //         <Typography variant="caption">Optional</Typography>
                        //     );
                        // }

                        return (
                            <Step key={step.heading} {...stepProps}>
                                <StepLabel {...labelProps}>{step.heading}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                {currentStep === formStep.length ? (
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
                                {formStep[currentStep]?.fields?.map((field, index) => (
                                    <Grid item xs={12} sm={12} key={index} className="mt-4">
                                        <DynamicFormInput
                                            control={control}
                                            field={field}
                                            errors={errors}
                                        />
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
                                    {Object.entries(formValues).slice(0, 3).map(([step, values], idx) => {
                                        console.log("myvalue", values);
                                        return (
                                            Object.entries(values).length > 0 &&
                                            <Box key={idx} sx={{ my: 4 }}>
                                                <Card elevation={3} sx={{ p: 2 }}>
                                                    <CardContent>
                                                        <Typography variant="h6" sx={{ mb: 1 }}>
                                                            Step {parseInt(step) + 1} Data
                                                        </Typography>
                                                        <Divider sx={{ mb: 3 }} />
                                                        <Grid container spacing={2}>
                                                            {Object.entries(values).map(
                                                                ([fieldName, fieldValue], fieldIdx) => {
                                                                    console.log("fieldName", fieldName);
                                                                    console.log("fieldValue", fieldValue);

                                                                    return (
                                                                        <Grid item xs={12} sm={6} key={fieldIdx}>
                                                                            <Typography variant="body1">
                                                                                <strong>{fieldName}:</strong> {fieldValue}
                                                                            </Typography>
                                                                        </Grid>
                                                                    )
                                                                }
                                                            )}
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Box>
                                        )
                                    })}
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
