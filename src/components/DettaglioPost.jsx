import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Title, Text, Group, Badge, Button, Alert, Loader, Center } from '@mantine/core'
import { usePostStore } from '../store/usePostStore'

export function DettaglioPost() {
  const { id } = useParams()
  const navigate = useNavigate()

  // 1. Recuperiamo lo stato e le azioni dallo store con selettori singoli
  const selectedPost = usePostStore((state) => state.selectedPost)
  const loading = usePostStore((state) => state.loading)
  const error = usePostStore((state) => state.error)
  const fetchPostById = usePostStore((state) => state.fetchPostById)

  // 2. Al caricamento del componente o al variare dell'id, recuperiamo il post
  useEffect(() => {
    fetchPostById(id)
  }, [id, fetchPostById])

  if (loading) {
    return (
      <Center my="xl">
        <Loader size="lg" />
      </Center>
    )
  }

  if (error) {
    return (
      <Container size="xs" py="xl">
        <Alert title="Si è verificato un errore" color="red" mb="md">
          {error}
        </Alert>
        <Button fullWidth color="blue" onClick={() => navigate('/')}>
          Torna alla Lista
        </Button>
      </Container>
    )
  }

  return (
    <Container size="sm" py="xl">
      <Button
        variant="subtle"
        color="gray"
        onClick={() => navigate(-1)}
        mb="md"
      >
        &larr; Torna Indietro
      </Button>

      {selectedPost ? (
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Title order={2} size="h3" mb="sm">
            {selectedPost.title}
          </Title>

          <Group mb="md">
            <Badge color="blue">ID Post: {selectedPost.id}</Badge>
            <Badge color="teal">ID Autore: {selectedPost.userId}</Badge>
          </Group>

          <Text size="md" style={{ lineHeight: 1.6 }}>
            {selectedPost.body}
          </Text>
        </Card>
      ) : (
        <Alert title="Attenzione" color="yellow">
          Nessun post trovato.
        </Alert>
      )}
    </Container>
  )
}
