"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import useLoginModal from "@/hooks/useLoginModal";
import Input from "@/app/components/Input/Input";
import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import { useCallback } from "react";
import useRegisterModal from "@/hooks/useRegisterModal";

const LoginFormSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

type LoginFormInputs = z.infer<typeof LoginFormSchema>;

export default function AuthModal() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginFormSchema),
  });

  const router = useRouter();

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const { email, password } = data;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Connexion réussie");
    router.refresh();
    loginModal.onClose();
  };

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Connexion"
    >
      <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="mt-6 flex items-center justify-center">
          <Button type="submit">Se connecter</Button>
        </div>
      </form>
      <p className="text-center pt-0 p-6">
        Vous n&apos;avez pas de compte ?{" "}
        <button onClick={onToggle} className="text-primary font-semibold">
          Inscrivez-vous
        </button>
      </p>
    </Modal>
  );
}
