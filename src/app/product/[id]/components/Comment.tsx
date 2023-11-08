import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/Button";
import Input from "@/components/Input/Input";
import toast from "react-hot-toast";
import { action } from "@/app/product/[id]/components/action";
import { useTransition } from "react";
import { User } from "@prisma/client";
import { ProductWithUser } from "@/types/Product";
import Image from "next/image";
import Heading from "@/components/Heading";

const CommentFormSchema = z.object({
  comment: z.string().nonempty("Un commentaire ne peut pas être vide"),
});

export type CommentFormInputs = z.infer<typeof CommentFormSchema>;

interface CommentProps {
  currentUser: User | null;
  product: ProductWithUser;
}

export default function Comment({ currentUser, product }: CommentProps) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormInputs>({
    resolver: zodResolver(CommentFormSchema),
  });

  const onSubmit: SubmitHandler<CommentFormInputs> = async (data) => {
    startTransition(() => {
      action(data, currentUser?.id, product.id);
    });

    toast.success("Commentaire ajouté !");
    reset();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentUser && (
          <div className="mb-10 flex gap-x-10">
            <div className="h-14 w-16">
              <Image
                src={currentUser.image || "/img/placeholder.webp"}
                alt="Avatar"
                className="rounded-full"
                height={60}
                width={60}
              />
            </div>
            <div className="w-full">
              <Input
                id="comment"
                type="text"
                label="Ajouter un commentaire"
                placeholder="Ajouter un commentaire"
                register={register("comment")}
                error={errors.comment?.message}
                textarea
              />
              <div className="mt-4 flex justify-end">
                {isPending ? (
                  <Button type="submit">En cours...</Button>
                ) : (
                  <Button type="submit">Publier</Button>
                )}
              </div>
            </div>
          </div>
        )}
      </form>
      <div className="flex flex-col gap-y-10">
        {product.comments && product.comments.length > 0 ? (
          product.comments.map((comment) => (
            <div className="flex gap-x-10" key={comment.id}>
              <div>
                <Image
                  src={comment.user.image || "/img/placeholder.webp"}
                  alt="Avatar"
                  className="rounded-full"
                  height={70}
                  width={70}
                />
              </div>
              <div className="flex w-full flex-col gap-y-2">
                <Heading level="h3" size="h4">
                  {comment.user.name}
                </Heading>
                <p className="text-secondarylight dark:text-primary">
                  {new Date(comment.date).toLocaleDateString("fr-FR")}
                </p>
                <p>{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun commentaire pour le moment</p>
        )}
      </div>
    </>
  );
}
