"use client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Input from "@/components/Input/Input";
import Section from "@/components/Section";
import { useState } from "react";
import {
  SubmitHandler,
  useForm,
  FieldValues,
  Controller,
} from "react-hook-form";
import ImageUpload from "@/components/Input/ImageUpload";
import LocationSelect from "@/components/Input/InputLocation";
import { ChevronLeft } from "@/components/Icons";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import CustomDatePicker from "@/components/Input/Calendar";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";

enum STEPS {
  TITLE = 0,
  PRODUCTTYPE = 1,
  SALESPERIODE = 2,
  LOCATION = 3,
  IMAGES = 4,
  PRICE = 5,
}

export default function Product() {
  const [step, setStep] = useState(STEPS.TITLE);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      productType: "",
      salesPeriodeStart: new Date(),
      salesPeriodeEnd: new Date(),
      image: "",
      location: [],
    },
  });

  const image = watch("image");
  const salesPeriodeStart = watch("salesPeriodeStart");
  const location = watch("location");

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step < STEPS.PRICE) {
      onNext();
    } else {
      data.salesPeriodeStart = new Date(data.salesPeriodeStart).toISOString();
      data.salesPeriodeEnd = new Date(data.salesPeriodeEnd).toISOString();
      const res = await fetch("/api/product", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.error) {
        toast.error("Une erreur est survenue");
      } else {
        toast.success("Annonce créée avec succès");
        router.push("/");
        router.refresh();
      }
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const Map = useMemo(
    () =>
      dynamic(() => import("../../components/Map"), {
        ssr: false,
      }),
    [location]
  );

  let bodyContent = (
    <>
      <Input
        id="title"
        type="text"
        label="Titre de l'annonce"
        placeholder="Titre de l'annonce"
        register={register("title", { required: true })}
        error={errors.title && "Titre requis"}
      />
      <Input
        id="description"
        type="text"
        label="Description de l'annonce"
        placeholder="Description de l'annonce"
        register={register("description", { required: true })}
        error={errors.description && "Description requise"}
        textarea
      />
    </>
  );

  if (step === STEPS.PRODUCTTYPE) {
    bodyContent = (
      <Input
        id="productType"
        type="text"
        label="Type de produit"
        placeholder="Type de produit"
        register={register("productType", { required: true })}
        error={errors.productType && "Type de produit requis"}
      />
    );
  }

  if (step === STEPS.SALESPERIODE) {
    bodyContent = (
      <>
        <Controller
          control={control}
          name="salesPeriodeStart"
          rules={{ required: "Date de début de la période de vente requise" }}
          render={({ field, fieldState }) => (
            <CustomDatePicker
              label="Date de début"
              value={field.value}
              onChange={field.onChange}
              error={errors.salesPeriodeStart && fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="salesPeriodeEnd"
          rules={{
            required: "Date de fin de la période de vente requise",
            validate: (value) =>
              value >= salesPeriodeStart ||
              "La date de fin doit être supérieure à la date de début",
          }}
          render={({ field, fieldState }) => (
            <CustomDatePicker
              label="Date de fin"
              value={field.value}
              onChange={field.onChange}
              error={errors.salesPeriodeEnd && fieldState.error?.message}
            />
          )}
        />
      </>
    );
  }

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-4 mb-4">
        <Controller
          control={control}
          name="location"
          rules={{ required: "Localisation requise" }}
          render={({ field, fieldState }) => (
            <LocationSelect
              onChange={(value) => field.onChange(value)}
              value={field.value}
              error={fieldState.error && fieldState.error.message}
            />
          )}
        />
        <Map center={location.coordinates} />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="mb-4">
        <label className="block mb-2">Photo du produit</label>
        <ImageUpload
          onChange={(value) => setCustomValue("image", value)}
          value={image}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div>
        <Input
          id="price"
          type="number"
          label="Prix de l'annonce"
          placeholder="Prix de l'annonce"
          register={register("price", { required: true })}
          error={errors.price && "Prix requis"}
        />
      </div>
    );
  }
  return (
    <Section>
      <Container>
        <div className="flex items-center gap-2 mb-6">
          <ChevronLeft
            className="w-5 h-5 stroke-black"
            onClick={handleGoBack}
          />
          <Heading level="h1" size="h2">
            Publier votre annonce
          </Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            {bodyContent}
            <div className="flex gap-2">
              {step > STEPS.TITLE && (
                <Button secondary type="button" onClick={onBack}>
                  Précédent
                </Button>
              )}
              <Button type="submit">
                {step === STEPS.PRICE ? "Ajouter" : "Suivant"}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </Section>
  );
}
