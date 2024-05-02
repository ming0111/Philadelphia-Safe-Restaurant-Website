import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { indigo, amber } from '@mui/material/colors';
import { createTheme } from "@mui/material/styles";

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryInfoPage from './pages/CategoryInfoPage';
import SafetyRankingPage from './pages/SafetyRankingPage';
import SearchPage from './pages/SearchPage';
import RestaurantPage from './pages/RestaurantPage';

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: amber,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category-info/:categoryName" element={<CategoryInfoPage />} />
          <Route path="/safety-ranking" element={<SafetyRankingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/restaurants/:restaurant_id" element={<RestaurantPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
