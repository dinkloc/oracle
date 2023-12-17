import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Animals from "./pages/Animals";
import Staff from "./pages/Staffs";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import AddNewStaff from "./pages/AddNewStaff";
import EditStaff from "./pages/EditStaff";
import AddNewAnimal from "./pages/AddNewAnimal";
import EditAnimal from "./pages/EditAnimal";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="animals" element={<Animals />} />
            <Route path="animals/add" element={<AddNewAnimal />} />
            <Route path="animals/edit/:_id" element={<EditAnimal />} />

            <Route path="staffs" element={<Staff />} />
            <Route path="staffs/add" element={<AddNewStaff />} />
            <Route path="staffs/edit/:_id" element={<EditStaff />} />
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
