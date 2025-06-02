document.addEventListener('DOMContentLoaded', function() {
    const screenshotBtn = document.getElementById('screenshot-btn');
    const downloadLink = document.getElementById('download-link');
    const loading = document.getElementById('loading');
    
    screenshotBtn.addEventListener('click', async function() {
        try {
            // Show loading state
            screenshotBtn.style.display = 'none';
            loading.classList.remove('hidden');
            downloadLink.classList.add('hidden');
            
            // Call the backend API to take a screenshot
            const response = await fetch('/api/screenshot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: window.location.href
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to take screenshot');
            }
            
            // Get the blob from response
            const blob = await response.blob();
            
            // Create a URL for the blob
            const url = URL.createObjectURL(blob);
            
            // Set the download link
            downloadLink.href = url;
            downloadLink.download = 'pinterest-marketing-infographic.png';
            downloadLink.classList.remove('hidden');
            
            // Hide loading and show button again
            loading.classList.add('hidden');
            screenshotBtn.style.display = 'inline-block';
            
        } catch (error) {
            console.error('Error taking screenshot:', error);
            
            // Hide loading and show error state
            loading.classList.add('hidden');
            screenshotBtn.style.display = 'inline-block';
            screenshotBtn.textContent = 'Error! Try Again';
            screenshotBtn.style.backgroundColor = '#dc3545';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                screenshotBtn.textContent = 'Take Screenshot';
                screenshotBtn.style.backgroundColor = '';
            }, 3000);
        }
    });
});