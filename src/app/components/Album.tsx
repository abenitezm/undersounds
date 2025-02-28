import colors from '../colors'

export const Album = () => {

    return <div style={styles.container}>
        <h1>Album</h1>
    </div>
}

const styles = {
    container: {
        display: "flex",
        height: '100px',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        backgroundColor: colors.primary,
    }

}