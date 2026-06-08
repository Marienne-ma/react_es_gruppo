import axios from "axios";
import { create } from "zustand";

export const useGiveawayStore = create((set, get) => ({
    // 1. Stato del nostro store
    giveaways: [],
    loading: false,
    error: null,
    selectedGiveaway: null,

    // 2. Azioni per modificare lo stato

    // Recupera tutti i giveaway (limitati ai primi 12)
    fetchGiveaways: async () => {
        if (get().giveaways.length > 0) return;

        set({ loading: true, error: null });
        try {
            const response = await axios.get(
                "https://www.gamerpower.com/api/giveaways",
            );
            // Selezioniamo solo i primi 12 giveaway
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
                // Altrimenti facciamo una chiamata al server
                const response = await axios.get(
                    `https://www.gamerpower.com/api/giveaways?id=${id}`,
                );
                set({ selectedGiveaway: response.data, loading: false });
            }
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    // Aggiunge un giveaway (simulazione in locale)
    addGiveaway: async (nuovoGiveaway) => {
        set({ error: null });
        try {
            const response = await axios.post(
                "https://www.gamerpower.com/api/giveaways",
                nuovoGiveaway,
            );

            // Assegniamo un ID univoco reale locale per evitare conflitti
            const giveawayCreato = {
                ...response.data,
                id: Date.now(), 
            };

            set((state) => ({
                giveaways: [giveawayCreato, ...state.giveaways],
            }));
        } catch (err) {
            set({ error: "Errore durante la creazione del giveaway", err });
        }
    },

    // Cancella un giveaway (MODIFICATO: Solo simulazione locale senza Axios)
    deleteGiveaway: (id) => {
        set((state) => ({
            // Filtriamo via il giveaway rimosso dallo stato locale in modo istantaneo
            giveaways: state.giveaways.filter((p) => p.id !== id),
        }));
    },
}));