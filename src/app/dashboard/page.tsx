import { Album } from "@/app/components/Album";
import colors from "../colors";
import ActivityRow from "../components/ActivityRow";

const DashboardPage = async () => {
  return (
    <main style={styles.main}>
      <h1 style={styles.title}>Bienvenido a tus estadísticas</h1>
      <h2 style={styles.subtitle}>
        Así van las novedades de tu música esta semana
      </h2>
      <div style={styles.statsContainer}>
        <div style={styles.stat}>
          <span style={styles.statTitle}>Reproducciones</span>
          <span style={styles.statNumber}>617</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statTitle}>Seguidores</span>
          <span style={styles.statNumber}>58</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statTitle}>Ventas</span>
          <span style={styles.statNumber}>69</span>
        </div>
      </div>
      <h2 style={styles.subtitle}>Este es tu álbum más escuchado</h2>
      <div style={styles.albumContainer}>
        <Album name="Album 1" />
        <button>Crear un código de descuento</button>
      </div>
      <h2 style={styles.subtitle}>Actividad reciente</h2>
      <div style={styles.activityContainer}>
        <ActivityRow
          time={new Date()}
          type="FOLLOWER"
          name="Usuario 1"
          album=""
        />
        <ActivityRow
          time={new Date()}
          type="SALE"
          name="Usuario 2"
          album="Album 2"
        />
        <ActivityRow
          time={new Date()}
          type="REVIEW"
          name="Usuario 2"
          album="Album 5"
        />
      </div>
    </main>
  );
};

const styles = {
  main: {
    gap: 20,
    display: "flex",
    flexDirection: "column",
    padding: 20,
    width: "70%",
  },
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "normal",
    marginTop: 15,
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  stat: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    color: colors.background,
    backgroundColor: colors.primary,
  },
  statTitle: {
    fontSize: 16,
  },
  statNumber: {
    color: colors.tertiary,
    fontSize: 16,
    fontWeight: "bold",
  },
  albumContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  activityContainer: {
    width:  "60%",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    gap: 10,
  }
};

export default DashboardPage;
