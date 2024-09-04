import './App.css'
import AppRoutes from './routes/Routes';
import { ThemeProvider } from './components/ThemeContext/ThemeContext';

function App() {

  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
