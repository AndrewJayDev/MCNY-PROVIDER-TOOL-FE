import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import ClinicianWelcome from './ClinicianWelcome';
import { useLocation } from "react-router-dom";
import ClinicianRequest from './ClinicianRequest';
import { useEffect, useState } from 'react';

const ClinicianMain = () => {
    const location = useLocation();
    const [locationPath, setLocationPath] = useState<string>(location.pathname);
    useEffect(() => {
        setLocationPath(location.pathname);
    },[location.pathname]);
    
    if (locationPath==="/")  return (<ClinicianWelcome/>)
    if (locationPath==="/new-request") return (<ClinicianRequest/>)
    if (locationPath==="/request-history") return (<ClinicianWelcome/>)
};

export default ClinicianMain;
