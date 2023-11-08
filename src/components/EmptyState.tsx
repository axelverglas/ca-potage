import Container from "./Container";
import Heading from "./Heading";
import Section from "./Section";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

export default function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <Section>
      <Container>
        <div className="flex justify-center items-center flex-col gap-2">
          <Heading level="h1" size="h1">
            {title}
          </Heading>
          <p>{subtitle}</p>
        </div>
      </Container>
    </Section>
  );
}
