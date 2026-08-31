const status = document.getElementById("status");
const button = document.getElementById("enableNotifications");

button.addEventListener("click", async () => {
    if (!("Notification" in window)) {
        status.textContent = "Notifications are not supported by this browser.";
        return;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
        status.textContent = "Notifications enabled.";

        new Notification("UT Bot Alerts", {
            body: "Test notification is working."
        });
    } else {
        status.textContent = "Notification permission was denied.";
    }
});
