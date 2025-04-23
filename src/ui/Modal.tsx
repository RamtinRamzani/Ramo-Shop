import {
  cloneElement,
  createContext,
  useContext,
  useState,
  ReactElement,
  Dispatch,
  SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import useOutsideClick from "../hooks/useOutsideClick";

const ModalContext = createContext({
  openName: "",
  close: () => {},
  open: (() => {}) as Dispatch<SetStateAction<string>>,
});

import { ReactNode } from "react";

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: openWindowName,
}: {
  children: ReactElement;
  opens: string;
}) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(openWindowName) });
}

function Window({ children, name }: { children: ReactElement; name: string }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick({ handler: close });

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-backdrop backdrop-blur-sm transition-all mt-10">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-300 font-semibold rounded-lg shadow-lg p-8 transition-all"
      >
        <button
          onClick={close}
          className="absolute top-3 left-3 p-1 rounded-sm transform translate-x-2 hover:bg-grey-100"
        >
          <HiXMark className="w-6 h-6 text-grey-500" />
        </button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
