import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Container, Group, Paper } from '@mantine/core'
import { ListaPost } from './components/ListaPost'
import { DettaglioPost } from './components/DettaglioPost'

function App() {
  // Stile dinamico per il link attivo nella barra di navigazione
  const visualizzaStileAttivo = ({ isActive }) => ({
    color: isActive ? '#228be6' : '#495057',
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: 'none',
    fontSize: '1.05rem'
  })

  return (
    <Container size="md" py="lg">
      <Paper shadow="xs" p="md" mb="xl" withBorder radius="md">
        <Group justify="center">
          <NavLink to="/" style={visualizzaStileAttivo}>
            Home (Lista Post)
          </NavLink>
        </Group>
      </Paper>

      <main>
        <Routes>
          <Route path="/" element={<ListaPost />} />
          <Route path="/posts/:id" element={<DettaglioPost />} />
        </Routes>
      </main>
    </Container>
  )
}

export default App
