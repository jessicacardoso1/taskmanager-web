import { useState } from "react";
import { 
    TextField, 
    Button, 
    Container, 
    Typography, 
    Box,
    Alert,
    Snackbar,
} from '@mui/material';
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateTarefa() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();

    const showNotification = (message, severity = 'success') => {
        setNotification({ open: true, message, severity });
    };

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/Tarefas', {
                titulo,
                descricao,
                status: 0
            });

            if (response.data.isSuccess) {
                showNotification("Tarefa criada com sucesso!");
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                showNotification(response.data.message || "Erro ao criar tarefa.", "error");
            }
        } catch (error) {
            console.error("Erro ao criar tarefa:", error);
            showNotification("Erro ao criar tarefa. Tente novamente mais tarde.", "error");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Criar Nova Tarefa
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Título"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        inputProps={{ maxLength: 100 }}
                        helperText={`${titulo.length}/100 caracteres`}
                    />
                    <TextField
                        label="Descrição"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Criar Tarefa
                    </Button>

                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => navigate('/')}
                    >
                        Cancelar
                    </Button>
                </form>
            </Box>

            <Snackbar 
                open={notification.open} 
                autoHideDuration={6000} 
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleCloseNotification} 
                    severity={notification.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default CreateTarefa;
