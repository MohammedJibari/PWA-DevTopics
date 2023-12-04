// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
        console.log('Service Worker Registered');
    }).catch(function(err) {
        console.log('Service Worker Registration Failed', err);
    });
}

// Photo upload and preview
document.getElementById('photo-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        document.getElementById('preview').src = e.target.result;
    };

    reader.readAsDataURL(file);
});
