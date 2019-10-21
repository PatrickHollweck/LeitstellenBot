import puppeteer from "puppeteer";

import { Credentials } from "../Credentials";

import { mapVehicle } from "../simulation/vehicles/VehicleMapper";
import { Station } from "../simulation/Station";

const _ = {
  login: {
    url: "https://www.leitstellenspiel.de/users/sign_in",
    emailInputSelector: "#user_email",
    passwordInputSelector: "#user_password"
  },
  game: {
    url: "https://www.leitstellenspiel.de/",
    buildingList: {
      containerSelector: "#building_list",
      buildingSelector: ".building_list_li",
      nameSelector: ".map_position_mover",
      vehicleNameSelector: ".vehicle_building_list_button"
    }
  }
};

type WrappedElement<T extends Element = Element> = puppeteer.ElementHandle<T>;

export class SiteScraper {
  protected browserInstance: puppeteer.Browser | null;
  protected browserConfig: puppeteer.LaunchOptions;
  protected credentials: Credentials;

  constructor(credentials: Credentials, config: puppeteer.LaunchOptions) {
    this.browserInstance = null;
    this.browserConfig = config;
    this.credentials = credentials;
  }

  async getOrInitialize() {
    if (this.browserInstance == null) {
      this.browserInstance = await puppeteer.launch(this.browserConfig);
    }

    return this.browserInstance;
  }

  async loadHomepage() {
    const browser = await this.getOrInitialize();
    const page = await browser.newPage();

    /*
     * Goto the login page.
     * If we are alredy logged in, we will be redirected to the game url
     */
    await page.goto(_.login.url);

    if (page.url() === _.game.url) {
      // We are already logged-in
      return page;
    }

    const emailInputElement = await SiteScraper.querySelector(
      page,
      _.login.emailInputSelector
    );

    const passwordInputElement = await SiteScraper.querySelector(
      page,
      _.login.passwordInputSelector
    );

    await emailInputElement.focus();
    await page.keyboard.type(this.credentials.email);

    await passwordInputElement.focus();
    await page.keyboard.type(this.credentials.password);

    // Submits the form
    await page.keyboard.press("Enter");
    await page.waitForNavigation();

    return page;
  }

  async scrapeStations() {
    const page = await this.loadHomepage();

    const buildingListElements = await SiteScraper.querySelectorAll(
      page,
      `${_.game.buildingList.containerSelector} > ${_.game.buildingList.buildingSelector}`
    );

    const result = new Array<Station>();

    for (let index = 0; index < buildingListElements.length; index++) {
      const buildingElement = buildingListElements[index];

      const buildingHeader = await SiteScraper.querySelector(
        page,
        _.game.buildingList.nameSelector,
        buildingElement
      );

      const buildingName = await buildingHeader.evaluate(e => e.textContent);
      const station = new Station(buildingName!);

      const vehicleElementList = await SiteScraper.querySelectorAll(
        page,
        _.game.buildingList.vehicleNameSelector,
        buildingElement
      );

      for (let index = 0; index < vehicleElementList.length; index++) {
        const vehicleElement = vehicleElementList[index];

        const vehicleName = await vehicleElement.evaluate(e => e.textContent);
        station.vehicles.push(new (mapVehicle(vehicleName!))(station));
      }

      result.push(station);
    }

    return result;
  }

  static async querySelector(
    page: puppeteer.Page,
    selector: string,
    context?: puppeteer.ElementHandle
  ): Promise<WrappedElement> {
    return SiteScraper.findElement(page, selector, "single", context) as any;
  }

  static async querySelectorAll(
    page: puppeteer.Page,
    selector: string,
    context?: puppeteer.ElementHandle
  ): Promise<WrappedElement[]> {
    return SiteScraper.findElement(page, selector, "all", context) as any;
  }

  static async findElement(
    page: puppeteer.Page,
    selector: string,
    selectMode: "all" | "single",
    context?: puppeteer.ElementHandle
  ) {
    const finder =
      selectMode === "all"
        ? context
          ? context.$$
          : page.$$
        : context
        ? context.$
        : page.$;

    const handle = await finder.bind(context ? context : page)(selector);

    if (handle === null) {
      throw new Error(
        `Could not find element for selector: '${selector}' on page '${page.url()}'`
      );
    }

    return handle;
  }
}
