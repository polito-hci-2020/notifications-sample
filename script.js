var notification_btn = document.getElementById("notification");
var output = document.getElementById("output");

notification_btn.addEventListener('click', function() {
    let promise = Notification.requestPermission();
    // Wait for permission

    console.log("Notification permission: " + Notification.permission);
    output.innerHTML += "Notification permission: " + Notification.permission + "<br>";

    var notification_title = "Notification title";
    var notification_body = "Notification body";
    var notification_icon = "icon.png";

    var notification = new Notification(notification_title, {body: notification_body, icon:notification_icon});

    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            // The tab has become visible so clear the now-stale Notification.
            notification.close();
        }
    });

    notification.addEventListener('click', function(){
        output.innerHTML += "Notification.event: click<br>";
    });
    notification.addEventListener('close', function(){
        output.innerHTML += "Notification.event: close<br>";
    });
    notification.addEventListener('error', function(){
        output.innerHTML += "Notification.event: error<br>";
    });
    notification.addEventListener('show', function(){
        output.innerHTML += "Notification.event: show<br>";
    });
});
