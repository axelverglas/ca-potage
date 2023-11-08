import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { siteConfig } from "@/config/siteconfig";

export default function Legal() {
  return (
    <Section>
      <Container>
        <Heading level="h1" size="h2" className="mb-6">
          Mentions légales
        </Heading>

        <Heading level="h2" size="h3" className="mb-2">
          Directeur de publication
        </Heading>
        <Text>Axel Verglas - axelverglas@outlook.com</Text>
        <Heading level="h2" size="h3" className="mb-2">
          Hébergeur
        </Heading>
        <Text>
          Vercel Inc. - 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
        </Text>
        <Heading level="h2" size="h3" className="mb-2">
          Propriété intellectuelle
        </Heading>
        <Text>
          Toute reproduction ou diffusion totale ou partielle du site{" "}
          {siteConfig.url} sans l&apos;autorisation expresse du directeur de
          publication, est interdite. Le contenu est disponible pour un usage
          privé et non collectif. Nous nous réservons le droit de modifier le
          contenu de ce site web de toutes les façons que ce soit, à tout moment
          et pour n&apos;importe quelle raison, et ce, sans notification
          préalable particulière. Nous nous engageons à ne pas vendre ou
          distribuer vos données personnelles à tout autre organisme.
        </Text>
        <Heading level="h2" size="h3" className="mb-2">
          Création Graphique Et Design
        </Heading>
        <Text>
          Les images illustratives proviennent d&apos;une banque d&apos;images
          (images non contractuelles)
        </Text>
      </Container>
    </Section>
  );
}

function Text({ children }: { children: React.ReactNode }) {
  return <p className="mb-4">{children}</p>;
}
