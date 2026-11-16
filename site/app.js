const versionNodes = [document.querySelector('#version'), document.querySelector('#download-version')];
const download = document.querySelector('#download');
const headerDownload = document.querySelector('#header-download');
const heroDownload = document.querySelector('#hero-download');
const status = document.querySelector('#download-status');
const notes = document.querySelector('#release-notes');

async function loadRelease() {
  try {
    const response = await fetch('./latest.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Brak opublikowanego wydania.');
    const release = await response.json();
    if (!/^\d+\.\d+\.\d+$/.test(release.version) || !/^https:\/\//.test(release.downloadUrl)) {
      throw new Error('Nieprawidłowe dane wydania.');
    }

    versionNodes.forEach((node) => { if (node) node.textContent = release.version; });
    download.href = release.downloadUrl;
    download.removeAttribute('aria-disabled');
    download.innerHTML = 'Pobierz Lumę <span aria-hidden="true">↓</span>';
    download.setAttribute('aria-label', `Pobierz Luma ${release.version}`);
    if (headerDownload) headerDownload.href = release.downloadUrl;
    if (heroDownload) heroDownload.href = release.downloadUrl;
    status.textContent = `Wersja ${release.version} · Instalator dla Apple Silicon`;
    if (release.notes) notes.textContent = release.notes;
  } catch {
    status.textContent = 'Pierwsze wydanie pojawi się tutaj po publikacji.';
  }
}

loadRelease();
