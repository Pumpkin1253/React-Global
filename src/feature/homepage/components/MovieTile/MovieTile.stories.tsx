import type { Meta, StoryObj } from "@storybook/react-vite";

import { MovieTile } from "./MovieTile";
import { movieData } from "../../constants/homepage.constants";

const meta = {
  component: MovieTile,
} satisfies Meta<typeof MovieTile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movie: movieData[0],
    onClickMovie: () => {},
  },
};
