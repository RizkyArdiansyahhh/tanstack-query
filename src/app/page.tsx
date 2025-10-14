"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
};

export default function Home() {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      return res.json();
    },
  });

  return (
    <div className="container mx-auto">
      <div>
        <h1>Prodcuts</h1>
        <div className="grid grid-cols-4 gap-3">
          {query.data?.map((product: Product) => {
            return (
              <div
                key={`product-${product.id}`}
                className="border rounded-md p-2 flex flex-col items-center"
              >
                <Image
                  src={product.image}
                  width={200}
                  height={200}
                  alt={product.title}
                  className="h-52 w-fit"
                ></Image>
                <p className="line-clamp-1">{product.title}</p>
                <p>{product.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
