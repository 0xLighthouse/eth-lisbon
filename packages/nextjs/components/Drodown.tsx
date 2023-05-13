import { Button, Menu } from "@mantine/core";

interface Props {
  onClick: () => void;
}
export const DropdownMenu: React.FC<Props> = ({ onClick }) => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="outline">Add new</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Types</Menu.Label>
        <Menu.Divider />
        <Menu.Item onClick={onClick}>Metamask</Menu.Item>
        <Menu.Item>Safe</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
