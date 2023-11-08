"use client";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import useLoginModal from "@/hooks/useLoginModal";
import Input from "@/components/Input/Input";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useCallback } from "react";
import useRegisterModal from "@/hooks/useRegisterModal";

const SignUpFormSchema = z.object({
  name: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
  role: z.enum(["BUYER", "SELLER", "BOTH"]),
});

type SignUpFormInputs = z.infer<typeof SignUpFormSchema>;

export default function AuthModal() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const router = useRouter();

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (result?.error) {
      toast.error(result.error);
      return;
    } else {
      toast.success("Inscription réussie");
      await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      router.refresh();
      registerModal.onClose();
    }
  };

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title="Inscription"
    >
      <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="name"
          type="text"
          label="Nom"
          placeholder="Nom"
          register={register("name")}
          error={errors.name?.message}
        />
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="Email"
          register={register("email")}
          error={errors.email?.message}
        />
        <Input
          id="password"
          type="password"
          label="Mot de passe"
          placeholder="Mot de passe"
          register={register("password")}
          error={errors.password?.message}
        />
        <Controller
          control={control}
          name="role"
          defaultValue="BUYER"
          render={({ field }) => (
            <Input
              id="role"
              type="select"
              label="Rôle"
              options={[
                { value: "BUYER", label: "Acheteur" },
                { value: "SELLER", label: "Vendeur" },
                { value: "BOTH", label: "Acheteur & Vendeur" },
              ]}
              {...field}
              error={errors.role?.message}
            />
          )}
        />
        <div className="mt-6 flex items-center justify-center">
          <Button type="submit">S&apos;inscire</Button>
        </div>
      </form>
      <p className="text-center pt-0 p-6">
        Vous avez déjà un compte ?{" "}
        <button onClick={onToggle} className="text-primary font-semibold">
          Connectez-vous
        </button>
      </p>
    </Modal>
  );
}
