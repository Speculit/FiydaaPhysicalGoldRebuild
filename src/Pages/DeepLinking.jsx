import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

function DeepLinking() {
    // const { page } = useParams();
    const location = useLocation(); // Gets the current location object
    const queryParams = new URLSearchParams(location.search);
    const someQueryParam = queryParams.get("page"); // Replace 'paramName' with the actual query param key

    // console.log("chandan", someQueryParam)


    

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        let url;

        // Redirect to the determined URL
        try {
            window.location.href = `fiydaa://${someQueryParam}`;

        } catch (e) {

            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                url = 'https://apps.apple.com/in/app/fiydaa-fintech-hub-by-speculit/id6475651556';
            }
            // Detect Android
            else if (/android/i.test(userAgent)) {
                url = 'https://play.google.com/store/apps/details?id=com.fiydaa&pcampaignid=web_share';
            }
            // Detect macOS
            else if (navigator.platform.toLowerCase().includes('mac')) {
                url = 'https://apps.apple.com/in/app/fiydaa-fintech-hub-by-speculit/id6475651556';
            }
            // Default to Play Store for other platforms (e.g., Windows)
            else {
                url = 'https://play.google.com/store/apps/details?id=com.fiydaa&pcampaignid=web_share';
            }

            window.location.href = url;
        }

    }, []); // Empty dependency array ensures this only runs once on mount.

    return (
        <>
            {/* <p>Redirecting to the app store...</p> */}
        </>
    );
}

export default DeepLinking;
