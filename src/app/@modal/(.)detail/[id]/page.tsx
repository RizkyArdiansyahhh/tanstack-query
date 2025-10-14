"use client";
import { Modal } from "@/components/shared/modal";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

const DetailProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      return res.json();
    },
    enabled: !!id,
  });

  return (
    <Modal>
      <div className="w-full h-full flex flex-row">
        {isLoading ? (
          <>
            <div className="w-1/2">
              <Skeleton className="h-96 w-72"></Skeleton>
            </div>
            <div className="w-1/2">
              <Skeleton className="w-full"></Skeleton>
              <Skeleton className="w-full"></Skeleton>
            </div>
          </>
        ) : isError ? (
          <p>Error</p>
        ) : (
          <>
            <div className="w-1/2">
              <Image
                src={data?.image}
                width={500}
                height={500}
                alt={data?.title}
              ></Image>
            </div>
            <div className="w-1/2 p-2">
              <h2 className="font-bold text-xl">{data?.title}</h2>
              <p>{data?.description}</p>
              <p>${data?.price}</p>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default DetailProductPage;
