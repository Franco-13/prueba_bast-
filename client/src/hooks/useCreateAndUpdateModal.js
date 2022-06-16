import { useState } from "react";
import { useDispatch } from "react-redux";
import { detailAnimal, resetAnimal } from "../redux/reducer";

export const useCreateAndUpdateModal = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const [update, setUpdate] = useState(false);

  const handleCreateModal = () => {
    dispatch(resetAnimal());
    setUpdate(false);
    setShowModal(true);
  };

  const handleUpdateModal = (id) => {
    setUpdate(true);
    setShowModal(true);
    dispatch(detailAnimal(id));
  };

  return {
    showModal,
    update,
    handleCreateModal,
    handleUpdateModal,
    setShowModal,
  };
};
