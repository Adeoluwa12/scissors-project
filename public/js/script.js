document.getElementById('shortenForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const form = event.target;
  const longUrl = form.elements.longUrl.value;
  const shortUrl = form.elements.shortUrl.value;

  const response = await fetch('/dashboard/new/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ longUrl, shortUrl }),
  });

  if (response.ok) {
    const data = await response.json();

    const shortenedUrlHeading = document.getElementById('shortenedUrlHeading');
    shortenedUrlHeading.style.display = 'block';

    const shortenedUrl = document.getElementById('shortenedUrl');
    shortenedUrl.innerText = data.url.shortUrl;
    shortenedUrl.style.display = 'block';

    const qrcodeHeading = document.getElementById('qrcodeHeading');
    qrcodeHeading.style.display = 'block';

    const qrcodeContainer = document.getElementById('qrcodeContainer');
    qrcodeContainer.innerHTML = ''; // Clear previous QR code if any

    const qrCode = document.createElement('div');
    qrcodeContainer.appendChild(qrCode);

    new QRCode(qrCode, {
      text: data.url.shortUrl,
      width: 128,
      height: 128,
    });
  } else {
    alert('Error: ' + response.status);
  }
});
