"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
};

export default function Home() {
  const [isFetching, setIsFetching] = useState(false);
  const [isShowToast, setIsShowToast] = useState(true);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["products"],

    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      return res.json();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsShowToast(false);
      }, 3000);
    }
  }, [isSuccess]);
  if (isLoading && isFetching) {
    return (
      <div className="container mx-auto">
        <Skeleton className="h-32 w-full mb-5"></Skeleton>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, index) => {
            return (
              <Skeleton
                key={`skeleton-${index}`}
                className="h-60 w-full"
              ></Skeleton>
            );
          })}
        </div>
      </div>
    );
  }

  if (isError && isFetching) {
    return (
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold text-center">Error</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div>
        <h1>Prodcuts</h1>
        {!isFetching ? (
          <Button variant={"default"} onClick={() => setIsFetching(true)}>
            Fetch data
          </Button>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {isShowToast && isSuccess && (
              <div className="fixed top-5 animate-in slide-in-from-right right-7 z-50 p-3 border rounded-md">
                <p>Success Fettching Data</p>
              </div>
            )}
            {data?.map((product: Product) => {
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
        )}
      </div>
    </div>
  );
}
