import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios"; // Assuming you are using axios to fetch data

const Projects = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [projects, setProjects] = useState([]);

    // Fetch projects data from the backend API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("/api/projects/ongoing"); // Replace with your actual API endpoint
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects data:", error);
            }
        };
        fetchProjects();
    }, []);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "Project Name", flex: 1 },
        { field: "startDate", headerName: "Start Date", flex: 1, type: "date" },
        { field: "endDate", headerName: "End Date", flex: 1, type: "date" },
        { field: "cost", headerName: "Cost", flex: 1, type: "number" },
        {
            field: "departments",
            headerName: "Departments",
            flex: 1,
            renderCell: ({ row }) => (
                <Typography>
                    {row.departments.join(", ")} {/* Assuming departments is an array */}
                </Typography>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header title="ONGOING PROJECTS" subtitle="List of all ongoing projects" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid checkboxSelection rows={projects} columns={columns} />
            </Box>
        </Box>
    );
};

export default Projects;
