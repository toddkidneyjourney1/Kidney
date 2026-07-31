document.addEventListener('DOMContentLoaded', () => {
  const shareButtons = document.querySelectorAll('.share-buttons button');
  const shareStatus = document.getElementById('share-status');
  
  const shareUrl = window.location.href;
  const shareTitle = document.encodeURIComponent ? document.title : "Help Todd Find a Kidney Donor";
  const shareText = "Help Todd find a living kidney donor. Learn his story or share this page to help make a difference:";

  shareButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const platform = button.getAttribute('data-share');

      if (platform === 'copy') {
        try {
          await navigator.clipboard.writeText(shareUrl);
          showStatus('Link copied to clipboard!');
        } catch (err) {
          showStatus('Failed to copy link.');
        }
        return;
      }

      let targetUrl = '';
      if (platform === 'facebook') {
        targetUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      } else if (platform === 'x') {
        targetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
      } else if (platform === 'email') {
        targetUrl = `mailto:?subject=${encodeURIComponent("Help Todd Find a Kidney Donor")}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`;
      }

      if (targetUrl) {
        if (platform === 'email') {
          window.location.href = targetUrl;
        } else {
          window.open(targetUrl, '_blank', 'width=600,height=400');
        }
        showStatus('Thank you for sharing!');
      }
    });
  });

  function showStatus(message) {
    if (!shareStatus) return;
    shareStatus.textContent = message;
    setTimeout(() => {
      shareStatus.textContent = '';
    }, 4000);
  }
});
