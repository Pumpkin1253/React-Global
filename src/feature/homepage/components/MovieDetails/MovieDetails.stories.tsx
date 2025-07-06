import type { Meta, StoryObj } from "@storybook/react-vite";

import { MovieDetails } from "./MovieDetails";
import { movieData } from "../../constants/homepage.constants";

const meta = {
  component: MovieDetails,
} satisfies Meta<typeof MovieDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movie: movieData[0],
    onShowSearchForm: () => {},
  },
};
