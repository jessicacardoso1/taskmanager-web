import { useState, useEffect } from "react";
import { 
    TextField, 
    Button, 
    Container, 
    Typography, 
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Snackbar,
} from '@mui/material';
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

function EditarTarefa() {
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState(0);
    const [dataConclusao, setDataConclusao] = useState(null);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();

    const showNotification = (message, severity = 'success') => {
        setNotification({ open: true, message, severity });
    };

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    useEffect(() => {
        const carregarTarefa = async () => {
            try {
                const response = await api.get(`/Tarefas/${id}`);
                if (response.data.isSuccess) {
                    const tarefa = response.data.data;
                    setTitulo(tarefa.titulo);
                    setDescricao(tarefa.descricao);
                    setStatus(tarefa.status);
                    setDataConclusao(tarefa.dataConclusao);
                } else {
                    showNotification(response.data.message || "Erro ao carregar tarefa.", "error");
                    setTimeout(() => {
                        navigate('/');
                    }, 1500);
                }
            } catch (error) {
                console.error("Erro ao carregar tarefa:", error);
                showNotification("Erro ao carregar tarefa. Tente novamente mais tarde.", "error");
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }
        };

        carregarTarefa();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let dataFormatada = null;
            
            if (status === 2) {
                const agora = new Date();
                const offset = agora.getTimezoneOffset();
                agora.setMinutes(agora.getMinutes() - offset);
                dataFormatada = agora.toISOString();
            }

            const tarefaAtualizada = {
                id: parseInt(id),
                titulo,
                descricao,
                status,
                dataConclusao: dataFormatada
            };

            const response = await api.put(`/Tarefas/${id}`, tarefaAtualizada);
            
            if (response.status === 204) {
                showNotification("Tarefa atualizada com sucesso!");
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                showNotification(response.data?.message || "Erro ao atualizar tarefa.", "error");
            }
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
            showNotification("Erro ao atualizar tarefa. Tente novamente mais tarde.", "error");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Editar Tarefa
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
                    
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={status}
                            label="Status"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value={0}>Pendente</MenuItem>
                            <MenuItem value={1}>Em Progresso</MenuItem>
                            <MenuItem value={2}>Concluída</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Salvar Alterações
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

export default EditarTarefa; 