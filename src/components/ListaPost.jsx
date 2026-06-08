import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Title, SimpleGrid, Card, Text, Group, Button, Alert, Loader, Center } from '@mantine/core'
import { usePostStore } from '../store/usePostStore'
import { FormPost } from './FormPost'

export function ListaPost() {
  const navigate = useNavigate()

  // 1. Recuperiamo lo stato e le azioni dallo store Zustand
  const posts = usePostStore((state) => state.posts)
  const loading = usePostStore((state) => state.loading)
  const error = usePostStore((state) => state.error)
  const fetchPosts = usePostStore((state) => state.fetchPosts)
  const deletePost = usePostStore((state) => state.deletePost)

  // 2. Chiamiamo l'azione al montaggio
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts]) // buona regola in uno useEffect mettere la dipendenza da tutti gli elementi che hanno uno stato usati al suo interno

  return (
    <Container size="md" py="xl">
      <Title order={2} ta="center" mb="lg" c="blue.8">
        Lista dei Post (Zustand & Mantine)
      </Title>

      {/* Form di aggiunta */}
      <FormPost />

      {/* Gestione errori */}
      {error && (
        <Alert title="Si è verificato un errore" color="red" mb="lg">
          {error}
        </Alert>
      )}

      {/* Schermata di caricamento */}
      {loading && posts.length === 0 ? (
        <Center my="xl">
          <Loader size="lg" color="blue" />
        </Center>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {posts.map((post) => (
            <Card key={post.id} shadow="sm" padding="lg" radius="md" withBorder style={{ display: 'flex', flexDirection: 'column' }}>
              <Title order={3} size="h5" lineClamp={1} mb="xs">
                {post.title}
              </Title>

              <Text size="sm" c="dimmed" lineClamp={2} mb="md" style={{ flexGrow: 1 }}>
                {post.body}
              </Text>

              <Group justify="flex-end" mt="auto">
                <Button
                  variant="light"
                  color="blue"
                  onClick={() => navigate(`/posts/${post.id}`)}
                >
                  Vedi Dettaglio
                </Button>
                <Button
                  variant="light"
                  color="red"
                  onClick={() => deletePost(post.id)}
                >
                  Elimina
                </Button>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      )}

      {!loading && posts.length === 0 && (
        <Text ta="center" c="dimmed" my="xl">
          Nessun post presente nello store.
        </Text>
      )}
    </Container>
  )
}
