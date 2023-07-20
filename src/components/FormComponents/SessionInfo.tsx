import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en"; 
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useForm, Controller, useFormContext, set } from "react-hook-form";

interface ISessionInfoProps {
  setOpenSessionDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openSessionDialog: boolean;
  append: (data: any) => void;
  fields: Record<"id", string>[];
}
const SessionInfo: React.FunctionComponent<ISessionInfoProps> = ({
  append,
  setOpenSessionDialog,
  openSessionDialog,
  fields,
}) => {
  const [open, setOpen] = React.useState(true);
  const methods = useFormContext();
  const [dateErrorMsg, setDateErrorMsg] = React.useState<Boolean>(false);
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddSession = async() => {
    const validated = await methods.trigger();
    if(validated){      
      const session = {
        date: methods.getValues("date"),
        code: methods.getValues("code"),
        patientFirstName: methods.getValues("patientFirstName"),
        patientLastName: methods.getValues("patientLastName"),
        clinicianFirstName: methods.getValues("firstName"),
        clinicianLastName: methods.getValues("lastName"),
        clinicianEmail: methods.getValues("email"),
      };
      append(session);
      methods.setValue("date", null);
      methods.setValue("code", "");
      methods.setValue("patientFirstName", "");
      methods.setValue("patientLastName", "");
      
      setOpen(false);
    }

  };

  useEffect(() => {
    if (methods.formState.errors.date) {
      setDateErrorMsg(true);
    }
    else{
      setDateErrorMsg(false);
    }
  }, [methods.formState.errors.date]);

  useEffect(() => {
    setOpenSessionDialog(open);
  }, [open]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Session</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="date"
              control={methods.control}
              defaultValue={null}
              rules={{
                required: "Session code is required",
                validate: (value) => {
                  if (value === null) {
                    return "Date is required";
                }
              }}}
              render={({ field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
               }
                ) => (
                <DatePicker
                  label="Date"
                  onChange={(date)=> onChange(dayjs(date).format("MM/DD/YYYY"))}
                  value={value || null} 
                />
              )}
            />
            {dateErrorMsg && <Typography color={'#d32f2f'} fontFamily={"Roboto"} fontSize={"0.75rem"}>Please select a date</Typography>}
          </LocalizationProvider>
          
          <Controller
            name="code"
            control={methods.control}
            defaultValue={methods.getValues("code")}
            rules={{
              required: "Session code is required",
              pattern: {
                value: /^[0-9]*$/,
                message: "Only numbers allowed",
              },
            }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <TextField
                label="Session Code"
                variant="standard"
                onChange={(code)=>onChange(code)}
                error={!!methods.formState.errors.code}
                helperText={
                  methods.formState.errors.code
                    ? methods.formState.errors.code.message
                    : ""
                }
              />
            )}
          />
          <Controller
            name="patientFirstName"
            control={methods.control}
            defaultValue={methods.getValues("patientFirstName")}
            rules={{
              required: "Patient name is required",
            }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <TextField
                label="Patient First Name"
                variant="standard"
                onChange={(patientFirstName)=>onChange(patientFirstName)}
                error={!!methods.formState.errors.patientFirstName}
                helperText={
                  methods.formState.errors.patientFirstName
                    ? methods.formState.errors.patientFirstName.message
                    : ""
                }
              />
            )}
          />
                    <Controller
            name="patientLastName"
            control={methods.control}
            defaultValue={methods.getValues("patientLastName")}
            rules={{
              required: "Patient name is required",
            }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <TextField
                label="Patient Last Name"
                variant="standard"
                onChange={(patientLastName)=>onChange(patientLastName)}
                error={!!methods.formState.errors.code}
                helperText={
                  methods.formState.errors.patientLastName
                    ? methods.formState.errors.patientLastName.message
                    : ""
                }
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddSession}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SessionInfo;
