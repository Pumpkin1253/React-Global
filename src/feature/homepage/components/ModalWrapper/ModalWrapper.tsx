import { AddForm } from "..";
import type { ModalType } from "../../constants/homepage.constants";
import type { Movie } from "../../interfaces/homepage.interfaces";
import { DeleteForm } from "../DeleteForm";
import { EditForm } from "../EditForm";
import { Modal } from "../Modal/Modal";

export interface ModalWrapperProps {
  modalType: ModalType;
  movie: Movie | null;
  movieList: Movie[];
  submitModal: (newMovieList: Movie[]) => void;
  onClose: () => void;
}

export function ModalWrapper(props: ModalWrapperProps) {
  let content;

  switch (props.modalType) {
    case "edit":
      content = props.movie && (
        <EditForm
          movie={props.movie}
          movieList={props.movieList}
          onEditMovie={props.submitModal}
        />
      );
      break;
    case "add":
      content = (
        <AddForm movieList={props.movieList} onAddMovie={props.submitModal} />
      );
      break;
    case "delete":
      content = props.movie && (
        <DeleteForm
          movie={props.movie}
          movieList={props.movieList}
          onDeleteMovie={props.submitModal}
        />
      );
      break;
  }

  return <Modal modalContent={content} onClose={props.onClose}></Modal>;
}
