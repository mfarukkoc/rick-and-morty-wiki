import { memo } from "react";
import styles from "./_character-card.module.scss";
import Image from "next/image";
interface CharacterCardProps {
  name: string;
  image: string;
}

const CharacterCard = ({ name, image }: CharacterCardProps) => {
  return (
    <div>
      <div className={styles["character-card"]}>
        <div className={styles["character-card__image"]}>
          <Image
            src={image}
            alt={name}
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
          />
        </div>
      </div>
      <div className={styles["character-card__info-connector"]}></div>
      <div className={styles["character-card__info"]}>
        <div>{name}</div>
      </div>
    </div>
  );
};

export default memo(CharacterCard);
