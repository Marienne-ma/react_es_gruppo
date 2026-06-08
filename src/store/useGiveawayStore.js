import axios from "axios";
import { create } from "zustand";

export const useGiveawayStore = create((set, get) => ({
	// 1. Stato del nostro store
	giveaways: [],
	loading: false,
	error: null,
	selectedGiveaway: null,

	// 2. Azioni per modificare lo stato

	// Recupera tutti i giveaway (limitati ai primi 6 per pulizia)
	fetchGiveaways: async () => {
		if (get().giveaways.length > 0) return;

		set({ loading: true, error: null });
		try {
			const response = await axios.get("https://gamerpower.com/api/giveaways");
			// Selezioniamo solo i primi 6 giveaway
			set({ giveaways: response.data.slice(0, 12), loading: false });
		} catch (err) {
			set({ error: err.message, loading: false });
		}
	},

	// Recupera il dettaglio di un giveaway singolo tramite ID
	fetchGiveawayById: async (id) => {
		set({ loading: true, error: null, selectedGiveaway: null });
		try {
			// Controlliamo prima se il giveaway è già presente nell'array locale 'giveaways'
			const giveawayLocale = get().giveaways.find((p) => p.id === parseInt(id));

			if (giveawayLocale) {
				// Se c'è già, lo usiamo direttamente risparmiando una chiamata API
				set({ selectedGiveaway: giveawayLocale, loading: false });
			} else {
				// Altrimenti facciamo una chiamata al server (es. se l'utente ricarica la pagina di dettaglio)
				const response = await axios.get(
					`https://gamerpower.com/api/giveaways?id=${id}`,
				);
				set({ selectedGiveaway: response.data, loading: false });
			}
		} catch (err) {
			set({ error: err.message, loading: false });
		}
	},

	// Aggiunge un giveaway (chiamata POST e aggiornamento dello stato globale)
	addGiveaway: async (nuovoGiveaway) => {
		set({ error: null });
		try {
			// JSONPlaceholder simula il salvataggio restituendo l'oggetto inviato con ID 101
			const response = await axios.post(
				"https://gamerpower.com/api/giveaways",
				nuovoGiveaway,
			);

			// Assegniamo un ID univoco reale per evitare conflitti di chiavi in React
			const giveawayCreato = {
				...response.data,
				id: Date.now(), // Generiamo un timestamp come ID fittizio locale
			};

			// Aggiorniamo la lista aggiungendo il nuovo giveaway all'inizio
			set((state) => ({
				giveaways: [giveawayCreato, ...state.giveaways],
			}));
		} catch (err) {
			set({ error: "Errore durante la creazione del giveaway", err });
		}
	},

	// Cancella un giveaway (chiamata DELETE e aggiornamento dello stato globale)
	deleteGiveaway: async (id) => {
		set({ error: null });
		try {
			// Chiamata API per simulare l'eliminazione
			await axios.delete(`https://gamerpower.com/api/giveaways?id=${id}`);

			// Filtriamo via il giveaway rimosso dallo stato locale
			set((state) => ({
				giveaways: state.giveaways.filter((p) => p.id !== id),
			}));
		} catch (err) {
			set({ error: "Errore durante l'eliminazione del giveaway", err });
		}
	},
}));
