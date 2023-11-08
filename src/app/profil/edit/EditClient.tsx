"use client";

import Container from "@/components/Container";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Image from "next/image";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/Input/Input";
import Button from "@/components/Button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import { FiLogOut, FiUpload } from "react-icons/fi";
import { ChevronLeft } from "@/components/Icons";

const SettingsSchema = z.object({
  name: z.string().min(1, "Nom requis").nullable(),
  image: z.string().url("URL invalide").nullable(),
  role: z.enum(["BUYER", "SELLER", "BOTH"]).nullable(),
});

type SettingsInputs = z.infer<typeof SettingsSchema>;

export default function SettingsClient({
  currentUser,
}: {
  currentUser: User | null;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<SettingsInputs>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
      role: currentUser?.role,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<SettingsInputs> = async (data) => {
    const res = await fetch("/api/settings", {
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
      toast.success("Modification réussie");
      router.refresh();
    }
  };

  const handleSignOut = () => {
    signOut();
  };

  const handleGoBack = () => {
    router.back();
  };
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-20">
          <div>
            <div className="flex gap-2 items-center">
              <ChevronLeft
                className="w-5 h-5 stroke-black"
                onClick={handleGoBack}
              />
              <Heading level="h1" size="h2">
                Vos paramètres
              </Heading>
            </div>
            <p className="mt-6">Gérer les paramètres de votre profil</p>
            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="photo" className="mb-2 block">
                  Photo
                </label>
                <div className="flex items-center gap-x-3">
                  <Image
                    width="60"
                    height="60"
                    className="rounded-full"
                    src={image || currentUser?.image || "/img/placeholder.webp"}
                    alt="Avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="qzsedazf"
                  >
                    <button
                      type="button"
                      className="font-medium hover:text-primary flex items-center"
                    >
                      Changer
                      <FiUpload className="ml-2 w-5 h-5" />
                    </button>
                  </CldUploadButton>
                </div>
              </div>
              <Input
                label="Nom"
                id="name"
                error={errors.name?.message}
                register={register("name")}
              />
              <Controller
                control={control}
                name="role"
                defaultValue={currentUser?.role || "BUYER"}
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

              <div className="mt-6">
                <Button type="submit">Enregistrer</Button>
              </div>
            </form>
          </div>
          <div>
            <Heading level="h2" size="h3">
              Votre compte
            </Heading>
            <button
              className="mt-6 flex items-center text-red-500 hover:text-red-700"
              onClick={handleSignOut}
            >
              <FiLogOut className="mr-2 w-5 h-5" />
              Se déconnecter
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
