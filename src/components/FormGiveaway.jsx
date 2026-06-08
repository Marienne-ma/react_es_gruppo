import { useForm } from "@mantine/form";
import { TextInput, Textarea, Button, Card, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export function FormGiveaway() {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      image: "",
      platforms: "",
    },

    validate: {
      title: (value) =>
        value.trim().length < 3
          ? "Il titolo deve avere almeno 3 caratteri"
          : null,

      description: (value) =>
        value.trim().length < 5
          ? "La descrizione deve avere almeno 5 caratteri"
          : null,
    },
  });

  const handleSubmit = (values) => {
    const newPost = {
      id: Date.now(),
      title: values.title,
      description: values.description,
      image: values.image,
      platforms: values.platforms,
      userId: 1,
      status: "Active",
      users: 0,
    };

    console.log("Giveaway creato:", newPost);

    notifications.show({
      title: "Successo",
      message: "Giveaway aggiunto correttamente",
      color: "green",
      autoClose: 3000,
    });

    form.reset();
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3} ta="center" mb="md">
        Crea Giveaway
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Titolo"
          placeholder="Es: Steam Giveaway"
          required
          {...form.getInputProps("title")}
          mb="sm"
        />

        <Textarea
          label="Descrizione"
          placeholder="Descrizione del giveaway"
          required
          rows={3}
          {...form.getInputProps("description")}
          mb="sm"
        />

        <TextInput
          label="Immagine URL"
          placeholder="https://..."
          {...form.getInputProps("image")}
          mb="sm"
        />

        <TextInput
          label="Piattaforme"
          placeholder="PC, Steam..."
          {...form.getInputProps("platforms")}
          mb="lg"
        />

        <Button type="submit" fullWidth>
          Aggiungi Giveaway
        </Button>
      </form>
    </Card>
  );
}