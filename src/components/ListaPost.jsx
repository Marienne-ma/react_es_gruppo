import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Text,
  Group,
  Button,
  Alert,
  Loader,
  Center,
} from "@mantine/core";
import { useEffect } from "react";
import { useGiveawayStore } from "../store/useGiveawayStore.js";
import { useNavigate } from "react-router-dom";

export function ListaPost() {
  const navigate = useNavigate();

  // 1. Recuperiamo lo stato e le azioni dallo store Zustand (Corretto: deleteGiveaway al singolare)
  const giveaways = useGiveawayStore((state) => state.giveaways);
  const loading = useGiveawayStore((state) => state.loading);
  const error = useGiveawayStore((state) => state.error);
  const fetchGiveaways = useGiveawayStore((state) => state.fetchGiveaways);
  const deleteGiveaway = useGiveawayStore((state) => state.deleteGiveaway);

  // 2. Chiamiamo l'azione al montaggio
  useEffect(() => {
    fetchGiveaways();
  }, [fetchGiveaways]);

  return (
    <Container size="md" py="xl">
      <Title order={2} ta="center" mb="lg" c="blue.8">
        Lista dei Post (Zustand & Mantine)
      </Title>

      {/* Gestione errori */}
      {error && (
        <Alert title="Si è verificato un errore" color="red" mb="lg">
          {error}
        </Alert>
      )}

      {/* Schermata di caricamento */}
      {loading && giveaways.length === 0 ? (
        <Center my="xl">
          <Loader size="lg" color="blue" />
        </Center>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {giveaways.map((post) => (
            <Card
              key={post.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Title order={3} size="h5" lineClamp={1} mb="xs">
                {post.title}
              </Title>

              <Text
                size="sm"
                c="dimmed"
                lineClamp={2}
                mb="md"
                style={{ flexGrow: 1 }}
              >
                {post.description}
              </Text>

              <Group justify="flex-end" mt="auto">
                <Button
                  variant="light"
                  color="blue"
                  onClick={() => navigate(`/posts/${post.id}`)}
                >
                  Vedi Dettaglio
                </Button>
                {/* Corretto: Richiama la funzione al singolare */}
                <Button
                  variant="light"
                  color="red"
                  onClick={() => deleteGiveaway(post.id)}
                >
                  Elimina
                </Button>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      )}

      {!loading && giveaways.length === 0 && (
        <Text ta="center" c="dimmed" my="xl">
          Nessun post presente nello store.
        </Text>
      )}
    </Container>
  );
}
