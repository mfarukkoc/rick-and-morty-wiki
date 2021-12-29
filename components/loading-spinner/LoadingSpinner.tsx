import Image from "next/image";
import styles from "./_loading-spinner.module.scss";
const LoadingSpinner = () => {
  return (
    <div className={styles["loading-spinner"]}>
      <Image
        src={"/rick-portal.png"}
        width={200}
        height={200}
        alt={"Loading"}
      />
    </div>
  );
};

export default LoadingSpinner;
