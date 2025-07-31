import type { Meta, StoryObj } from "@storybook/react-vite";

import { GenreList } from "./GenreList";

const meta = {
  component: GenreList,
} satisfies Meta<typeof GenreList>;

export default meta;

type Story = StoryObj<typeof meta>;

const genres = ["All", "Documentary", "Comedy"];

export const Default: Story = {
  args: {
    genres: genres,
    selectedGenre: genres[0],
    onSelectGenre: () => {},
  },
};
