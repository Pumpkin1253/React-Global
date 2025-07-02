import type { Meta, StoryObj } from "@storybook/react-vite";

import { GenreList } from "./GenreList";

const meta = {
  component: GenreList,
} satisfies Meta<typeof GenreList>;

export default meta;

type Story = StoryObj<typeof meta>;

const genres = [
  { name: "All", id: "1" },
  { name: "Documentary", id: "2" },
  { name: "Comedy", id: "3" },
];

export const Default: Story = {
  args: {
    genres: genres,
    selectedGenre: genres[0],
    onSelectGenre: () => {},
  },
};
