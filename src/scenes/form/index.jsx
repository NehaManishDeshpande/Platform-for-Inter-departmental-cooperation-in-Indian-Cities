import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

// Initial form values
const initialValues = {
    projectId: "",
    projectName: "",
    projectDescription: "",
    departments: [],
    cost: "",
    startDate: "",
    endDate: "",
};

// Validation schema for the form
const userSchema = yup.object().shape({
    projectId: yup.number().required("Project ID is required").positive("Must be a positive number").integer("Must be an integer"),
    projectName: yup.string().required("Project Name is required"),
    projectDescription: yup.string().required("Project Description is required"),
    departments: yup.array().min(1, "Select at least one department").required("Departments are required"),
    cost: yup.number().required("Cost is required").positive("Must be a positive number"),
    startDate: yup.date().required("Start Date is required"),
    endDate: yup.date().required("End Date is required").min(yup.ref('startDate'), "End date can't be before start date"),
});

// Dummy data for departments selection
const departmentsOptions = [
    { id: 1, name: "HR" },
    { id: 2, name: "Finance" },
    { id: 3, name: "Engineering" },
    { id: 4, name: "Marketing" },
];

const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    };

    return (
        <Box m="20px">
            <Header title="CREATE PROJECT" subtitle="Create a New Project" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={userSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Project ID"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.projectId}
                            name="projectId"
                            error={!!touched.projectId && !!errors.projectId}
                            helperText={touched.projectId && errors.projectId}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Project Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.projectName}
                            name="projectName"
                            error={!!touched.projectName && !!errors.projectName}
                            helperText={touched.projectName && errors.projectName}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Project Description"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.projectDescription}
                            name="projectDescription"
                            error={!!touched.projectDescription && !!errors.projectDescription}
                            helperText={touched.projectDescription && errors.projectDescription}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            select
                            fullWidth
                            variant="filled"
                            label="Departments"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.departments}
                            name="departments"
                            SelectProps={{ multiple: true }}
                            error={!!touched.departments && !!errors.departments}
                            helperText={touched.departments && errors.departments}
                            sx={{ gridColumn: "span 4" }}
                        >
                            {departmentsOptions.map((department) => (
                                <MenuItem key={department.id} value={department.id}>
                                    {department.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Cost"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.cost}
                            name="cost"
                            error={!!touched.cost && !!errors.cost}
                            helperText={touched.cost && errors.cost}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="date"
                            label="Start Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.startDate}
                            name="startDate"
                            InputLabelProps={{ shrink: true }}
                            error={!!touched.startDate && !!errors.startDate}
                            helperText={touched.startDate && errors.startDate}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="date"
                            label="End Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.endDate}
                            name="endDate"
                            InputLabelProps={{ shrink: true }}
                            error={!!touched.endDate && !!errors.endDate}
                            helperText={touched.endDate && errors.endDate}
                            sx={{ gridColumn: "span 2" }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained">
                            Create New Project
                        </Button>
                    </Box>
                </form>
                )}
            </Formik>
        </Box>
    );
};

export default Form;
