//funkcja zwracająca odległośś między dwoma punktami
export const distance = function (p1, p2) {
    const radius = 6371;
    const lat1 = p1.latitude * (Math.PI / 180);
    const lat2 = p2.latitude * (Math.PI / 180);
    const lon1 = p1.longitude * (Math.PI / 180);
    const lon2 = p2.longitude * (Math.PI / 180);
    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radius * c;
}