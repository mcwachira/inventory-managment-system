import ItemFormPage from "@/components/items/ItemFormPage";

type Params = Promise<{ id: string }>;
const ItemEditPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  return (
    <>
      <ItemFormPage itemId={id} />;
    </>
  );
};

export default ItemEditPage;
