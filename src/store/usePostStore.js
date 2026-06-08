import { create } from 'zustand'
import axios from 'axios'

export const usePostStore = create((set, get) => ({
  // 1. Stato del nostro store
  posts: [],
  loading: false,
  error: null,
  selectedPost: null,

  // 2. Azioni per modificare lo stato

  // Recupera tutti i post (limitati ai primi 6 per pulizia)
  fetchPosts: async () => {
    // Pedagogical point: se abbiamo già i post in memoria, non ricarichiamo!
    // Questo mostra il vantaggio di uno store globale (caching dello stato).
    if (get().posts.length > 0) return

    set({ loading: true, error: null })
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      // Selezioniamo solo i primi 6 post
      set({ posts: response.data.slice(0, 6), loading: false })
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },

  // Recupera il dettaglio di un post singolo tramite ID
  fetchPostById: async (id) => {
    set({ loading: true, error: null, selectedPost: null })
    try {
      // Controlliamo prima se il post è già presente nell'array locale 'posts'
      const postLocale = get().posts.find((p) => p.id === parseInt(id))
      
      if (postLocale) {
        // Se c'è già, lo usiamo direttamente risparmiando una chiamata API
        set({ selectedPost: postLocale, loading: false })
      } else {
        // Altrimenti facciamo una chiamata al server (es. se l'utente ricarica la pagina di dettaglio)
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        set({ selectedPost: response.data, loading: false })
      }
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },

  // Aggiunge un post (chiamata POST e aggiornamento dello stato globale)
  addPost: async (nuovoPost) => {
    set({ error: null })
    try {
      // JSONPlaceholder simula il salvataggio restituendo l'oggetto inviato con ID 101
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', nuovoPost)
      
      // Assegniamo un ID univoco reale per evitare conflitti di chiavi in React
      const postCreato = {
        ...response.data,
        id: Date.now() // Generiamo un timestamp come ID fittizio locale
      }

      // Aggiorniamo la lista aggiungendo il nuovo post all'inizio
      set((state) => ({
        posts: [postCreato, ...state.posts]
      }))
    } catch (err) {
      set({ error: 'Errore durante la creazione del post' })
    }
  },

  // Cancella un post (chiamata DELETE e aggiornamento dello stato globale)
  deletePost: async (id) => {
    set({ error: null })
    try {
      // Chiamata API per simulare l'eliminazione
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      
      // Filtriamo via il post rimosso dallo stato locale
      set((state) => ({
        posts: state.posts.filter((p) => p.id !== id)
      }))
    } catch (err) {
      set({ error: "Errore durante l'eliminazione del post" })
    }
  }
}))
