  'use client';

  export default function Home() {
    return (
      <div style={ styles.container }>
        <h1>Hola</h1>
      </div>
    );
  }
  const styles = {
    container:{
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        height: "50vh"
    }
}
