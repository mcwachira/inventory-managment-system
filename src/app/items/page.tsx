import ItemsTable from "@/components/items/ItemsTable";
const Items = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Item Management</h1>
        <p className="text-gray-500">
          Create, edit and manage your inventory items
        </p>
      </div>
      <ItemsTable />
    </>
  );
};

export default Items;
