import { app, Tray, nativeImage } from "electron";

export class TrayMenu {
   public readonly tray: Tray;

   // Path where should we fetch our icon;
   private iconPath = "/assets/clock-icon-white.png";

   constructor() {
      this.tray = new Tray(this.iconPath);
   }

   createNativeImage(): Electron.NativeImage {
      const path = `${app.getAppPath()}${this.iconPath}`;

      const image = nativeImage.createFromPath(path);
      image.setTemplateImage(true);

      return image;
   }
}
