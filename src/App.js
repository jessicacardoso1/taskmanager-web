import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { 
    Container, 
    AppBar, 
    Toolbar, 
    Typography, 
    Box,
    CssBaseline,
} from '@mui/material';
import ListaTarefas from './pages/ListaTarefas';
import CreateTarefa from './pages/CreateTarefa';
import EditarTarefa from './pages/EditarTarefa';
import theme from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
                    <AppBar position="static" elevation={0}>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Gerenciador de Tarefas
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Container sx={{ mt: 4, mb: 4 }}>
                        <Routes>
                            <Route path="/" element={<ListaTarefas />} />
                            <Route path="/criar-tarefa" element={<CreateTarefa />} />
                            <Route path="/editar-tarefa/:id" element={<EditarTarefa />} />
                        </Routes>
                    </Container>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;
