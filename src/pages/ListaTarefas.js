import { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    IconButton,
    CircularProgress,
    Alert,
    Snackbar,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function ListaTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [filtroStatus, setFiltroStatus] = useState('todos');
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();

    const showNotification = (message, severity = 'success') => {
        setNotification({ open: true, message, severity });
    };

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    const carregarTarefas = async () => {
        setLoading(true);
        try {
            const response = await api.get('/Tarefas');
            if (response.data.isSuccess) {
                setTarefas(response.data.data);
                if (response.data.message) {
                    showNotification(response.data.message);
                }
            } else {
                showNotification(response.data.message || 'Erro ao carregar tarefas', 'error');
            }
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
            showNotification('Erro ao carregar tarefas. Tente novamente mais tarde.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarTarefas();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
            setLoading(true);
            try {
                const response = await api.delete(`/Tarefas/${id}`);
                if (response.data.isSuccess) {
                    setTarefas(tarefas => tarefas.filter(t => t.id !== id));
                    showNotification(response.data.message || 'Tarefa excluída com sucesso!');
                } else {
                    showNotification(response.data.message || 'Erro ao excluir tarefa', 'error');
                    if (response.data.message === 'Tarefa não encontrada.') {
                        await carregarTarefas();
                    }
                }
            } catch (error) {
                console.error('Erro ao excluir tarefa:', error);
                showNotification('Erro ao excluir tarefa. Tente novamente mais tarde.', 'error');
                await carregarTarefas();
            } finally {
                setLoading(false);
            }
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 0:
                return 'Pendente';
            case 1:
                return 'Em Progresso';
            case 2:
                return 'Concluída';
            default:
                return 'Desconhecido';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 0:
                return '#FFA726';
            case 1:
                return '#42A5F5';
            case 2:
                return '#66BB6A';
            default:
                return '#9E9E9E';
        }
    };

    const tarefasFiltradas = tarefas.filter(tarefa => {
        if (filtroStatus === 'todos') return true;
        return tarefa.status === parseInt(filtroStatus);
    });

    const formatarData = (data) => {
        return new Date(data).toLocaleString('pt-BR');
    };

    if (loading) {
        return (
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <Container>
            <Box sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h4" gutterBottom>
                            Lista de Tarefas
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/criar-tarefa')}
                        >
                            Nova Tarefa
                        </Button>
                    </Grid>
                </Grid>

                <FormControl sx={{ mt: 2, mb: 2, minWidth: 200 }}>
                    <InputLabel>Filtrar por Status</InputLabel>
                    <Select
                        value={filtroStatus}
                        label="Filtrar por Status"
                        onChange={(e) => setFiltroStatus(e.target.value)}
                    >
                        <MenuItem value="todos">Todos</MenuItem>
                        <MenuItem value={0}>Pendente</MenuItem>
                        <MenuItem value={1}>Em Progresso</MenuItem>
                        <MenuItem value={2}>Concluída</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ mt: 2 }}>
                    {tarefasFiltradas.map((tarefa) => (
                        <Card key={tarefa.id} sx={{ mb: 2 }}>
                            <CardContent>
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Grid item xs={10}>
                                        <Typography variant="h6" component="div">
                                            {tarefa.titulo}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {tarefa.descricao}
                                        </Typography>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: getStatusColor(tarefa.status),
                                                fontWeight: 500,
                                                mt: 1
                                            }}
                                        >
                                            Status: {getStatusText(tarefa.status)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                            Criado em: {formatarData(tarefa.dataCriacao)}
                                        </Typography>
                                        {tarefa.dataConclusao && (
                                            <Typography variant="body2" color="text.secondary">
                                                Concluído em: {formatarData(tarefa.dataConclusao)}
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid item>
                                        <IconButton 
                                            onClick={() => navigate(`/editar-tarefa/${tarefa.id}`)}
                                            color="primary"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton 
                                            onClick={() => handleDelete(tarefa.id)}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}
                    {tarefasFiltradas.length === 0 && (
                        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                            Nenhuma tarefa encontrada.
                        </Typography>
                    )}
                </Box>
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

export default ListaTarefas;