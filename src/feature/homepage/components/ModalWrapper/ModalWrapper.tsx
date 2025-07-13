import type { ModalType } from "../../constants/homepage.constants";
import type { Movie } from "../../interfaces/homepage.interfaces";
import { DeleteForm } from "../DeleteForm";
import { EditForm } from "../EditForm";
import { Modal } from "../Modal/Modal";

export interface ModalWrapperProps {
  modalType: ModalType;
  movie: Movie | null;
  movieList: Movie[];
  lastMovieId: string;
  submitModal: (newMovieList: Movie[]) => void;
  onClose: () => void;
}

export function ModalWrapper(props: ModalWrapperProps) {
  let content;

  const submitModal = (updatedMovie: Movie) => {
    let newMovieList: Movie[] = [];
    switch (props.modalType) {
      case "edit":
        newMovieList = props.movieList.map((movie) =>
          movie.id === updatedMovie.id ? updatedMovie : movie
        );
        break;
      case "add":
        newMovieList = props.movieList;
        newMovieList.push(updatedMovie);
        break;
      case "delete":
        newMovieList = props.movieList;
        newMovieList = newMovieList.filter(
          (movie) => movie.id !== updatedMovie.id
        );
        break;
    }
    props.submitModal(newMovieList);
  };

  switch (props.modalType) {
    case "edit":
      content = props.movie && (
        <EditForm
          formTitle={"Edit Movie"}
          movie={props.movie}
          onEditMovie={submitModal}
        />
      );
      break;
    case "add":
      content = (
        <EditForm
          formTitle={"Add Movie"}
          lastMovieId={props.lastMovieId}
          onEditMovie={submitModal}
        />
      );
      break;
    case "delete":
      content = props.movie && (
        <DeleteForm movie={props.movie} onDeleteMovie={submitModal} />
      );
      break;
  }

  return <Modal modalContent={content} onClose={props.onClose}></Modal>;
}
