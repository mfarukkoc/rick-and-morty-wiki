import CharacterCard from "components/character-card/CharacterCard";
import { useCharacter } from "components/character-list-context/CharacterListContext";
import LoadingSpinner from "components/loading-spinner/LoadingSpinner";
import Link from "next/link";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import styles from "./_character-cards.module.scss";

const CharacterCards = () => {
  const ref = useRef<HTMLUListElement>(null);
  const { characterList, loadNext, loading } = useCharacter();

  const handleScroll = useCallback(() => {
    const element = ref.current;
    const loadingDistance = 200;
    if (element) {
      const elementPosition = element.offsetHeight + element.offsetTop;
      const scrollPosition = window.innerHeight + window.scrollY;
      if (elementPosition - scrollPosition < loadingDistance) {
        if (!loading) loadNext();
      }
    }
  }, [loadNext, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <ul
        className={styles["character-cards"]}
        ref={ref}
        onScroll={() => console.log("test")}
      >
        {characterList.map((character) => (
          <Link key={character.id} href={`/character/${character.id}`}>
            <a>
              <CharacterCard {...character}></CharacterCard>
            </a>
          </Link>
        ))}
      </ul>
      {loading && <LoadingSpinner />}
    </>
  );
};

export default memo(CharacterCards);
