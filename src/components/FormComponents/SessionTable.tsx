import * as React from "react";
import { DataGrid, GridColDef} from "@mui/x-data-grid";
import { ISession } from "../RequestForm";

interface ISessionTableProps {
    rows: ISession[];
}

const SessionTable: React.FunctionComponent<ISessionTableProps> = ({
    rows
}) => {
    const columns: GridColDef[] = [
        { field: "date", headerName: "Session Date", minWidth: 130, flex: 1 },
        { field: "code", headerName: "Session Code", minWidth: 130, flex: 1},
        { field: "patientFirstName", headerName: "First Name", minWidth: 130, flex: 1 },
        { field: "patientLastName", headerName: "Last Name", minWidth: 130,flex: 1 },
      
        
    ];
    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 20 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </>
    );
};

export default SessionTable;
