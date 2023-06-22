import { Typography } from "@mui/material"

interface IBodyProps {
    bodyComponent: React.FunctionComponent;
}

const Body = (props: IBodyProps) => {  
    return (
        <>
           {props.bodyComponent} 
        </>
    )    
}
export default Body