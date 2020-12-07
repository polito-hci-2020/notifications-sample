let notification_btn = document.getElementById("notification");
let output = document.getElementById("output");

notification_btn.addEventListener('click', function() {

    // Wait for permission
    Notification.requestPermission().then( () => {

        output.innerHTML += "Notification permission: " + Notification.permission + "<br>";

        let notification_title = "Hi!";
        let notification_body = "This is a sample notification.";
        let notification_icon = "icon.png";


        /***
        This works in all browsers (except Google Chrome mobile)
         ***/
        let notification = new Notification(notification_title, {body: notification_body, icon:notification_icon});

        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'visible') {
                // The tab has become visible, so clear the now-stale Notification.
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
            window.alert("Error: the browser cannot access the notifications. Change the" +
                " browser permission settings and reload the page.");
        });
        notification.addEventListener('show', function(){
            output.innerHTML += "Notification.event: show<br>";
        });


        /***
         This works in all browsers (including Google Chrome mobile)
         ***/
        navigator.serviceWorker.register('sw.js');
        navigator.serviceWorker.ready.then(function(registration) {
            if(Notification.permission == "granted")
                registration.showNotification(notification_title, {body: notification_body, icon:notification_icon});
        });

    });

});
