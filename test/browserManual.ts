import { SiteScraper } from "../source/browser/SiteScraper";
import { Credentials } from "../source/Credentials";

(async () => {
  const scraper = new SiteScraper(
    await Credentials.fromFile("credentials.json"),
    {
      headless: false
    }
  );

  console.log(await scraper.scrapeStations());
})();
