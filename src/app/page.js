import styles from "./page.module.css";
import InfiniteText from "@/infiniteText/infiniteText";
export default function Home() {
  return (
    <main className={styles.main}>
      <InfiniteText/>
    </main>
  );
}
