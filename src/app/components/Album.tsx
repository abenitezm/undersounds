import Image from 'next/image'
import colors from '../colors'
import defaultAlbum from '../../assets/img/defaultAlbum.jpg'


export const Album = ({name}: {name: string}) => {

    return <div style={styles.albumContainer}>
        <Image src={defaultAlbum} style={{borderRadius: 10, padding: 0}} width={120} height={120} alt='album'/>
        <span style={styles.albumName}>{name}</span>
    </div>
}

const styles = {
    albumContainer: {
        display: "flex",
        width: 150,
        flexDirection: "column",
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        backgroundColor: colors.primary,
    },
    albumName: {
        fontSize: 16,
        marginTop: 5,
    }

}