import { Modal, TextInput } from "@mantine/core";

interface Props {
  isOpened: boolean;
  onClose: () => void;
}
export const AddNewAdress: React.FC<Props> = ({ isOpened, onClose }) => {
  return (
    <Modal opened={isOpened} onClose={onClose} title="Authentication">
      {/* Modal content */}

      <TextInput label="address" />
    </Modal>
  );
};
