"use client";
import { Modal } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";

const AddProductPage = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      return await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: formData,
      });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(new FormData(e.target as HTMLFormElement));
  };
  return (
    <>
      <Modal>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-80 mb-2">
            <label htmlFor="id">ID</label>
            <input
              type="number"
              id="id"
              name="id"
              className="p-3 border rounded-md"
            />
          </div>
          <div className="flex flex-col w-80 mb-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="p-3 border rounded-md"
            />
          </div>
          <div className="flex flex-col w-80 mb-2">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              className="p-3 border rounded-md"
            />
          </div>
          <Button disabled={isPending} type="submit">
            {isPending ? <Spinner></Spinner> : "Submit"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddProductPage;
