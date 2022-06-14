import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import ModalForm from "../../components/ModalForm";
import ModalRemoveAnimal from "../../components/ModalRemoveAnimal";
import RemoverIcon from "../../components/RemoverIcon";
import SearchBar from "../../components/SearchBar";
import UpdaterIcon from "../../components/UpdaterIcon";
import {
  detailAnimal,
  fetchAllAnimals,
  fetchAnimalAndDeviceInfo,
  resetAnimal,
  resetSearchAnimal,
  searchAnimalByID,
} from "../../redux/reducer";

import styles from "./paddock.module.css";

const useFetchAnimals = () => {
  const dispatch = useDispatch();
  const animals = useSelector((state) => state.animals.list);

  useEffect(() => {
    dispatch(fetchAnimalAndDeviceInfo());
    dispatch(fetchAllAnimals());
  }, [dispatch]);

  return { animals };
};

function AnimalRegistry() {
  const { animals } = useFetchAnimals();
  const dispatch = useDispatch();
  const filterList = useSelector((state) => state.animals.filterList);

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

  const [showModalRemove, setShowModalRemove] = useState(false);
  const handleRemove = (id) => {
    dispatch(detailAnimal(id));
    setShowModalRemove(true);
  };

  const [search, setSearch] = useState("");

  const handleChangeSearch = (e) => {
    if (e.target.value === "") {
      dispatch(resetSearchAnimal());
    }
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    console.log(search);
    dispatch(searchAnimalByID(search));
  };

  const arrayList = filterList ? filterList : animals;

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Registro de animales</h1>
      <SearchBar
        handleChangeSearch={handleChangeSearch}
        search={search}
        handleSearch={handleSearch}
      />
      <Button
        onClick={handleCreateModal}
        children="Registrar nuevo animal"
        right={true}
      />
      <div className={styles.table_responsive}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>ID SENASA</th>
              <th className={styles.th}>Tipo de animal</th>
              <th className={styles.th}>Peso del animal</th>
              <th className={styles.th}>Nombre del potrero</th>
              <th className={styles.th}>Tipo de dispositivo</th>
              <th className={styles.th}>Número del dispositivo</th>
              <th className={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {arrayList &&
              arrayList.map((e) => (
                <tr key={e._id} className={styles.tr}>
                  <td className={styles.td}>{e.id_senasa}</td>
                  <td className={styles.td}>{e.animal_type}</td>
                  <td className={styles.td}>{e.animal_weight}</td>
                  <td className={styles.td}>{e.paddock_name}</td>
                  <td className={styles.td}>{e.device_type}</td>
                  <td className={styles.td}>{e.device_number}</td>
                  <td className={styles.tdInline}>
                    <button
                      className={styles.btn_action}
                      title="Update"
                      onClick={() => handleUpdateModal(e._id)}
                    >
                      <UpdaterIcon stroke="#8db42f" />
                    </button>
                    <button
                      className={styles.btn_action}
                      title="Remove"
                      onClick={() => handleRemove(e._id)}
                    >
                      <RemoverIcon stroke="crimson" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ModalForm
        visible={showModal}
        updateAnimal={update}
        setShow={setShowModal}
      />
      <ModalRemoveAnimal
        visible={showModalRemove}
        setShow={setShowModalRemove}
      />
    </section>
  );
}

export default AnimalRegistry;
