import { useLoaderData, useOutletContext } from "react-router-dom";
import type { FormValues, Movie } from "../../interfaces/homepage.interfaces";
import { MovieForm } from "../MovieForm";
import { Modal } from "../Modal";
import { editMovie } from "../../api/movie";

interface EditFormContextType {
  onCloseModal: () => void;
  onSubmitModal: () => void;
}

export function EditForm() {
  const { onCloseModal, onSubmitModal } =
    useOutletContext<EditFormContextType>();
  const movie = useLoaderData() as Movie;
  const formTitle = "Edit Movie";

  const onSubmit = (formData: FormValues) => {
    const selectedGenre = movie.genres.find(
      (genre) => genre === formData.genre
    );

    const updatedMovie = {
      ...movie,
      title: formData.title,
      release_date: formData.release_date,
      vote_average: formData.vote_average,
      runtime: formData.runtime,
      overview: formData.overview,
      genres: selectedGenre ? movie.genres : [...movie.genres, formData.genre],
    };

    editMovie(updatedMovie).finally(() => onSubmitModal());
  };

  return (
    <Modal
      modalContent={
        <MovieForm
          formTitle={formTitle}
          movie={movie}
          onSubmit={onSubmit}
        ></MovieForm>
      }
      onClose={onCloseModal}
    ></Modal>
  );
}
