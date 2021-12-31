import Image from "next/image";
import styles from "./_error-indicator.module.scss";
interface ErrorIndicatorProps {
  message?: string;
}

const ErrorIndicator = ({ message }: ErrorIndicatorProps) => {
  return (
    <div className={styles["error-indicator"]}>
      <Image
        src={"/pickle-rick.png"}
        layout={"fixed"}
        width={171}
        height={194}
        alt={"Pickle Rick"}
      />
      <div className={styles["error-indicator__message"]}>
        {message ?? "Error while loading the page"}
      </div>
    </div>
  );
};

export default ErrorIndicator;
