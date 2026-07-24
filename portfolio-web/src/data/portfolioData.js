import localPortfolio from '../../../portfolio.json';

const GITHUB_RAW_URL = "https://raw.githubusercontent.com/newplayer500p/portfolio/main/portfolio.json";

export async function fetchPortfolioData() {
  try {
    const res = await fetch(`${GITHUB_RAW_URL}?t=${Date.now()}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.profile && data.projects) {
        return data;
      }
    }
  } catch (err) {
    console.warn("Chargement GitHub Raw portfolio.json indisponible, utilisation du fichier local portfolio.json :", err);
  }
  return localPortfolio;
}
