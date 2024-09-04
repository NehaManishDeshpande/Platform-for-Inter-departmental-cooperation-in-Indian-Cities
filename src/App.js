import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import FAQ from "./scenes/faq";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import Geography from "./scenes/geography";
import Login from "./scenes/Login/index";

function App() {
    const [theme, colorMode] = useMode();

    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem("auth") === "true";

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    {isAuthenticated ? (
                        <Route path="/" element={<Layout />}>
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="team" element={<Team />} />
                            <Route path="invoices" element={<Invoices />} />
                            <Route path="contacts" element={<Contacts />} />
                            <Route path="form" element={<Form />} />
                            <Route path="calendar" element={<Calendar />} />
                            <Route path="faq" element={<FAQ />} />
                            <Route path="bar" element={<Bar />} />
                            <Route path="pie" element={<Pie />} />
                            <Route path="line" element={<Line />} />
                            <Route path="geography" element={<Geography />} />
                            <Route path="*" element={<Navigate to="dashboard" />} />
                        </Route>
                    ) : (
                        <Route path="*" element={<Navigate to="/login" />} />
                    )}
                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

// Layout component that includes Sidebar and Topbar
const Layout = () => (
    <div className="app">
        <Sidebar />
        <main className="content">
            <Topbar />
            <Outlet />
        </main>
    </div>
);

export default App;
