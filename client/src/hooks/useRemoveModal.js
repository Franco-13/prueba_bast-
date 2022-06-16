import { useState } from "react";
import { useDispatch } from "react-redux";
import { detailAnimal } from "../redux/reducer";

export const useRemoveModal = () => {
  const dispatch = useDispatch();

  const [showModalRemove, setShowModalRemove] = useState(false);

  const handleRemove = (id) => {
    dispatch(detailAnimal(id));
    setShowModalRemove(true);
  };

  return { showModalRemove, setShowModalRemove, handleRemove };
};
