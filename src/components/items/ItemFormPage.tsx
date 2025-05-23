"use client";

import ItemForm from "@/components/items/ItemForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  itemId?: string;
};

const ItemFormPage = ({ itemId }: Props) => {
  return (
    <>
      <div className="mb-6 flex items-center">
        <Link href={itemId ? `/items/${itemId}` : "/items"} className="mr-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {itemId ? "Edit Item" : "Add New Item"}
          </h1>
          <p className="text-gray-500">
            {itemId ? "Update item information" : "Create a new inventory item"}
          </p>
        </div>
      </div>

      <ItemForm itemId={itemId} />
    </>
  );
};

export default ItemFormPage;
