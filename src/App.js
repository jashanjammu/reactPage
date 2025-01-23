import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [adsgramLoaded, setAdsgramLoaded] = useState(false);

    useEffect(() => {
        // Check if Adsgram is already available
        if (window.Adsgram) {
            setAdsgramLoaded(true);
        } else {
            // Wait for Adsgram to load and check again
            const interval = setInterval(() => {
                if (window.Adsgram) {
                    clearInterval(interval);
                    setAdsgramLoaded(true);
                }
            }, 500); // Check every 500ms

            // Optionally, you can stop after some timeout in case Adsgram never loads
            setTimeout(() => {
                clearInterval(interval);
                if (!window.Adsgram) {
                    console.error("Adsgram script did not load");
                }
            }, 5000); // Stop after 5 seconds
        }
    }, []);

    // Move openTonkeeperApp function definition above its first usage
    const openTonkeeperApp = () => {
        const tonkeeperURI = "tonkeeper://"; // Tonkeeper app URI scheme
        const extensionURL =
            "https://chromewebstore.google.com/detail/tonkeeper-%E2%80%94-wallet-for-to/omaabbefbmiijedngplfjmnooppbclkk";
        const appStoreURL = "https://tonkeeper.com"; // Tonkeeper website for download

        const iframe = document.createElement("iframe");
        iframe.style.display = "none"; // Hide the iframe
        iframe.src = tonkeeperURI; // Attempt to open the Tonkeeper app
        document.body.appendChild(iframe);

        setTimeout(() => {
            window.location.href = extensionURL;
        }, 2000);

        setTimeout(() => {
            window.location.href = appStoreURL;
        }, 4000);
    };

    const handleOpenTonkeeper = () => {
        if (adsgramLoaded) {
            // Initialize the Adsgram controller
            const AdController = window.Adsgram.init({ blockId: "int-7369" });

            if (AdController) {
                // Show the ad and wait for the result
                AdController.show()
                    .then((result) => {
                        // Ad was shown successfully, proceed to open Tonkeeper
                        openTonkeeperApp();
                    })
                    .catch((error) => {
                        // Handle ad showing failure, proceed to open Tonkeeper anyway
                        console.error("Ad failed to show:", error);
                        openTonkeeperApp();
                    });
            } else {
                console.error("Adsgram initialization failed.");
                openTonkeeperApp();
            }
        } else {
            console.error("Adsgram script not loaded correctly.");
            openTonkeeperApp();
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Open Tonkeeper (App or Extension)</h1>
                <p>Click the button below to open Tonkeeper (app or extension):</p>
                <button onClick={handleOpenTonkeeper}>Open Tonkeeper</button>
            </header>
        </div>
    );
}

export default App;

