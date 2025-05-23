import React from "react";
import ItemDetails from "@/components/items/ItemDetails";

type Params = Promise<{ id: string }>;
const ItemDetailPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  console.log(id);
  //fetch ItemDetails

  return (
    <>
      <ItemDetails id={id} />
    </>
  );
};

export default ItemDetailPage;
