import * as React from "react";
import { useEffect } from "react";

import { IconButton, TextField, Button, Box, CircularProgress } from "@mui/material";
import {
  useForm,
  Controller,
  FormProvider,
  useFieldArray,
  useWatch,
  Control,
  set,
} from "react-hook-form";
import { useStoreActions } from "easy-peasy";

import { GrAddCircle } from "react-icons/gr";
import SessionInfo from "./FormComponents/SessionInfo";
import SessionTable from "./FormComponents/SessionTable";
import { get } from "http";

export type ISession = {
  date: Date;
  code: string;
  patientFirstName: string;
  patientLastName: string;
  clinicianFirstName: string;
  clinicianLastName: string;
  clinicianEmail: string;
}

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  sessions: ISession[];
};

export const RequestForm: React.FC<{}> = () => {

  //store actions
  const [rows, setRows] = React.useState<ISession[]>([]);
  const [loading, setLoading] = React.useState(true); // Initialize loading state
  const [showAddSession, setShowAddSession] = React.useState(false);
  const getCurrentUser = useStoreActions(
    (actions) => actions.SessionModel.getCurrentSessionThunk
  );
  const methods = useForm();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({defaultValues:{
    firstName: methods.getValues("firstName"),
    lastName: methods.getValues("lastName"),
    email: methods.getValues("email"),
    sessions: [],
  }});


  const onSubmit = (data: any) => {
    console.log(data);
  };
const {fields, append }= useFieldArray({
    control,
    name: "sessions",
  });
  useEffect(() => {getCurrentUser()
      .then((res: any) => {
        console.log(res.attributes);
        methods.setValue("firstName", res.attributes.given_name);
        methods.setValue("lastName", res.attributes.family_name);
        methods.setValue("email", res.attributes.email);
        setLoading(false); // Set loading state to false when API call is completed

      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false); // Set loading state to false when API call is completed
      });
  }, []);

  useEffect(() => {
    methods.setValue("sessions", fields);
    setRows(methods.getValues("sessions"));
    console.log(methods.getValues("sessions"));
  },[fields]);

  const handleBeforeUnload = (event) => {
    event.preventDefault();
    // Display a confirmation message to the user
    alert("Are you sure you want to leave? All unsubmitted information will be lost.");
    event.returnValue = "";
  };

  useEffect(() => {
    // Attach the beforeunload event listener when the component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []); 
  if (loading) {
    return <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
    }}
  ><CircularProgress color="secondary" />
  </Box>; // Render loading state while waiting for the API call
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "3rem",
          }}
        >
          <Controller
            name="firstName"
            control={control}
            defaultValue={methods.getValues("firstName")}
            rules={{ required: "First name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                name="firstName"
                label="First Name"
                value = {field.value}
                variant="standard"
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName.message : ""}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            defaultValue={methods.getValues("lastName")}
            rules={{ required: "Last name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="standard"
                value = {field.value}
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName.message : ""}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            defaultValue={methods.getValues("email")}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="E-mail"
                variant="standard"
                value = {field.value}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            )}
          />
          <IconButton onClick={()=>setShowAddSession(true)}>
            <GrAddCircle />
          </IconButton>

          {showAddSession && <SessionInfo setOpenSessionDialog={setShowAddSession} openSessionDialog={showAddSession} append={append} fields={fields}/>}
           
            <SessionTable rows={rows} />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};
