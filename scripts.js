
Todd Lyman <mrtoddlyman@gmail.com>
6:48 PM (0 minutes ago)
to me

const pageUrl = window.location.href;
const title = "Help Todd Find a Kidney Donor";
const text = "Help Todd find a living kidney donor. You can help by learning, sharing, or becoming a donor.";

document.querySelectorAll("[data-share]").forEach(button => {
  button.addEventListener("click", async () => {
    const type = button.dataset.share;
    const status = document.getElementById("share-status");

    if (type === "copy") {
      try {
        await navigator.clipboard.writeText(pageUrl);
        status.textContent = "Link copied. Thank you for helping spread the word.";
      } catch {
        status.textContent = "Copy failed. Please copy the address from your browser.";
      }
      return;
    }

    if (type === "email") {
      window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + "\n\n" + pageUrl)}`;
      return;
    }

    if (type === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, "_blank", "noopener,noreferrer");
      return;
    }

    if (type === "x") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pageUrl)}`, "_blank", "noopener,noreferrer");
    }
  });
});

