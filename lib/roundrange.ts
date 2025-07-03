// --- Class Definition ---
export class RoundRange {
  Name: string;
  DisplayName: string;
  Minimum: number;
  Maximum: number;
  Range: number;
  Key: string;
  isSupported: boolean;

  constructor(name: string, min: number, max: number, isSupported: boolean = true) {
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
    this.isSupported = isSupported;
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
    new RoundRange("シンハラ文字", 0x0D82, 0x0DF4),
    new RoundRange("テルグ文字", 0x0C00, 0x0C7F),
    new RoundRange("カンナダ文字", 0x0C82, 0x0CF3),
    new RoundRange("マラヤーラム文字", 0x0D00, 0x0D7F),
    new RoundRange("ヒエログリフ", 0x13000, 0x1342F),
    new RoundRange("パスパ文字", 0xA840, 0xA87E),
    new RoundRange("ブラーフミー文字", 0x11000, 0x1107F),
    new RoundRange("ヴァイ文字", 0xA500, 0xA62B),
    new RoundRange("デーヴァナーガリー", 0x0900, 0x097F),
    new RoundRange("オガム文字", 0x1680, 0x169F),
    new RoundRange("タナ文字", 0x0780, 0x07BF),
    new RoundRange("ンコ文字", 0x07C0, 0x07FF),
    new RoundRange("西夏文字", 0x17000, 0x18AFF, false),
    new RoundRange("楔形文字", 0x12000, 0x123FF),
    new RoundRange("フェニキア文字", 0x10900, 0x1091F),
    new RoundRange("ウガリット文字", 0x10380, 0x1039F),
    new RoundRange("古代ペルシア文字", 0x103A0, 0x103DF),
    new RoundRange("ゴート文字", 0x10330, 0x1034F),
    new RoundRange("イタリック文字", 0x10300, 0x1032F),
    new RoundRange("オル・チキ文字", 0x1C50, 0x1C7F),
    new RoundRange("チャム文字", 0xAA00, 0xAA5F),
    new RoundRange("カリン文字", 0xA900, 0xA92F),
    new RoundRange("レプチャ文字", 0x1C00, 0x1C4F),
    new RoundRange("サイロティ・ナグリ文字", 0xA800, 0xA82C),
    new RoundRange("バタク文字", 0x1BC0, 0x1BFF),
    new RoundRange("ブギス文字", 0x1A00, 0x1A1F),
    new RoundRange("バリ文字", 0x1B00, 0x1B7F),
    new RoundRange("スンダ文字", 0x1B80, 0x1BBF),
    new RoundRange("モンゴル文字", 0x1800, 0x18AF),
    new RoundRange("チベット文字", 0x0F00, 0x0FFF),
    new RoundRange("ハヌノオ文字", 0x1720, 0x1736),
    new RoundRange("ブヒッド文字", 0x1740, 0x1753),
    new RoundRange("タグバヌワ文字", 0x1760, 0x1773),
    new RoundRange("エチオピア文字", 0x1200, 0x137F),
    new RoundRange("チェロキー文字", 0x13A0, 0x13F7),
    new RoundRange("カナダ先住民文字", 0x1400, 0x167F),
    new RoundRange("コプト文字", 0x2C80, 0x2CFF),
    new RoundRange("��ラゴル文字", 0x2C00, 0x2C5F),
    new RoundRange("キリル文字", 0x0400, 0x04FF),
    new RoundRange("ギリシア文字", 0x0370, 0x03FF),
    new RoundRange("アルメニア文字", 0x0530, 0x058F),
    new RoundRange("ヘブライ文字", 0x0590, 0x05FF),
    new RoundRange("シリア文字", 0x0700, 0x074F),
    new RoundRange("ベンガル文字", 0x0980, 0x09FF),
    new RoundRange("グジャラート文字", 0x0A80, 0x0AFF),
    new RoundRange("グルムキー文字", 0x0A00, 0x0A76),
    new RoundRange("オリヤー文字", 0x0B00, 0x0B77),
    new RoundRange("タミル文字", 0x0B80, 0x0BFF),
    new RoundRange("クメール文字", 0x1780, 0x17FF),
    new RoundRange("ラオ文字", 0x0E80, 0x0EFF),
    new RoundRange("彝文字", 0xA000, 0xA48F),
    new RoundRange("ハングル", 0xAC00, 0xD7AF),
    new RoundRange("ひらがな", 0x3041, 0x309F),
    new RoundRange("カタカナ", 0x30A1, 0x30FF),
    new RoundRange("CJK統合漢字", 0x4E00, 0x9FFF),
    new RoundRange("ラテン文字(基本)", 0x0020, 0x007F),
    new RoundRange("ラテン文字(拡張A)", 0x0080, 0x00FF),
    new RoundRange("ラテン文字(拡張B)", 0x0100, 0x017F),
    new RoundRange("キリル文字補助", 0x0500, 0x052F),
    new RoundRange("ギリシア文字(拡張)", 0x1F00, 0x1FFC)
  ];
}

