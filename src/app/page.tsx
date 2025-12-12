import Link from "next/link";
import { ScreenView } from "@/domains/ui/components/ScreenView";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <h1>Server-Driven UI Demo</h1>
        <div className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/settings">Settings</Link>
          <Link href="/survey">Survey</Link>
        </div>
      </nav>
      <main>
        <ScreenView screenId="home" />
      </main>
    </div>
  );
}
