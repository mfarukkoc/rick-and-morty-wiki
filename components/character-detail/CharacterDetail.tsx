import { IFetchCharacterResponse } from "graphql/queries/CharacterQuery";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./_character-detail.module.scss";
import { motion } from "framer-motion";

interface CharacterDetailProps {
  character: IFetchCharacterResponse["character"];
  id: string;
}

const CharacterDetail = ({ character, id }: CharacterDetailProps) => {
  const router = useRouter();

  return (
    <motion.div
      className={styles["character-detail"]}
      layoutId={`character-${id}`}
    >
      <a
        href="#"
        onClick={() => router.back()}
        className={styles["character-detail__go-back"]}
      >
        Go Back
      </a>
      <div className={styles["character-detail__image"]}>
        <Image
          src={character.image}
          alt={character.name}
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
        />
      </div>
      <ul className={styles["character-detail__info"]}>
        <li>{character.name}</li>
        <li>{character.species}</li>
        <li>Status : {character.status}</li>
        <li>Last Location : {character.location.name}</li>
        <li>
          First Episode :
          {` ${character.episode[0].name} (${character.episode[0].episode})`}
        </li>
      </ul>
    </motion.div>
  );
};

export default CharacterDetail;
