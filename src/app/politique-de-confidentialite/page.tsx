import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Section from "@/components/Section";

export default function Legal() {
  return (
    <Section>
      <Container>
        <Heading level="h1" size="h2" className="mb-6">
          Politique de confidentialité
        </Heading>

        <Heading level="h2" size="h3" className="mb-2">
          Vos droits
        </Heading>
        <Text>
          Si vous êtes un résident européen, vous disposez des droits suivants
          liés à vos données personnelles : Le droit d&apos;être informé. Le
          droit d&apos;accès. Le droit de rectification. Le droit à
          l&apos;effacement. Le droit de restreindre le traitement. Le droit à
          la portabilité des données. Le droit d&apos;opposition. Les droits
          relatifs à la prise de décision automatisée et au profilage. Si vous
          souhaitez exercer ce droit, veuillez nous contacter via les
          coordonnées ci-dessous.
        </Text>
        <Text>
          En outre, si vous êtes un résident européen, nous notons que nous
          traitons vos informations afin d&apos;exécuter les contrats que nous
          pourrions avoir avec vous (par exemple, si vous passez une commande
          par le biais du site), ou autrement pour poursuivre nos intérêts
          commerciaux légitimes énumérés ci-dessus. En outre, veuillez noter que
          vos informations pourraient être transférées en dehors de
          l&apos;Europe, y compris au Canada et aux États-Unis.
        </Text>
        <Heading level="h2" size="h3" className="mb-2">
          Liens vers d&apos;autres sites web
        </Heading>
        <Text>
          Notre site web peut contenir des liens vers d&apos;autres sites web
          qui ne sont pas détenus ou contrôlés par nous. Sachez que nous ne
          sommes pas responsables de ces autres sites web ou des pratiques de
          confidentialité des tiers. Nous vous encourageons à être attentif
          lorsque vous quittez notre site web et à lire les déclarations de
          confidentialité de chaque site web susceptible de collecter des
          informations personnelles.
        </Text>
        <Heading level="h2" size="h3" className="mb-2">
          Sécurité de l&apos;information
        </Heading>
        <Text>
          Nous sécurisons les informations que vous fournissez sur des serveurs
          informatiques dans un environnement contrôlé et sécurisé, protégé
          contre tout accès, utilisation ou divulgation non autorisés. Nous
          conservons des garanties administratives, techniques et physiques
          raisonnables pour nous protéger contre tout accès, utilisation,
          modification et divulgation non autorisés des données personnelles
          sous son contrôle et sa garde. Toutefois, aucune transmission de
          données sur Internet ou sur un réseau sans fil ne peut être garantie.
        </Text>
        <Heading level="h2" size="h3" className="mb-2">
          Divulgation légale
        </Heading>
        <Text>
          Nous divulguerons toute information que nous collectons, utilisons ou
          recevons si la loi l&apos;exige ou l&apos;autorise, par exemple pour
          nous conformer à une citation à comparaître ou à une procédure
          judiciaire similaire, et lorsque nous pensons de bonne foi que la
          divulgation est nécessaire pour protéger nos droits, votre sécurité ou
          celle d&apos;autrui, enquêter sur une fraude ou répondre à une demande
          du gouvernement.
        </Text>
        <Heading level="h2" size="h3" className="mb-2">
          Informations de contact
        </Heading>
        <Text>
          Si vous souhaitez nous contacter pour comprendre davantage la présente
          politique ou si vous souhaitez nous contacter concernant toute
          question relative aux droits individuels et à vos informations
          personnelles, vous pouvez envoyer un courriel à
          axelverglas@outlook.com.
        </Text>
      </Container>
    </Section>
  );
}

function Text({ children }: { children: React.ReactNode }) {
  return <p className="mb-4">{children}</p>;
}
