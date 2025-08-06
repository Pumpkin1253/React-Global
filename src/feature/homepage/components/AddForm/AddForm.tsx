import { useOutletContext } from "react-router-dom";
import images from "../../../../assets";
import { addMovie } from "../../api/movie";
import { genreList } from "../../constants/homepage.constants";
import type { FormValues } from "../../interfaces/homepage.interfaces";
import { Modal } from "../Modal";
import { MovieForm } from "../MovieForm";

interface AddFormContextType {
  onCloseModal: () => void;
  onSubmitModal: () => void;
}

export function AddForm() {
  const { onCloseModal, onSubmitModal } =
    useOutletContext<AddFormContextType>();
  const formTitle = "Add Movie";

  const onSubmit = (formData: FormValues) => {
    const selectedGenre = genreList.find((genre) => genre === formData.genre);

    addMovie({
      budget: 0,
      revenue: 0,
      poster_path: images.new,
      tagline: "tagline",
      vote_count: 0,
      genres: selectedGenre ? [selectedGenre] : [],
      overview: formData.overview,
      release_date: formData.release_date,
      runtime: Number(formData.runtime),
      title: formData.title,
      vote_average: Number(formData.vote_average),
    }).finally(() => onSubmitModal());
  };

  return (
    <Modal
      modalContent={
        <MovieForm formTitle={formTitle} onSubmit={onSubmit}></MovieForm>
      }
      onClose={onCloseModal}
    ></Modal>
  );
}
