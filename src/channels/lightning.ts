import { TimeboxEvoRequest } from "../requests";
import { LightningType } from "../types";
import { ColorInput, TinyColor } from "@ctrl/tinycolor";
import {
  color2HexString,
  brightness2HexString,
  number2HexString,
  boolean2HexString
} from "../helpers/utils";

/**
 * Options for the [[LightningChannel]]
 */
interface LightningOpts {
  type?: LightningType;
  color?: ColorInput;
  brightness?: number;
  power?: boolean;
}

/**
 * This class is used to display the Lightning Channel on the Timebox Evo
 */
export class LightningChannel extends TimeboxEvoRequest {
  private _opts: LightningOpts = {
    type: LightningType.PlainColor,
    brightness: 100,
    power: true
  };
  private _color: string;
  private _PACKAGE_PREFIX = "4501";
  private _PACKAGE_SUFFIX = "000000";

  /**
   * Generates the appropriate message to display the Lightning Channel on the Divoom Timebox Evo
   * @param opts the lightning options
   */
  constructor(opts?: LightningOpts) {
    super();
    this.color =
      opts && opts.color ? new TinyColor(opts.color) : new TinyColor("FFFFFF");
    this._opts = { ...this._opts, ...opts };
    this._updateMessage();
  }

  /**
   * Updates the message queue based on the parameters used
   */
  private _updateMessage() {
    this.clear();
    this.push(
      this._PACKAGE_PREFIX +
        color2HexString(this._color) +
        brightness2HexString(this._opts.brightness) +
        number2HexString(this._opts.type) +
        boolean2HexString(this._opts.power) +
        this._PACKAGE_SUFFIX
    );
  }

  /**
   * Sets the type of Lightning you want to display
   */
  set type(type: LightningType) {
    this._opts.type = type;
    this._updateMessage();
  }
  /**
   * Gets the type of Lightning
   */
  get type() {
    return this._opts.type;
  }

  /**
   * Sets the color of the Lightning
   */
  set color(color: ColorInput) {
    const localcolor = new TinyColor(color);
    if (!localcolor.isValid)
      throw new Error(`Provided color ${localcolor} is not valid`);
    this._color = localcolor.toHex();
    this._updateMessage();
  }
  /**
   * Gets the color of the lightning
   */
  get color() {
    return this._color;
  }

  /**
   * Sets the power on of off
   */
  set power(bool: boolean) {
    this._opts.power = bool;
    this._updateMessage();
  }
  /** Gets the power */
  get power() {
    return this._opts.power;
  }

  /**
   * Sets the brighness (0-100)
   */
  set brightness(brightness: number) {
    this._opts.brightness = brightness;
    this._updateMessage();
  }
  /**
   * Gets the brightness
   */
  get brightness() {
    return this._opts.brightness;
  }
}
