import { memo } from "react";
import styles from "./_character-card.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

interface CharacterCardProps {
  name: string;
  image: string;
  id: string;
}

const CharacterCard = ({ name, image, id }: CharacterCardProps) => {
  return (
    <li className={styles["character-card-container"]}>
      <motion.div
        className={styles["character-card"]}
        layoutId={`character-${id}`}
        layout={"position"}
        viewport={{ once: true }}
        initial={{
          opacity: 0
        }}
        whileInView={{
          opacity: 1
        }}
      >
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
      </motion.div>
      <div className={styles["character-card__info-connector"]}></div>
      <div className={styles["character-card__info"]}>
        <div>{name}</div>
      </div>
    </li>
  );
};

export default memo(CharacterCard);
