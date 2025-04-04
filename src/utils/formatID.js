
export default function formatID(id) {
    return id.replaceAll(/%20/g, " ").toLowerCase();
}