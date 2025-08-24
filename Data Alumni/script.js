document.getElementById("alumniForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const angkatan = document.getElementById("angkatan").value.trim();
  const telepon = document.getElementById("telepon").value.trim();
  const alamat = document.getElementById("alamat").value.trim();
  const tahunSekarang = new Date().getFullYear();

  // --- Cek apakah masih diblokir ---
  const lastSubmit = localStorage.getItem("lastSubmitTime");
  if (lastSubmit) {
    const diff = Date.now() - parseInt(lastSubmit);
    const sevenDays = 1 * 24 * 60 * 60 * 1000; // 7 hari dalam ms
    if (diff < sevenDays) {
      const hoursLeft = Math.ceil((sevenDays - diff) / (1000 * 60 * 60));
      alert(`Anda sudah mengirim form. Tunggu ${hoursLeft} jam sebelum mengirim lagi.`);
      return;
    }
  }

  // --- Nama ---
  if (nama.length < 3 || nama.length > 17) {
    alert("Nama harus 3–17 karakter.");
    return;
  }
  if (!/^[A-Za-z\s]+$/.test(nama)) {
    alert("Nama hanya boleh huruf dan spasi.");
    return;
  }
  if (/^(.)\1+$/.test(nama)) {
    alert("Nama tidak boleh hanya huruf yang sama berulang.");
    return;
  }

  // --- Angkatan ---
  if (!/^[0-9]{4}$/.test(angkatan)) {
    alert("Angkatan harus 4 digit angka (contoh: 2020).");
    return;
  }
  if (angkatan < 1995 || angkatan > tahunSekarang) {
    alert("Angkatan tidak masuk akal (pondok belum berdiri atau terlalu jauh di masa depan).");
    return;
  }

  // --- Nomor Telepon ---
  if (!/^08[0-9]+$/.test(telepon)) {
    alert("Nomor telepon harus diawali 08 dan hanya angka.");
    return;
  }
  if (telepon.length < 10 || telepon.length > 15) {
    alert("Nomor telepon harus 10–15 digit.");
    return;
  }
  if (/^(.)\1+$/.test(telepon)) {
    alert("Nomor telepon tidak boleh semua digit sama.");
    return;
  }

  // --- Alamat ---
  if (alamat.length < 5) {
    alert("Alamat terlalu pendek.");
    return;
  }
  if (/^(.)\1+$/.test(alamat)) {
    alert("Alamat tidak boleh hanya huruf sama berulang.");
    return;
  }
  if (!alamat.includes(" ")) {
    alert("Alamat harus terdiri dari lebih dari satu kata.");
    return;
  }

  // --- Lolos semua validasi ---
  alert("Form valid dan siap dikirim!");

  // --- Simpan waktu submit ke localStorage ---
  localStorage.setItem("lastSubmitTime", Date.now());

  // --- Reset form ---
  document.getElementById("alumniForm").reset();
});


const scriptURL = 'https://script.google.com/macros/s/AKfycbwjmfDrlbZssQtkqUZ7UJq7AI5uarLBlIT7keVYZyxnqSKiN3f-Ezqd1l3H_OCoOuRhIQ/exec';
const form = document.forms['data-alumni-df'];

// Cek waktu submit terakhir
const lastSubmit = localStorage.getItem("lastSubmitTime");
if (lastSubmit) {
  const diff = Date.now() - parseInt(lastSubmit);
  const sevenDays = 1 * 24 * 60 * 60 * 1000; // 7 hari dalam ms
  if (diff < sevenDays) {
    const hoursLeft = Math.ceil((sevenDays - diff) / (1000 * 60 * 60));
    alert(`Mohon maaf, Untuk menghindari spam kami membatasi pengiriman data. Tunggu ${hoursLeft} jam sebelum mengirim lagi.`);
    // Disable form supaya tidak bisa diklik
    form.querySelectorAll("input, button, textarea").forEach(el => el.disabled = true);
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();

  // Cek lagi sebelum submit
  const lastSubmit = localStorage.getItem("lastSubmitTime");
  if (lastSubmit) {
    const diff = Date.now() - parseInt(lastSubmit);
    const sevenDays = 1 * 24 * 60 * 60 * 1000;
    if (diff < sevenDays) {
      alert("Anda sudah mengirim form sebelumnya. Tunggu beberapa hari sebelum mengirim lagi.");
      return;
    }
  }

  // --- Kirim data ke Google Script ---
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      console.log('Success!', response);
      alert("Form berhasil dikirim!");

      // Simpan waktu submit terakhir
      localStorage.setItem("lastSubmitTime", Date.now());

      // Reset form
      form.reset();

      // Disable form agar tidak bisa dikirim lagi
      form.querySelectorAll("input, button, textarea").forEach(el => el.disabled = true);
    })
    .catch(error => console.error('Error!', error.message));
});
