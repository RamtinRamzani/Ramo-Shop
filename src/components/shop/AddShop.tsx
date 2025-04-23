import CreateShopForm from "./CreateShopForm";
import Modal from "../../ui/Modal";

export default function AddShop() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <button className="bg-slate-700 text-white mt-10 p-2 rounded-md font-semibold hover:scale-110 transition-all duration-300">
            Add item
          </button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateShopForm onCloseModal={() => console.log("Modal closed")} />
        </Modal.Window>
      </Modal>
    </div>
  );
}
