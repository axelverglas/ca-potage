"use client";

import Section from "../Section";
import Container from "../Container";
import Card from "../Card";
import { Product } from "@/types/Product";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  calculateDistance,
  getCurrentLocation,
  Coordinates,
} from "@/actions/geoUtils";
import { useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import Heading from "../Heading";
import { User } from "@prisma/client";

interface ProductListingProps {
  products: Product[];
  currentUser: User | null;
}

export default function ProductListing({
  products,
  currentUser,
}: ProductListingProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isOpen, setIsOpen] = useState(false);
  const [distance, setDistance] = useState<number>(100);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  const handleOpenModal = () => {
    setIsOpen(true);

    getCurrentLocation()
      .then((location) => {
        setUserLocation(location);
      })
      .catch((error) => {
        console.error("Failed to get current location:", error);
      });
  };

  useEffect(() => {
    if (!userLocation || distance === null) return;

    let newFilteredProducts = products;

    if (distance < 100) {
      newFilteredProducts = products.filter((product) => {
        const distanceFromUser = calculateDistance(
          userLocation,
          product.location.coordinates
        );
        return distanceFromUser <= distance;
      });
    }

    setFilteredProducts(newFilteredProducts);
  }, [distance, products, userLocation]);
  return (
    <>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                Filtrer par distance
              </Dialog.Title>

              <div className="mt-2">
                {userLocation ? (
                  <div className="mt-2">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={distance}
                      onChange={(e) => setDistance(parseInt(e.target.value))}
                    />
                    <p>{distance < 100 ? `${distance} km` : "100+ km"}</p>
                  </div>
                ) : (
                  <p>
                    Veuillez activer votre localisation pour utiliser cette
                    fonctionnalité
                  </p>
                )}
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="text-primary hover:text-primaryhover"
                  onClick={() => setIsOpen(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Section id="product">
        <Container>
          <Heading level="h2" size="h2" className="mb-4">
            Les produits
          </Heading>
          <button
            onClick={handleOpenModal}
            className="font-medium hover:text-primary flex items-center gap-2"
          >
            <FiFilter className="w-6 h-6" />
            Filtrer par distance
          </button>
          {filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  currentUser={currentUser}
                />
              ))}
            </div>
          ) : (
            <p className="text-center mt-4">Aucun produit</p>
          )}
        </Container>
      </Section>
    </>
  );
}
