// --- Class Definition ---
export class RoundRange {
  Name: string;
  DisplayName: string;
  Minimum: number;
  Maximum: number;
  Range: number;
  Key: string;

  constructor(name: string, min: number, max: number) {
    this.Name = name;
    if (min === 0) {
      this.DisplayName = name;
    } else {
      this.DisplayName = name;
    }
    this.Minimum = min;
    this.Maximum = max;
    this.Range = max - min + 1;
    this.Key = min.toString() + "-" + max.toString();
  }

  // --- Constants and Derived Data ---
  public static readonly ranges = [
    new RoundRange("選択しない", 0, 0),
    new RoundRange("ビルマ文字", 0x1000, 0x109F),
    new RoundRange("アラビア文字", 0x0600, 0x06FF),
    new RoundRange("ルーン文字", 0x16A0, 0x16F0),
    new RoundRange("ルーン文字+", 0x16A0, 0x16F8),
    new RoundRange("タイ文字", 0x0E01, 0x0E5B),
    new RoundRange("グルジア文字", 0x10A0, 0x10FF),
    new RoundRange("シンハラ文字", 0x0D80, 0x0DF4),
    new RoundRange("テルグ文字", 0x0C00, 0x0C7F),
    new RoundRange("カンナダ文字", 0x0C80, 0x0CF3),
    new RoundRange("マラヤーラム文字", 0x0D00, 0x0D7F),
    new RoundRange("ヒエログリフ", 0x13000, 0x1342F),
    new RoundRange("パスパ文字", 0xA840, 0xA87E),
    new RoundRange("ブラーフミー文字", 0x11000, 0x1107F),
    new RoundRange("ヴァイ文字", 0xA500, 0xA62B),
    new RoundRange("デーヴァナーガリー", 0x0900, 0x097F),
    new RoundRange("オガム文字", 0x1680, 0x169F),
    new RoundRange("タナ文字", 0x0780, 0x07BF),
    new RoundRange("ンコ文字", 0x07C0, 0x07FF),
    new RoundRange("西夏文字", 0x17000, 0x18AFF),
    new RoundRange("楔形文字", 0x12000, 0x123FF)
  ];
}
