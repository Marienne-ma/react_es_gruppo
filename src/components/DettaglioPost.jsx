import {
	Alert,
	Badge,
	Button,
	Card,
	Center,
	Container,
	Group,
	Image,
	Loader,
	Text,
} from "@mantine/core";
import { useGiveawayStore } from "../store/useGiveawayStore.js";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function DettaglioPost() {
	const { id } = useParams();
	const navigate = useNavigate();

	// 1. Recuperiamo lo stato e le azioni dallo store con selettori singoli
	const selectedGiveaway = useGiveawayStore((state) => state.selectedGiveaway);
	const loading = useGiveawayStore((state) => state.loading);
	const error = useGiveawayStore((state) => state.error);
	const fetchGiveawayById = useGiveawayStore(
		(state) => state.fetchGiveawayById,
	);

	// 2. Al caricamento del componente o al variare dell'id, recuperiamo il post
	useEffect(() => {
		fetchGiveawayById(id);
	}, [id, fetchGiveawayById]);

	if (loading) {
		return (
			<Center my="xl">
				<Loader size="lg" />
			</Center>
		);
	}

	if (error) {
		return (
			<Container size="xs" py="xl">
				<Alert title="Si è verificato un errore" color="red" mb="md">
					{error}
				</Alert>
				<Button fullWidth color="blue" onClick={() => navigate("/")}>
					Torna alla Lista
				</Button>
			</Container>
		);
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

			{selectedGiveaway ? (
				<Card shadow="sm" padding="xl" radius="md" withBorder>
					<Card.Section>
						<Image src={selectedGiveaway.thumbnail} height={160} alt="Norway" />
					</Card.Section>
					<Group justify="space-between" mt="md" mb="xs">
						<Text fw={500}>{selectedGiveaway.title}</Text>
						<Badge color="pink">{selectedGiveaway.status}</Badge>
					</Group>
					<Text size="sm" c="dimmed">
						{selectedGiveaway.description}
					</Text>
					<Button color="blue" fullWidth mt="md">
						Shop ${selectedGiveaway.worth}
					</Button>
				</Card>
			) : (
				<Alert title="Attenzione" color="yellow">
					Nessun gioco trovato.
				</Alert>
			)}
		</Container>
	);
}
