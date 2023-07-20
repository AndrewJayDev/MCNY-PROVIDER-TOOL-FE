import { Box, Typography } from "@mui/material"
import { useStoreState } from "easy-peasy";
import AdminMain from "./AdminViews/AdminMain";
import ClinicianMain from "./ClinicianViews/ClinicianMain";
import { useEffect } from "react";


const Body = () => { 
    const group = useStoreState((state: any) => state.SessionModel.group);
    return (
        <>
         {(group === 'admin') ? <AdminMain/> : <ClinicianMain/>}
        </>
    )    
}
export default Body