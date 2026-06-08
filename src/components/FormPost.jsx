import { useForm } from '@mantine/form'
import { TextInput, Textarea, Button, Card, Title } from '@mantine/core'
import { usePostStore } from '../store/usePostStore'

export function FormPost() {
  // 1. Recuperiamo l'azione addPost dallo store Zustand
  const addPost = usePostStore((state) => state.addPost)

  // 2. Inizializziamo il form di Mantine con validazione
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      title: '',
      body: '',
    },
    validate: {
      title: (value) => (value.trim().length < 3 ? 'Il titolo deve avere almeno 3 caratteri' : null),
      body: (value) => (value.trim().length < 5 ? 'Il contenuto deve avere almeno 5 caratteri' : null),
    },
  })

  // Gestione del submit (chiamata quando la validazione passa)
  const handleSubmit = (values) => {
    addPost({
      title: values.title,
      body: values.body,
      userId: 1
    })
    
    // Reset dello stato del form gestito da Mantine
    form.reset()
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="form-card">
      <Title order={3} size="h4" ta="center" mb="md">
        Crea un nuovo Post
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Titolo"
          placeholder="Scrivi il titolo..."
          required
          key={form.key('title')}
          {...form.getInputProps('title')}
          mb="sm"
        />

        <Textarea
          label="Contenuto"
          placeholder="Scrivi il corpo del post..."
          required
          rows={3}
          key={form.key('body')}
          {...form.getInputProps('body')}
          mb="lg"
        />

        <Button type="submit" fullWidth color="blue">
          Aggiungi Post
        </Button>
      </form>
    </Card>
  )
}
