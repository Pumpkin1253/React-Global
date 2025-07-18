import type { Meta, StoryObj } from "@storybook/react-vite";

import { ModalWrapper } from "./ModalWrapper";

const meta = {
  component: ModalWrapper,
} satisfies Meta<typeof ModalWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AddForm: Story = {
  args: {
    modalType: "add",
    movie: null,
    movieList: [],
    lastMovieId: "0",
    submitModal: () => {},
    onClose: () => {},
  },
};

export const EditForm: Story = {
  args: {
    modalType: "edit",
    movie: {
      id: "3",
      name: "Edge of Tomorrow",
      releasedYear: "2014",
      image: "",
      genres: [
        { name: "Action", id: "8" },
        { name: "Sci-Fi", id: "9" },
        { name: "Thriller", id: "10" },
      ],
      url: "",
      details: {
        rating: "7.9",
        duration: "1h 53m",
        description:
          "A soldier caught in a time loop must relive the same day in a war against aliens, improving his skills with each loop.",
      },
    },
    movieList: [],
    lastMovieId: "0",
    submitModal: () => {},
    onClose: () => {},
  },
};

export const DeleteForm: Story = {
  args: {
    modalType: "delete",
    movie: {
      id: "3",
      name: "Edge of Tomorrow",
      releasedYear: "2014",
      image: "",
      genres: [
        { name: "Action", id: "8" },
        { name: "Sci-Fi", id: "9" },
        { name: "Thriller", id: "10" },
      ],
      url: "",
      details: {
        rating: "7.9",
        duration: "1h 53m",
        description:
          "A soldier caught in a time loop must relive the same day in a war against aliens, improving his skills with each loop.",
      },
    },
    movieList: [],
    lastMovieId: "0",
    submitModal: () => {},
    onClose: () => {},
  },
};
