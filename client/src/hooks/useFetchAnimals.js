import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAnimals, fetchAnimalAndDeviceInfo } from "../redux/reducer";

export const useFetchAnimals = () => {
  const dispatch = useDispatch();
  const animals = useSelector((state) => state.animals.list);

  useEffect(() => {
    dispatch(fetchAnimalAndDeviceInfo());
    dispatch(fetchAllAnimals());
  }, [dispatch]);

  return { animals };
};
