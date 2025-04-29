async function getUserLocation() {
    if ("geolocation" in navigator) {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                });
            });

            const coords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                source: "browser"
            };

            return coords;
        } catch (error) {
            alert("دسترسی به لوکیشن را در مرورگر فعال کنید")
        }
    } else {
        console.warn("🌐 مرورگر از geolocation پشتیبانی نمی‌کند.");
    }

    // try {
    //     const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
    //     const data = await res.json();

    //     return {
    //         lat: parseFloat(data.latitude),
    //         lng: parseFloat(data.longitude),
    //         city: data.city,
    //         country: data.country,
    //         source: "ip"
    //     };
    // } catch (error) {
    //     console.error("❌ گرفتن موقعیت از IP هم شکست خورد:", error);
    //     return null;
    // }
}

export { getUserLocation }